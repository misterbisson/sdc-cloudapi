Title: GetNetwork (GET /:login/networks/:id)
---
Text:


Retrieves information about an individual network.

### Inputs

* None

### Returns

||**Field**||**Type**||**Description**||
||id||String||Unique identifier for this network||
||name||String||The network name||
||public||Boolean||Whether this a public or private (rfc1918) network||
||description||String||Description of this network (optional)||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI

    $ sdc-getnetwork daeb93a2-532e-4bd4-8788-b6b30f10ac17

#### Example Request

    GET /login/networks/daeb93a2-532e-4bd4-8788-b6b30f10ac17 HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    accept-version: ~7.0
    host: api.example.com

#### Example Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 156
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET, HEAD
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    server: Joyent SmartDataCenter 7.0.0
    api-version: 7.0.0
    request-id: cf1c1340-7f49-11e2-8585-bd5fc323c72c
    response-time: 203
    x-request-id: cf1c1340-7f49-11e2-8585-bd5fc323c72c
    x-api-version: 7.0.0
    x-response-time: 203

    {
      "id": "daeb93a2-532e-4bd4-8788-b6b30f10ac17",
      "name": "external",
      "public": true
    }

