/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var assert = require('assert-plus');
var clone = require('clone');
var fmt = require('util').format;
var common = require('./common');
var libuuid = require('libuuid');
var test = require('tape').test;
var vasync = require('vasync');


///--- Globals


// How often to poll for VLAN / networks:
var CHECK_INTERVAL = 500;
// Maximum
var CHECK_TIMEOUT = 30000;
var CLIENT;
var CREATED = {
    nets: [],
    vlans: []
};
var PARAMS = {
    nets: [
        {
            name: 'network 0',
            provision_start_ip: '10.4.1.0',
            provision_end_ip: '10.4.255.254',
            resolvers: ['8.8.8.8'],
            subnet: '10.4.0.0/16'
        },

        // "Fully loaded" network - all properties present
        {
            name: 'network 1',
            description: 'the number one network',
            gateway: '10.5.1.1',
            provision_start_ip: '10.5.1.0',
            provision_end_ip: '10.5.255.254',
            resolvers: ['8.8.8.8'],
            routes: {
                '10.4.0.0/16': '10.5.1.1'
            },
            subnet: '10.5.0.0/16'
        }
    ],
    vlan: {
        name: 'my vlan',
        description: 'some description',
        vlan_id: 4000
    }
};
var SERVER;
// String limit in NAPI is 64 characters:
var SIXTEEN = 'xxxxxxxxxxxxxxxx';
var TOO_LONG_STR = SIXTEEN + SIXTEEN + SIXTEEN + SIXTEEN + 'x';


// --- Functions


function afterFindInList(t, params, err, req, res, body) {
    var found = false;

    t.ifError(err, 'GET error');
    t.equal(res.statusCode, 200, 'GET status');
    common.checkHeaders(t, res.headers);
    common.checkReqId(t, res.headers);

    t.ok(body, 'GET body');
    t.ok(Array.isArray(body), 'GET body is an array');
    if (!Array.isArray(body)) {
        return t.end();
    }

    t.ok(body.length, 'GET body array has elements');

    body.forEach(function (v) {
        if (v.name === params.name) {
            found = true;

            // Cover the case (like the default network) where we don't
            // know the id of the thing we're trying to compare:
            if (v.id && !params.id) {
                params.id = v.id;
            }

            t.deepEqual(v, params, 'params');
        }
    });

    t.ok(found, 'found ' + params.name);
    return t.end();
}


/**
 * Find a fabric network in a user's overall network list
 */
function findNetInList(t, params) {
    assert.object(t, 't');
    assert.object(params, 'params');
    assert.string(params.name, 'params.name');

    CLIENT.get('/my/networks', afterFindInList.bind(null, t, params));
}


/**
 * Find a fabric network in a user's fabric network list
 */
function findNetInFabricList(t, params) {
    assert.object(t, 't');
    assert.object(params, 'params');
    assert.number(params.vlan_id, 'params.vlan_id');
    assert.string(params.name, 'params.name');

    CLIENT.get(fmt('/my/fabrics/vlans/%d/networks', params.vlan_id),
            afterFindInList.bind(null, t, params));
}


/**
 * Find a fabric VLAN in a user's list
 */
function findVLANinList(t, params) {
    assert.object(t, 't');
    assert.object(params, 'params');
    assert.number(params.vlan_id, 'params.vlan_id');

    CLIENT.get('/my/fabrics/vlans', afterFindInList.bind(null, t, params));
}


/**
 * Return a json-schema "property missing" message
 */
function ipMsg(prop) {
    return fmt('property "%s": must be an IPv4 address', prop);
}


/**
 * Return a json-schema "property missing" message
 */
function missingMsg(prop) {
    return fmt('property "%s": is missing and it is required', prop);
}


/**
 * Return a "string is too long" message
 */
function tooLongMsg(prop) {
    return fmt('property "%s": must not be longer than 64 characters', prop);
}


/**
 * Return a "type doesn't match" json-schema message
 */
function typeMsg(prop, found, exp) {
    return fmt('property "%s": %s value found, but a %s is required',
            prop, found, exp);
}


/**
 * Poll for the creation of the default VLAN
 */
function waitForDefaultVLAN(t) {
    var start = Date.now();
    t.pass('Waiting for default fabric VLAN to be created...');

    function _checkVlan() {
        CLIENT.get('/my/fabrics/vlans/2', function (err, req, res, body) {
            if (body && body.vlan_id) {
                t.pass('found default vlan');
                return t.end();
            }

            if ((Date.now() - start) > CHECK_TIMEOUT) {
                t.pass('did not found default vlan before timeout');
                return t.end();
            }

            return setTimeout(_checkVlan, CHECK_INTERVAL);
        });
    }

    _checkVlan();
}


// --- Tests


test('setup', function (t) {
    common.setup(function (err, _client, _server) {
        t.ifError(err);
        t.ok(_client);
        if (!process.env.SDC_SETUP_TESTS) {
            t.ok(_server);
            SERVER = _server;
        }
        CLIENT = _client;

        t.end();
    });
});


test('VLANs', function (tt) {

    tt.test('create fabric VLAN', function (t) {
        CLIENT.post('/my/fabrics/vlans', PARAMS.vlan,
                function (err, req, res, body) {
            t.ifErr(err, 'create VLAN');

            t.equal(res.statusCode, 201, 'create fabric VLAN');
            common.checkHeaders(t, res.headers);
            common.checkReqId(t, res.headers);
            t.deepEqual(body, PARAMS.vlan, 'response');
            if (body && body.vlan_id) {
                CREATED.vlans.push(body);
            }

            t.end();
        });
    });


    tt.test('get fabric VLAN', function (t) {
        CLIENT.get('/my/fabrics/vlans/' + PARAMS.vlan.vlan_id,
                function (err, req, res, body) {
            t.ifErr(err, 'get VLAN');

            t.equal(res.statusCode, 200, 'get fabric VLAN');
            common.checkHeaders(t, res.headers);
            common.checkReqId(t, res.headers);
            t.deepEqual(body, PARAMS.vlan, 'response');

            t.end();
        });
    });


    tt.test('VLAN exists in list', function (t) {
        findVLANinList(t, PARAMS.vlan);
    });


    tt.test('update fabric VLAN', function (t) {
        var updateParams = {
            name: 'new vlan name',
            description: 'new description'
        };

        CLIENT.put('/my/fabrics/vlans/' + PARAMS.vlan.vlan_id,
                updateParams, function (err, req, res, body) {
            t.ifErr(err, 'update VLAN');

            t.equal(res.statusCode, 202, 'update fabric VLAN');
            common.checkHeaders(t, res.headers);
            common.checkReqId(t, res.headers);

            PARAMS.vlan.name = updateParams.name;
            PARAMS.vlan.description = updateParams.description;
            t.deepEqual(body, PARAMS.vlan, 'response');

            t.end();
        });
    });


    tt.test('delete non-existent fabric VLAN', function (t) {
        CLIENT.del('/my/fabrics/vlans/999', function (err, req, res, body) {
            t.ok(err, 'expected error');

            if (err) {
                t.equal(err.message, 'vlan not found', 'error message');
                t.equal(err.restCode, 'InvalidArgument', 'restCode');
                t.equal(err.statusCode, 409, 'statusCode');
            }

            t.end();
        });
    });

});


test('create VLAN: invalid', function (t) {
    var invalid = [
        // name
        [ {vlan_id: 4}, missingMsg('name')],
        [ {vlan_id: 4, name: 5}, typeMsg('name', 'number', 'string')],

        // vlan_id
        [ {name: 'asdf'}, missingMsg('vlan_id')],
        [ {name: TOO_LONG_STR, vlan_id: 5}, tooLongMsg('name')],
        [ {name: 'asdf', vlan_id: 'foo'},
            typeMsg('vlan_id', 'string', 'integer')],

        // description
        [ {name: 'foo', vlan_id: 6, description: TOO_LONG_STR},
            tooLongMsg('description')]
    ];

    function _createInvalidVLAN(data, cb) {
        CLIENT.post('/my/fabrics/vlans', data[0],
                function (err, req, res, body) {

            t.ok(err, 'expected error: ' + JSON.stringify(data[0]));
            if (err) {
                t.equal(err.message, data[1], 'error message');
                t.equal(err.restCode, 'InvalidArgument', 'restCode');
                t.equal(err.statusCode, 409, 'statusCode');
            }

            cb();
        });
    }

    vasync.forEachParallel({
        inputs: invalid,
        func: _createInvalidVLAN
    }, function () {
        t.end();
    });
});


test('update VLAN: invalid', function (t) {
    var invalid = [
        // name
        [ {name: 5}, typeMsg('name', 'number', 'string')],
        [ {name: TOO_LONG_STR}, tooLongMsg('name')],

        // description
        [ {description: 5}, typeMsg('description', 'number', 'string')],
        [ {description: TOO_LONG_STR}, tooLongMsg('description')],

        // vlan_id
        [ {vlan_id: 10}, 'vlan not found']
    ];

    function _updateInvalidVLAN(data, cb) {
        CLIENT.put('/my/fabrics/vlans/' + PARAMS.vlan.vlan_id, data[0],
                function (err, req, res, body) {

            t.ok(err, 'expected error: ' + JSON.stringify(data[0]));
            if (err) {
                t.equal(err.message, data[1], 'error message');
                t.equal(err.restCode, 'InvalidArgument', 'restCode');
                t.equal(err.statusCode, 409, 'statusCode');
            }

            cb();
        });
    }

    vasync.forEachParallel({
        inputs: invalid,
        func: _updateInvalidVLAN
    }, function () {
        t.end();
    });
});


test('networks', function (tt) {

    var nets = [];

    tt.test('create fabric network 1', function (t) {
        CLIENT.post(fmt('/my/fabrics/vlans/%d/networks', PARAMS.vlan.vlan_id),
                PARAMS.nets[0], function (err, req, res, body) {
            t.ifErr(err, 'create fabric network');

            t.equal(res.statusCode, 201, 'create fabric network');
            common.checkHeaders(t, res.headers);
            common.checkReqId(t, res.headers);

            if (body) {
                t.ok(body.id, 'id present');
                PARAMS.nets[0].id = body.id;
            }
            PARAMS.nets[0].fabric = true;
            PARAMS.nets[0].public = false;
            PARAMS.nets[0].vlan_id = PARAMS.vlan.vlan_id;

            t.deepEqual(body, PARAMS.nets[0], 'response');

            if (body && body.id) {
                CREATED.nets.push(body);
                nets.push(body.id);
            }

            return t.end();
        });
    });


    tt.test('get fabric network 1', function (t) {
        if (!nets[0]) {
            t.end();
            return;
        }

        CLIENT.get(fmt('/my/fabrics/vlans/%d/networks/%s',
                PARAMS.vlan.vlan_id, nets[0]), function (err, req, res, body) {
            t.ifErr(err, 'get fabric network');

            t.equal(res.statusCode, 200, 'get fabric network');
            common.checkHeaders(t, res.headers);
            common.checkReqId(t, res.headers);
            t.deepEqual(body, PARAMS.nets[0], 'response');

            return t.end();
        });
    });


    tt.test('create fabric network 1', function (t) {
        CLIENT.post(fmt('/my/fabrics/vlans/%d/networks', PARAMS.vlan.vlan_id),
                PARAMS.nets[1], function (err, req, res, body) {
            t.ifErr(err, 'create fabric network');

            t.equal(res.statusCode, 201, 'create fabric network');
            common.checkHeaders(t, res.headers);
            common.checkReqId(t, res.headers);

            if (body) {
                t.ok(body.id, 'id present');
                PARAMS.nets[1].id = body.id;
            }
            PARAMS.nets[1].fabric = true;
            PARAMS.nets[1].public = false;
            PARAMS.nets[1].vlan_id = PARAMS.vlan.vlan_id;

            t.deepEqual(body, PARAMS.nets[1], 'response');

            if (body && body.id) {
                CREATED.nets.push(body);
                nets.push(body.id);
            }

            return t.end();
        });
    });


    tt.test('get fabric network 1', function (t) {
        if (!nets[1]) {
            t.end();
            return;
        }

        CLIENT.get(fmt('/my/fabrics/vlans/%d/networks/%s',
                PARAMS.vlan.vlan_id, nets[1]), function (err, req, res, body) {
            t.ifErr(err, 'get fabric network');

            t.equal(res.statusCode, 200, 'get fabric network');
            common.checkHeaders(t, res.headers);
            common.checkReqId(t, res.headers);
            t.deepEqual(body, PARAMS.nets[1], 'response');

            return t.end();
        });
    });


    tt.test('fabric network 0 exists in main list', function (t) {
        findNetInList(t, PARAMS.nets[0]);
    });


    tt.test('fabric network 1 exists in main list', function (t) {
        findNetInList(t, PARAMS.nets[1]);
    });


    tt.test('filtering networks by fabric=true', function (t) {
        CLIENT.get('/my/networks?fabric=true', function (err, req, res, body) {
            t.ifErr(err, 'get networks');
            t.equal(res.statusCode, 200, 'get fabric VLAN');
            common.checkHeaders(t, res.headers);
            common.checkReqId(t, res.headers);
            if (body) {
                var fabricNets = [];
                var nonFabricNets = [];

                for (var n in body) {
                    if (body[n].fabric) {
                        fabricNets.push(body[n]);
                    } else {
                        nonFabricNets.push(body[n]);
                    }
                }

                t.ok(body.length > 0, 'at least one network returned');
                t.equal(fabricNets.length, body.length,
                    'only fabric networks returned');
                t.deepEqual(nonFabricNets, [],
                    'no non-fabric networks returned');
            }

            t.end();
        });
    });


    tt.test('create fabric network: overlapping', function (t) {
        var params = {
            name: 'overlap network',
            provision_start_ip: '10.5.1.0',
            provision_end_ip: '10.5.1.250',
            resolvers: ['8.8.8.8'],
            subnet: '10.5.1.0/24'
        };

        CLIENT.post(fmt('/my/fabrics/vlans/%d/networks', PARAMS.vlan.vlan_id),
                params, function (err, req, res, body) {
            t.ok(err, 'expected error');

            if (err) {
                t.equal(err.message,
                    'property "subnet": subnet overlaps with another network',
                    'error message');
                t.equal(err.restCode, 'InvalidArgument', 'restCode');
                t.equal(err.statusCode, 409, 'statusCode');
            }

            if (body && body.id) {
                CREATED.nets.push(body);
            }

            return t.end();
        });
    });

});


test('create fabric network: invalid', function (t) {
    var base = {
        name: 'invalid network',
        provision_start_ip: '192.168.1.1',
        provision_end_ip: '192.168.1.250',
        resolvers: ['8.8.8.8'],
        subnet: '192.168.1.0/24'
    };

    function delParam(par) {
        var newParams = clone(base);
        delete newParams[par];

        return newParams;
    }

    function addParams(params) {
        var newParams = clone(base);
        for (var p in params) {
            newParams[p] = params[p];
        }

        return newParams;
    }

    var invalid = [
        // name
        [delParam('name'), missingMsg('name')],
        [addParams({name: TOO_LONG_STR}), tooLongMsg('name')],
        [addParams({name: 5}), typeMsg('name', 'number', 'string')],

        // provision_start_ip
        [delParam('provision_start_ip'), missingMsg('provision_start_ip')],
        [addParams({provision_start_ip: 'a'}), ipMsg('provision_start_ip')],

        // provision_end_ip
        [delParam('provision_end_ip'), missingMsg('provision_end_ip')],
        [addParams({provision_end_ip: 'a'}), ipMsg('provision_end_ip')],

        // resolvers
        [delParam('resolvers'), missingMsg('resolvers')],
        [addParams({resolvers: 'a'}),
            typeMsg('resolvers', 'string', 'array')],
        [addParams({resolvers: ['a']}), ipMsg('resolvers[0]')],
        [addParams({resolvers: ['1.2.3.4', '1.2.3.4', '1.2.3.4', 'a']}),
            ipMsg('resolvers[3]')],
        [addParams({resolvers: ['1.2.3.4', '1.2.3.4', '1.2.3.4', '1.2.3.4',
            '1.2.3.4']}), 'property "resolvers": maximum of 4 resolvers'],

        // subnet
        [delParam('subnet'), missingMsg('subnet')],
        [addParams({subnet: 'a'}),
            'property "subnet": Subnet must be in CIDR form'],

        // description
        [addParams({description: TOO_LONG_STR}), tooLongMsg('description')],
        [addParams({description: 5}),
            typeMsg('description', 'number', 'string')],

        // routes
        [addParams({routes: 'a'}), typeMsg('routes', 'string', 'object')],
        [addParams({routes: {a: 'b'}}), 'property "routes": invalid route']
    ];

    function _createInvalidNet(data, cb) {
        CLIENT.post(fmt('/my/fabrics/vlans/%d/networks', PARAMS.vlan.vlan_id),
                data[0], function (err, req, res, body) {

            t.ok(err, 'expected error: ' + JSON.stringify(data[0]));
            if (err) {
                t.equal(err.message, data[1], 'error message');
                t.equal(err.restCode, 'InvalidArgument', 'restCode');
                t.equal(err.statusCode, 409, 'statusCode');
            }

            cb();
        });
    }

    vasync.forEachParallel({
        inputs: invalid,
        func: _createInvalidNet
    }, function () {
        return t.end();
    });
});


test('default fabric', function (tt) {
    var defaultNet = {
        fabric: true,
        gateway: '192.168.128.1',
        name: 'default',
        provision_end_ip: '192.168.131.250',
        provision_start_ip: '192.168.128.5',
        public: false,
        resolvers: ['8.8.8.8', '8.8.4.4'],
        subnet: '192.168.128.0/22',
        vlan_id: 2
    };
    var defaultVLAN = {
        name: 'default',
        vlan_id: 2
    };

    // The default vlan for a user is created
    tt.test('wait for default VLAN creation', function (t) {
        waitForDefaultVLAN(t);
    });


    tt.test('default VLAN exists', function (t) {
        findVLANinList(t, defaultVLAN);
    });


    tt.test('default network exists', function (t) {
        findNetInFabricList(t, defaultNet);
    });


    tt.test('default network exists in main list', function (t) {
        findNetInList(t, defaultNet);
    });

});


test('teardown', function (tt) {

    tt.test('delete networks', function (t) {
        if (CREATED.nets.length === 0) {
            t.end();
            return;
        }

        function _delNet(net, cb) {
            CLIENT.del(fmt('/my/fabrics/vlans/%d/networks/%s',
                    net.vlan_id, net.id), function (err, req, res, body) {
                t.ifErr(err, 'delete network');

                t.equal(res.statusCode, 204, 'delete fabric network');
                common.checkHeaders(t, res.headers);
                common.checkReqId(t, res.headers);
                t.deepEqual(body, {}, 'response');

                cb();
            });
        }

        vasync.forEachParallel({
            inputs: CREATED.nets,
            func: _delNet
        }, function () {
            return t.end();
        });
    });


    tt.test('delete vlans', function (t) {
        if (CREATED.vlans.length === 0) {
            t.end();
            return;
        }

        function _delVlan(vlan, cb) {
            CLIENT.del(fmt('/my/fabrics/vlans/%d', vlan.vlan_id),
                    function (err, req, res, body) {
                t.ifErr(err, 'delete vlan');

                t.equal(res.statusCode, 204, 'delete fabric vlan');
                common.checkHeaders(t, res.headers);
                common.checkReqId(t, res.headers);
                t.deepEqual(body, {}, 'response');

                cb();
            });
        }

        vasync.forEachParallel({
            inputs: CREATED.vlans,
            func: _delVlan
        }, function () {
            return t.end();
        });
    });

    tt.test('client teardown', function (t) {
        CLIENT.teardown(function (err2) {
            t.ifError(err2, 'client teardown error');

            if (!process.env.SDC_SETUP_TESTS) {
                var cli = SERVER._clients;
                Object.keys(cli).forEach(function (c) {
                    if (cli[c].client && cli[c].client.close) {
                        cli[c].client.close();
                    }
                });
                cli.ufds.client.removeAllListeners('close');

                SERVER.close(function () {
                    return t.end();
                });
            } else {
                t.end();
                return;
            }
        });
    });

});
