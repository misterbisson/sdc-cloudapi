/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2014, Joyent, Inc.
 */

var test = require('tape').test;
var libuuid = require('libuuid');
function uuid() {
    return (libuuid.create());
}
var common = require('../common');
var machinesCommon = require('./common');
var checkJob = machinesCommon.checkJob;
var waitForJob = machinesCommon.waitForJob;

module.exports = function (suite, client, machine, pkg, callback) {
    // FIXME: Restore resize tests into nightly-1 when we finally get
    // some room for them
    var cfg = common.getCfg();
    if (!machine || cfg.datacenters['nightly-1'] || cfg.datacenters.coal) {
        return callback();
    }

    suite.test('Resize Machine', function (t) {
        t.ok(pkg, 'Resize package OK');
        console.log('Resizing to package: %j', pkg);
        client.post('/my/machines/' + machine, {
            action: 'resize',
            'package': pkg.name
        }, function (err) {
            t.ifError(err, 'Resize machine error');
            t.end();
        });
    });


    suite.test('Wait For Resized', function (t) {
        client.vmapi.listJobs({
            vm_uuid: machine,
            task: 'update'
        }, function (err, jobs) {
            t.ifError(err, 'list jobs error');
            t.ok(jobs, 'list jobs OK');
            t.ok(jobs.length, 'update jobs is array');
            var resize_jobs = jobs.filter(function (job) {
                return (job.params.subtask === 'resize');
            });
            t.ok(resize_jobs.length, 'resize jobs is an array');
            waitForJob(client, resize_jobs[0].uuid, function (err2) {
                t.ifError(err2, 'Check state error');
                t.end();
            });
        });
    });

    return callback();
};
