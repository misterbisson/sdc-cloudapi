Title: GetUser (GET /:account/users/:user)
---
Text:

Get an account user.

### Inputs

||**Field**||**Type**||**Description**||
||membership||Boolean||When given, the user roles will also be returned||

### Returns

An array of user objects.  Each user object has the following fields:

||**Field**||**Type**||**Description**||
||id||String||Unique id for the user||
||login||String||Sub-user login name||
||email||String||Email address||
||companyName||String||...||
||firstName||String||...||
||lastName||String||...||
||address||String||...||
||postalCode||String||...||
||city||String||...||
||state||String||...||
||country||String||...||
||phone||String||...||
||created||Date (ISO8601)||When this user was created||
||updated||Date (ISO8601)||When this user was updated||
||roles||Array||User role names (only when `membership` option is present in request)||
||default_roles||Array||User active role names (only when `membership` option is present in request)||

### Errors

||**Error Code**||**Description**||
||ResourceNotFound||When `:account` or `:user` do not exist||

### CLI Command:

    $ sdc-user get ed976ee5-80a4-42cd-b0d6-5493b7d41132


### Example Request

    GET /my/users/ed976ee5-80a4-42cd-b0d6-5493b7d41132?membership=true HTTP/1.1
    Accept: application/json
    Host: api.example.com
    Api-Version: ~7.2
    Authorization: Signature keyId...

### Example Response

    HTTP/1.1 200 Ok
    Content-Type: application/json
    Content-Length: 199
    Server: Joyent SmartDataCenter 7.2.0
    Api-Version: 7.2.0
    Request-Id: 84c20bf0-93da-11e3-a4d2-8dccf42a3df3

    {
        id: 'ed976ee5-80a4-42cd-b0d6-5493b7d41132',
        login: 'a4ce91ff',
        email: 'a4ce91ff_test@test.com',
        roles: ['devs', 'admins'],
        default_roles: ['devs'],
        updated: '2014-02-13T09:18:46.644Z',
        created: '2014-02-13T09:18:46.644Z'
    }

