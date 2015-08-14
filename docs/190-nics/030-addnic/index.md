Title: AddNic (POST /:login/machines/:id/nics)
---
Text:


Creates a new NIC on a machine belonging to a given account.

*WARNING*: this causes the machine to reboot while adding the NIC.

### Inputs

||**Field**||**Type**||**Description**||
||network||String||UUID of network this NIC should attach to||

### Returns

The newly-created NIC object:

||**Field**||**Type**||**Description**||
||ip ||String||NIC's IPv4 address||
||mac||String||NIC's MAC address||
||primary||Boolean||Whether this is the VM's primary NIC||
||netmask||String||IPv4 netmask||
||gateway||String||IPv4 gateway||
||state||String||Describes the state of the NIC (most likely 'provisioning')||

It also returns the Location in the headers where the new NIC lives in the HTTP
API. If a NIC already exists for that network, a 302 redirect will be returned
instead of the object.

NICs do not appear on a machine immediately, so the state of the new NIC can be
checked by polling that location. While the NIC is provisioning, it will have a
`state` of 'provisioning'. Once it's 'running', the NIC is active on the
machine. If the provision fails, the NIC will be removed and the location will
start returning 404.

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||
||InvalidArgument||If `:id` isn't a UUID, or the `network` argument isn't a valid UUID||
||MissingParameter||If the `network` argument isn't present||

### CLI

    $ sdc-nics create 7007b198-f6aa-48f0-9843-78a3149de3d7 76a533e9-aa3c-4fd4-a194-03fa05663e0e

#### Example Request

    POST /my/machine/76a533e9-aa3c-4fd4-a194-03fa05663e0e/nics HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    accept-version: ~7.1
    host: api.example.com
    connection: keep-alive

    {
        "network": "7007b198-f6aa-48f0-9843-78a3149de3d7"
    }

#### Example Response

    HTTP/1.1 201 Created
    content-type: application/json
    content-length: 284
    date: Sat, 03 May 2014 13:37:36 GMT
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: POST, GET, HEAD
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    content-md5: ahIN4rEEcEIJGltGn9cqRQ==
    location: /my/machines/76a533e9-aa3c-4fd4-a194-03fa05663e0e/nics/90b8d02fb8f9
    server: Joyent SmartDataCenter 7.1.1
    api-version: 7.2.0
    request-id: 6b8c5170-d45a-11e3-8db6-c7649670227d
    response-time: 183
    x-resource-count: 1
    x-request-id: 6b8c5170-d45a-11e3-8db6-c7649670227d
    x-api-version: 7.2.0
    x-response-time: 183

    {
        "mac": "90:b8:d0:2f:b8:f9",
        "primary": false,
        "ip": "10.88.88.137",
        "netmask": "255.255.255.0",
        "gateway": "10.88.88.2",
        "state": "provisioning"
    }

