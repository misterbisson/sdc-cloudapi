Title: UpdateAccount (POST /:login)
---
Text:

Update your account details with the given parameters.

### Inputs

||**Field**||**Type**||**Description**||
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

    $ sdc-updateaccount --postal-code=12345 --phone='1 (234) 567 890'

### Example Request

    POST /login HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    content-type: application/json
    accept-version: ~7.0
    content-length: 48
    content-md5: 6kCHdE651hsI9N82TUkU/g==
    host: api.example.com
    connection: keep-alive

    postal-code=12345&phone=1%20(234)%20567%20890

### Example Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 317
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    content-md5: dRwQeA63/aCqc43sGyyheg==
    server: Joyent SmartDataCenter 7.0.0
    api-version: 7.0.0
    request-id: be62e5b0-7d0f-11e2-918f-912e9d0235c1
    response-time: 326
    x-request-id: be62e5b0-7d0f-11e2-918f-912e9d0235c1
    x-api-version: 7.0.0
    x-response-time: 326

    {
      "id": "cc71f8bb-f310-4746-8e36-afd7c6dd2895",
      "login": "login",
      "email": "login@example.com",
      "companyName": "Example",
      "firstName": "Name",
      "lastName": "Surname",
      "postalCode": "12345",
      "address": [
        "liltingly, Inc.",
        "6165 pyrophyllite Street"
      ],
      "city": "benzoylation concoctive",
      "state": "SP",
      "country": "BAT",
      "phone": "1 (234) 567 890",
      "updated": "2013-12-20T08:58:51.026Z",
      "created": "2013-12-20T08:58:50.721Z"
    }



