Title: GetAccount (GET /:login)
---
Text:

Retrieves your account details.

### Inputs

* None

### Returns

Account object:

||**Field**||**Type**||**Description**||
||id||String||Unique id for you||
||login||String||Your login name||
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
||created||Date (ISO8601)||When this account was created||
||updated||Date (ISO8601)||When this account was updated||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If :login does not exist||

### CLI Command

    $ sdc-getaccount

### Example Request

    GET /login HTTP/1.1
    authorization: Signature keyId="..."
    accept: application/json
    accept-version: ~7.0
    host: api.example.com

### Example Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 316
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    content-md5: F7ACwRAC1+7//jajYKbvYw==
    server: Joyent SmartDataCenter 7.0.0
    api-version: 7.0.0
    request-id: 29be67c0-7d0c-11e2-8048-5195b6159808
    response-time: 164
    x-request-id: 29be67c0-7d0c-11e2-8048-5195b6159808
    x-api-version: 7.0.0
    x-response-time: 164

    {
      "id": "cc71f8bb-f310-4746-8e36-afd7c6dd2895",
      "login": "login",
      "email": "login@example.com",
      "companyName": "Example",
      "firstName": "Name",
      "lastName": "Surname",
      "postalCode": "4967",
      "address": [
        "liltingly, Inc.",
        "6165 pyrophyllite Street"
      ],
      "city": "benzoylation concoctive",
      "state": "SP",
      "country": "BAT",
      "phone": "+1 891 657 5818",
      "updated": "2013-12-20T08:58:51.026Z",
      "created": "2013-12-20T08:58:50.721Z"
    }

