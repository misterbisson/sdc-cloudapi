Title: ListNetworks (GET /:login/networks)
---
Text:

List all the networks which can be used by the given account. If a network was
created on a fabric, then additional information will be shown:

### Inputs

* None

### Returns

An array of network objects.  Networks are:

||**Field**||**Type**||**Description**||
||id||String||Unique identifier for this network||
||name||String||The network name||
||public||Boolean||Whether this a public or private (rfc1918) network||
||fabric||Boolean||Whether this network is created on a fabric||
||description||String||Description of this network (optional)||

If the network is on a fabric, the following additional fields are included:

||**Field**||**Type**||**Description**||
||subnet||String||A CIDR formatted string that describes the network||
||provision_start_ip||String||The first IP on the network that may be assigned||
||provision_end_ip||String||The last IP on the network that may be assigned||
||gateway||String||Optional Gateway IP address||
||resolvers||String||Optional Resolver IP addresses||
||routes||Routes Object||Optional Static routes for hosts on this network||


### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist||

### CLI

    $ sdc-listnetworks

#### Example Request

    GET /login/networks HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    accept-version: ~7.0
    host: api.example.com
    connection: keep-alive

#### Example Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 158
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET, HEAD
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    content-md5: v6s92rl/nTS2Ts5CNDcgQw==
    server: Joyent SmartDataCenter 7.0.0
    api-version: 7.0.0
    request-id: 35147710-7f49-11e2-8585-bd5fc323c72c
    response-time: 134
    x-request-id: 35147710-7f49-11e2-8585-bd5fc323c72c
    x-api-version: 7.0.0
    x-response-time: 134

    [
      {
        "id": "daeb93a2-532e-4bd4-8788-b6b30f10ac17",
        "name": "external",
        "public": true
      }
    ]


