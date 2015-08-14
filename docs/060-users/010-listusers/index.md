Title ListUsers (GET /:account/users)
---
Text:

Returns a list of account user objects.  These have the same format as the main
[account](#account) object.

### Inputs

* None

### Returns

Array of user objects.  Each user object has the following fields:

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

### Errors

||**Error Code**||**Description**||
||ResourceNotFound||If `:account` does not exist||


### CLI Command:

    $ sdc-user list


### Example Request

    GET /my/users HTTP/1.1
    Accept: application/json
    Host: api.example.com
    Api-Version: ~7.2
    Authorization: Signature keyId...

### Example Response

    HTTP/1.1 200 Ok
    Location: /my/users
    Content-Type: application/json
    Content-Length: 400
    Server: Joyent SmartDataCenter 7.2.0
    Api-Version: 7.2.0
    Request-Id: 84c20bf0-93da-11e3-a4d2-8dccf42a3df3

    [{
        id: 'ed976ee5-80a4-42cd-b0d6-5493b7d41132',
        login: 'a4ce91ff',
        email: 'a4ce91ff_test@test.com',
        updated: '2014-02-13T09:18:46.644Z',
        created: '2014-02-13T09:18:46.644Z'
    }, {
        id: '27829465-4150-4fad-9c01-08e0a52267fb',
        login: 'a0af26cf',
        email: 'a0af26cf_test@test.com',
        updated: '2014-02-13T09:20:08.334Z',
        created: '2014-02-13T09:20:08.334Z'
    }]


