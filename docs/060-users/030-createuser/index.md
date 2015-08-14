Title: CreateUser (POST /:account/users)
---
Text:

Creates a new user under an account.

### Inputs

||**Field**||**Type**||**Description**||
||email||String||(Required) Email address||
||login||String||(Required) Login||
||password||String||(Required) Password||
||companyName||String||...||
||firstName||String||...||
||lastName||String||...||
||address||String||...||
||postalCode||String||...||
||city||String||...||
||state||String||...||
||country||String||...||
||phone||String||...||

### Returns

User object:

||**Field**||**Type**||**Description**||
||id||String||Unique id for the user||
||login||String||Sub-user `login` name||
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

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||InvalidArgument||If any of the parameters are invalid, e.g. you try to add a login name already taken by another user of your account||
||MissingParameter||If you didn't send a `login`, `email` or `password`||
||ResourceNotFound||If `:account` does not exist||

### CLI Command:

    $ sdc-user create --login=bob --email=bob@test.joyent.com --password=123secret


### Request:

    POST /my/users HTTP/1.1
    Host: 0.0.0.0:8080
    accept: application/json
    content-type: application/json
    user-agent: restify/2.6.1 (x64-darwin; v8/3.14.5.9; OpenSSL/1.0.1e) node/0.10.26
    accept-version: *
    date: Thu, 01 May 2014 15:35:21 GMT
    content-length: 79
    content-md5: E9EmDJjKXMfIsi2mKbwoZA==

    {
      "login": "pedro",
      "email": "pedro_test@joyent.com",
      "password": "s3cr3t"
    }

### Response:

    HTTP/1.1 201 Created
    location: /thejoy.test@joyent.com/users/1e8369ff-d701-4468-8bfe-950a6ea2432e
    content-type: application/json
    content-length: 173
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: POST, GET, HEAD
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    content-md5: 2laf0bFOI8tw9uxMmzPbPw==
    date: Thu, 01 May 2014 15:35:21 GMT
    server: Joyent SmartDataCenter 7.1.1
    api-version: 7.2.0
    request-id: 34d05030-d146-11e3-a115-31daadd0e9a3
    response-time: 155
    x-request-id: 34d05030-d146-11e3-a115-31daadd0e9a3
    x-api-version: 7.2.0
    x-response-time: 155

    {
      "id": "1e8369ff-d701-4468-8bfe-950a6ea2432e",
      "login": "pedro",
      "email": "pedro_test@joyent.com",
      "updated": "2014-05-01T15:35:21.638Z",
      "created": "2014-05-01T15:35:21.638Z"
    }


