Title: ListMachineFirewallRules (GET /:login/machines/:machine/fwrules)
---
Text: 

Exactly with the same input and output as
[List Firewall Rules](#ListFirewallRules), but just for the rules affecting the
given `:machine`.


## ListFirewallRuleMachines (GET /:login/fwrules/:id/machines)

Will return the collection of machines affected by the firewall rule given by
`:id`.  The output will be exactly the same as for
[List Machines](#ListMachines).




# Fabrics

CloudAPI provides a way to create and manipulate a fabric. On the fabric you can
create VLANs, and then under that create layer three networks.


## ListFabricVLANs (GET /:login/fabrics/default/vlans)

### Inputs

* None

### Returns

An array of VLAN objects that exist on the fabric. Each VLAN object has the
following properties:

||*Field*||*Type*||*Description*||
||vlan_id||Integer||A number from 0-4095 that indicates the VLAN's id||
||name||String||A unique name to identify the VLAN||
||description||String||An optional description of the VLAN||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If :login does not exist||

### CLI

    $ sdc-fabric vlan list

#### Example Request

    GET /login/fabrics/default/vlans HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Accept-version: ~7.3

#### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0

    [
      {
        "name": "default",
        "vlan_id": 2
      }
    ]


## CreateFabricVLAN (POST /:login/fabrics/default/vlans)

Creates a new VLAN on the fabric.

### Inputs

||*Field*||*Type*||*Description*||
|| name || String || A unique name for this VLAN ||
|| vlan_id || Number || The VLAN identifier, must be in the range of 0-4095 ||
|| description || String || An optional description of the VLAN ||

### Returns

A VLAN Object.

||*Field*||*Type*||*Description*||
||vlan_id||Integer||A number from 0-4095 that indicates the VLAN's id||
||name||String||A unique name to identify the VLAN||
||description||String||An optional description of the VLAN||

### Errors

||**Error Code**||**Description**||
||ResourceNotFound||If :login does not exist||
||MissingParameter||If you didn't send a key||
||InvalidArgument||vlan_id or name are in use, or vlan_id is outside the valid range||

### CLI

    $ sdc-fabric vlan create

#### Example Request

    POST /login/fabrics/default/vlans HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Accept-version: ~7.3

    {
      "name": "new",
      "description": "my description",
      "vlan_id": 100
    }

#### Example Response

    HTTP/1.1 201 Created
    Content-Type: application/json
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0

    {
      "name": "new",
      "description": "my description",
      "vlan_id": 100
    }


## GetFabricVLAN (GET /:login/fabrics/default/vlans/:vlan_id)

### Inputs

* None

### Returns

A VLAN Object.

||*Field*||*Type*||*Description*||
||vlan_id||Integer||A number from 0-4095 that indicates the VLAN's id||
||name||String||A unique name to identify the VLAN||
||description||String||An optional description of the VLAN||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:vlan_id` does not exist||

### CLI

    $ sdc-fabric vlan get

#### Example Request

    GET /login/fabrics/default/vlans/2 HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Accept-version: ~7.3

#### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0

    {
      "name": "default",
      "vlan_id": 2
    }

## UpdateFabricVLAN (PUT /:login/fabrics/default/vlans/:vlan_id)

Updates a fabric VLAN.

### Inputs

All inputs are optional.

||*Field*||*Type*||*Description*||
|| name || String || A unique name for this VLAN ||
|| description || String || An optional description of the VLAN ||

### Returns

A VLAN Object.

||*Field*||*Type*||*Description*||
||vlan_id||Integer||A number from 0-4095 that indicates the VLAN's id||
||name||String||A unique name to identify the VLAN||
||description||String||An optional description of the VLAN||

### Errors

||**Error Code**||**Description**||
||ResourceNotFound||If :login or :vlan_id does not exist||

### CLI

    $ sdc-fabric vlan update 2 --description="new description"

#### Example Request

    POST /login/fabrics/default/vlans HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Accept-version: ~7.3

    {
      "description": "new description"
    }

#### Example Response

    HTTP/1.1 202 Accepted
    Content-Type: application/json
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0

    {
      "name": "new",
      "description": "new description",
      "vlan_id": 100
    }


## DeleteFabricVLAN (DELETE /:login/fabrics/default/vlans/:vlan_id)

Deletes the specified VLAN. Note there must be no networks on that VLAN in order
for the VLAN to be deleted.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:vlan_id` does not exist||
||InUseError||The VLAN currently has active networks on it||

### CLI

    $ sdc-fabric vlan delete

#### Example Request

    DELETE /login/fabrics/default/vlans/2 HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Accept-version: ~7.3

#### Example Response

    HTTP/1.1 204 No Content
    Content-Type: application/json
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0


## ListFabricNetworks (GET /:login/fabrics/default/vlans/:vlan_id/networks)

Lists all of the networks in a fabric on the VLAN specified by `:vlan_id`.

### Inputs

* None

### Returns

Returns an array of Network Objects. Each network object has the following
information:

||**Field**||**Type**||**Description**||
||id||String||Unique identifier for this network||
||name||String||The network name||
||public||Boolean||Whether this a public or private (rfc1918) network||
||fabric||Boolean||Whether this network is created on a fabric||
||description||String||Description of this network (optional)||
||subnet||String||A CIDR formatted string that describes the network||
||provision_start_ip||String||The first IP on the network that may be assigned||
||provision_end_ip||String||The last IP on the network that may be assigned||
||gateway||String||Optional Gateway IP address||
||resolvers||String||Resolver IP addresses||
||routes||Routes Object||Optional Static routes for hosts on this network||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:vlan_id` does not exist||

### CLI

    $ sdc-fabric network list

#### Example Request

    GET /login/fabrics/default/vlans/2/networks HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Accept-version: ~7.3

#### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0

    [
      {
        "id": "7326787b-8039-436c-a533-5038f7280f04",
        "name": "default",
        "public": false,
        "fabric": true,
        "gateway": "192.168.128.1",
        "provision_end_ip": "192.168.131.250",
        "provision_start_ip": "192.168.128.5",
        "resolvers": [
          "8.8.8.8",
          "8.8.4.4"
        ],
        "subnet": "192.168.128.0/22",
        "vlan_id": 2
      },
      {
        "id": "7fa999c8-0d2c-453e-989c-e897716d0831",
        "name": "newnet",
        "public": false,
        "fabric": true,
        "provision_end_ip": "10.50.1.20",
        "provision_start_ip": "10.50.1.2",
        "resolvers": [
          "8.8.8.8"
        ],
        "subnet": "10.50.1.0/24",
        "vlan_id": 2
      }
    ]


## CreateFabricNetwork (POST /:login/fabrics/default/vlans/:vlan_id/networks)

### Inputs

||**Field**||**Type**||**Description**||
||name||String||The network name, it must be unique||
||description||String||Description of this network (optional)||
||subnet||String||A CIDR formatted string that describes the network||
||provision_start_ip||String||The first IP on the network that may be assigned||
||provision_end_ip||String||The last IP on the network that may be assigned||
||gateway||String||Optional Gateway IP address||
||resolvers||String||Optional Resolver IP addresses||
||routes||Routes Object||Optional Static routes for hosts on this network||

### Returns

Network Object:

||**Field**||**Type**||**Description**||
||id||String||Unique identifier for this network||
||name||String||The network name||
||public||Boolean||Whether this a public or private (rfc1918) network||
||fabric||Boolean||Whether this network is created on a fabric||
||description||String||Description of this network (optional)||
||subnet||String||A CIDR formatted string that describes the network||
||provision_start_ip||String||The first IP on the network that may be assigned||
||provision_end_ip||String||The last IP on the network that may be assigned||
||gateway||String||Optional Gateway IP address||
||resolvers||String||Optional Resolver IP addresses||
||routes||Routes Object||Optional Static routes for hosts on this network||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If :login does not exist||

### CLI

    $ sdc-fabric network create

#### Example Request

    POST /login/fabrics/default/vlans/2/networks HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Accept-version: ~7.3

    {
      "name": "newnet",
      "provision_end_ip": "10.50.1.20",
      "provision_start_ip": "10.50.1.2",
      "resolvers": [
        "8.8.8.8"
      ],
      "subnet": "10.50.1.0/24"
    }

#### Example Response

    HTTP/1.1 201 Created
    Content-Type: application/json
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0

    {
      "id": "7fa999c8-0d2c-453e-989c-e897716d0831",
      "name": "newnet",
      "public": false,
      "fabric": true,
      "provision_end_ip": "10.50.1.20",
      "provision_start_ip": "10.50.1.2",
      "resolvers": [
        "8.8.8.8"
      ],
      "subnet": "10.50.1.0/24",
      "vlan_id": 2
    }

## GetFabricNetwork (GET /:login/fabrics/default/vlans/:vlan_id/networks/:id)

### Inputs

* None

### Returns

The details of the network object:

||**Field**||**Type**||**Description**||
||id||String||Unique identifier for this network||
||name||String||The network name||
||public||Boolean||Whether this a public or private (rfc1918) network||
||fabric||Boolean||Whether this network is created on a fabric||
||description||String||Description of this network (optional)||
||subnet||String||A CIDR formatted string that describes the network||
||provision_start_ip||String||The first IP on the network that may be assigned||
||provision_end_ip||String||The last IP on the network that may be assigned||
||gateway||String||Optional Gateway IP address||
||resolvers||String||Optional Resolver IP addresses||
||routes||Routes Object||Optional Static routes for hosts on this network||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login`, `:vlan_id` or `id` does not exist||


### CLI

    $ sdc-fabric network get

#### Example Request

    GET /login/fabrics/default/vlans/2/networks/7fa999c8-0d2c-453e-989c-e897716d0831 HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Accept-version: ~7.3

#### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0

    {
      "id": "7fa999c8-0d2c-453e-989c-e897716d0831",
      "name": "newnet",
      "public": false,
      "fabric": true,
      "provision_end_ip": "10.50.1.20",
      "provision_start_ip": "10.50.1.2",
      "resolvers": [
        "8.8.8.8"
      ],
      "subnet": "10.50.1.0/24",
      "vlan_id": 2
    }



## DeleteFabricNetwork (DELETE /:login/fabrics/default/vlans/:vlan_id/networks/:id)

Deletes the specified Network. Note that no VMs may be provisioned on the
Network.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login`, `:vlan_id` or `id` does not exist||
||InUseError||The VLAN currently has active networks on it||

### CLI

    $ sdc-fabric network delete

#### Example Request

    DELETE /login/fabrics/default/vlans/2/networks/7fa999c8-0d2c-453e-989c-e897716d0831 HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Accept-version: ~7.3

#### Example Response

    HTTP/1.1 204 No Content
    Content-Type: application/json
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0




# Networks

CloudAPI provides a way to get details on public and customer-specific networks
in a datacenter. This also includes all of the networks available in your
fabric.

||uuid||String||Unique identifier for this network||
||name||String||The network name||
||public||Boolean||Whether this a public or private (rfc1918) network||
||fabric||Boolean||Whether this network is created on a fabric||
||description||String||Description of this network (optional)||
||subnet||String||A CIDR formatted string that describes the network||
||provision_start_ip||String||The first IP on the network that may be assigned||
||provision_end_ip||String||The last IP on the network that may be assigned||
||gateway||String||Optional Gateway IP address||
||resolvers||String||Optional Resolver IP addresses||
||routes||Routes Object||Optional Static routes for hosts on this network||



## ListNetworks (GET /:login/networks)

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


## GetNetwork (GET /:login/networks/:id)

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




# Nics

CloudAPI provides a way to list, add and remove NICs attached to a machine.

## ListNics (GET /:login/machines/:id/nics)

List all the NICs on a machine belonging to a given account.

### Inputs

* None

### Returns

An array of NIC objects. NICs are:

||**Field**||**Type**||**Description**||
||ip ||String||NIC's IPv4 address||
||mac||String||NIC's MAC address||
||primary||Boolean||Whether this is the VM's primary NIC||
||netmask||String||IPv4 netmask||
||gateway||String||IPv4 gateway||
||state||String||Describes the state of the NIC (e.g. provisioning, running, or stopped)||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login or `:id` does not exist||
||InvalidArgument||If `:id` isn't a UUID||

### CLI

    $ sdc-nics list 76a533e9-aa3c-4fd4-a194-03fa05663e0e

#### Example Request

    GET /my/machine/76a533e9-aa3c-4fd4-a194-03fa05663e0e/nics HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    accept-version: ~7.1
    host: api.example.com
    connection: keep-alive

#### Example Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 286
    date: Sat, 03 May 2014 13:37:36 GMT
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: POST, GET, HEAD
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    content-md5: ahIN4rEEcEIJGltGn9cqRQ==
    server: Joyent SmartDataCenter 7.1.1
    api-version: 7.2.0
    request-id: 6b8c5170-d45a-11e3-8db6-c7649670227d
    response-time: 183
    x-resource-count: 1
    x-request-id: 6b8c5170-d45a-11e3-8db6-c7649670227d
    x-api-version: 7.2.0
    x-response-time: 183

    [
        {
            "mac": "90:b8:d0:2f:b8:f9",
            "primary": true,
            "ip": "10.88.88.137",
            "netmask": "255.255.255.0",
            "gateway": "10.88.88.2",
            "state": "running"
        }
    ]


## GetNic (GET /:login/machines/:id/nics/:mac)

Gets a specific NIC on a machine belonging to a given account.

NB: the `:mac` element in the path must have all the colons (':') stripped from
it in the request.

### Inputs

* None

### Returns

A NIC object:

||**Field**||**Type**||**Description**||
||ip ||String||NIC's IPv4 address||
||mac||String||NIC's MAC address||
||primary||Boolean||Whether this is the VM's primary NIC||
||netmask||String||IPv4 netmask||
||gateway||String||IPv4 gateway||
||state||String||Describes the state of the NIC (e.g. provisioning, running, or stopped)||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login`, `:id`, or `:mac` does not exist||
||InvalidArgument||If `:id` isn't a UUID, or `:mac` isn't a MAC address (without colons)||

### CLI

    $ sdc-nics get 90:b8:d0:2f:b8:f9 76a533e9-aa3c-4fd4-a194-03fa05663e0e

#### Example Request

    GET /my/machine/76a533e9-aa3c-4fd4-a194-03fa05663e0e/nics/90b8d02fb8f9 HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    accept-version: ~7.1
    host: api.example.com
    connection: keep-alive

#### Example Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 284
    date: Sat, 03 May 2014 13:37:36 GMT
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET, HEAD, DELETE
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    content-md5: ahIN4rEEcEIJGltGn9cqRQ==
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
        "primary": true,
        "ip": "10.88.88.137",
        "netmask": "255.255.255.0",
        "gateway": "10.88.88.2",
        "state": "running"
    }


## AddNic (POST /:login/machines/:id/nics)

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


## RemoveNic (POST /:login/machines/:id/nics/:mac)

Removes a NIC on a machine belonging to a given account.

Like [AddNic](#AddNic) above, the NIC won't be removed from the machine
immediately. After the NIC is removed, it will start returning 404 through
CloudAPI.

*WARNING*: this causes the machine to reboot while removing the NIC.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login`, `:id` or `:mac` does not exist||
||InvalidArgument||If `:id` isn't a UUID||

### CLI

    $ sdc-nics delete 90:b8:d0:2f:b8:f9 76a533e9-aa3c-4fd4-a194-03fa05663e0e

#### Example Request

    DELETE /my/machine/76a533e9-aa3c-4fd4-a194-03fa05663e0e/nics/90b8d02fb8f9 HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    accept-version: ~7.1
    host: api.example.com
    connection: keep-alive

#### Example Response

    HTTP/1.1 204 No Content
    content-type: application/json
    content-length: 0
    date: Sat, 03 May 2014 13:37:36 GMT
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET, HEAD, DELETE
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    server: Joyent SmartDataCenter 7.1.1
    api-version: 7.2.0
    request-id: 6b8c5170-d45a-11e3-8db6-c7649670227d
    response-time: 183
    x-resource-count: 1
    x-request-id: 6b8c5170-d45a-11e3-8db6-c7649670227d
    x-api-version: 7.2.0
    x-response-time: 183



# Appendix A: Machine States

## Machine State Diagram

The following is the state diagram for a machine:

<pre>
          POST /my/machines
                     |
                     |
                     V
          +----------------+
          |  Provisioning  |
          +----------------+
                     |
                     |
                     V
          +----------------+
    +---->|     Running    |
    |     +----------------+
    |                |
    |                | action=stop
    |                V
    |     +----------------+
    |     |    Stopping    |
    |     +----------------+
    |                |
    | action=start   |
    |                V
    |     +----------------+
    +---- |     Stopped    |
          +----------------+
                     |
                     | DELETE
                     V
          +----------------+
          |  Deleted       |---+
          +----------------+   |
                               |
                              ---
                               -

</pre>

At any point the state can also be `offline`, like if there is a network or
power event to the machine.

Since version 7.0 of this API, `failed` is used to signify a failed provision.


## Polling machine state

As suggested in [CreateMachine](#CreateMachine), you can poll a machine's state
to check when that machine's provisioning has either successfully completed or
failed.  Consider the following code using
[node.js SDK](https://github.com/joyent/node-smartdc):

    var sdc = smartdc.createClient({ ... });

    function checkMachineStatus(id, state, callback) {
        return sdc.getMachine(id, function (err, machine) {
            if (err) {
                if (err.statusCode === 410 && state === 'deleted') {
                    return callback(null, true);
                }
                return callback(err);
            }

            if ((machine.state === 'deleted' && state !== 'deleted') ||
                machine.state === 'failed') {
                return callback(new Error('Provisioning Job failed'));
            }

            return callback(null, (machine ? machine.state === state : false));
        }, true);
    }


    function waitForMachine(id, state, callback) {
        return checkMachineStatus(id, state, function (err, ready) {
            if (err) {
                return callback(err);
            }
            if (!ready) {
                return setTimeout(function () {
                    waitForMachine(id, state, callback);
                }, (process.env.POLL_INTERVAL || 2500));
            }
            return callback(null);
        });
    }

With this code, you can poll when a machine with a given uuid is running by
doing:

    var machine = 'd19432ff-d921-4d6c-b5f9-6b0e4de6665c';
    waitForMachine(machine, 'running', function (err) {
        if (err) {
            console.error('Exiting because machine provisioning failed');
            process.exit(1);
        }

        // ... do your stuff here, the machine is running now ...
    });


## Polling machine audit

There are some cases where polling for machine state change will not work
because there won't be a state change for the requested action (e.g. "rename"),
or because the state change is short-lived thus making the transition easy to
miss (e.g. "reboot").

In such cases, consider polling a machine's historical of actions available
through a machine's [Machine Audit](#MachineAudit), wait for the desired
action to appear on that list, and check successfulness there.  Taking our
example from previous section, this is how we could check for a reboot:

    function checkMachineAction(id, action, time, cb) {
        return sdc.getMachineAudit(id, function (err, actions) {
            if (err) {
                return cb(err);
            }

            var acts = actions.filter(function (a) {
                return (a.action === action && (new Date(a.time) > time));
            });

            if (acts.length === 0) {
                return cb(null, false);
            }

            var act = acts[0];
            if (act.success !== 'yes') {
                return cb(action + ' failed');
            }

            return cb(null, true);  // success!
        }, true);
    }


    function waitForAction(id, action, time, cb) {
        console.log('Waiting for machine \'%s\' %s to complete',
                id, action);

        return checkMachineAction(id, action, time, function (err, ready) {
            if (err) {
                return cb(err);
            }

            if (!ready) {
                return setTimeout(function () {
                    waitForAction(id, action, time, cb);
                }, (process.env.POLL_INTERVAL || 2500));
            }
            return cb(null);
        });
    }

With this code, you can poll when a machine with a given uuid has rebooted by
doing:

    waitForAction(machine, 'reboot', (new Date()), function (err) {
        if (err) {
            // .. something failed
        } else {
            // ...all good, reboot happened successfully and machine is running
        }
    });




# Appendix B: Cloud Analytics

Cloud Analytics (CA) provides deep observability for systems and applications in
a SmartDataCenter cloud.  The CA service enables you to dynamically instrument
systems in the cloud to collect performance data that can be visualized in
real-time (through the portal), or collected using the API and analyzed later by
custom tools.  This data can be collected and saved indefinitely for capacity
planning and other historical analysis.


## Building blocks: metrics, instrumentations, and fields

A **metric** is any quantity that can be instrumented using CA.  For examples:

* Disk I/O operations
* Kernel thread executions
* TCP connections established
* MySQL queries
* HTTP server operations
* System load average

Each metric also defines which **fields** are available when data is collected.
These fields can be used to filter or decompose data.  For example, the Disk I/O
operations metric provides the fields "hostname" (for the current server's
hostname) and "disk" (for the name of the disk actually performing an
operation), which allows users to filter out data from a physical server or
break out the number of operations by disk.

You can list the available metrics using the
[DescribeAnalytics](#DescribeAnalytics) API. E.g.:

    {
      "metrics": [
        {
          "module": "fs",
          "stat": "logical_ops",
          "label": "logical filesystem operations",
          "interval": "interval",
          "fields": ["pid","execname",...,"fstype","optype","latency"],
          "unit": "operations"
        }, ...  ], ...
    }

The `module` and `stat` properties together identify a metric.

When you want to actually gather data for a metric, you create an
**instrumentation**.  The instrumentation specifies:

* which metric to collect
* an optional **predicate** based on the metric's fields (e.g. only collect
  data from certain hosts, or data for certain operations)
* an optional **decomposition** based on the metric's fields (e.g. break down
  the results by server hostname)
* how frequently to aggregate data (e.g. every second, every hour, etc.)
* how much data to keep (e.g. 10 minutes' worth, 6 months' worth, etc.)
* other configuration options

Continuing the above example, if the system provides the metric "FS Operations"
with fields "optype" and "latency", an example instrumentation might specify:

* to collect data for the "FS Operations" metric (the *metric*)
* to collect only data for read operations (a *predicate*)
* to break out the results by latency (a *decomposition*)

    $ sdc-createinstrumentation --module=fs --stat=logical_ops --decomposition=latency --predicate='{"eq": ["optype","read"]}'

When we create an instrumentation, the system dynamically instruments the
relevant software and starts gathering data.  The data is made available
immediately in real-time.  To get the data for a particular point in time, you
retrieve the **value** of the instrumentation for that time:

    $ sdc-getinstrumentation --value 4
    {
      "value": [
        [ [ 17000, 17999 ], 12 ],
        [ [ 18000, 18999 ], 12 ],
        ...
      ],
      "transformations": {},
      "start_time": 1309383598,
      "duration": 1,
      "nsources": 1,
      "minreporting": 1,
      "requested_start_time": 1309383598,
      "requested_duration": 1,
      "requested_end_time": 1309383599
    }

To summarize: *metrics* define what data the system is capable of reporting.
*Fields* enhance the raw numbers with additional metadata about each event that
can be used for filtering and decomposition.  *Instrumentations* specify which
metrics to actually collect, what additional information to collect from each
metric, and how to store that data.  When you want to retrieve that data, you
query the service for the *value* of the instrumentation.


## Values and visualizations

We showed above how fields can be used to decompose results.  Let's look at that
in more detail.  We'll continue using the "FS Operations" metric with
fields "optype".

### Scalar values

Suppose we create an instrumentation with no filter and no decomposition.  Then
the value of the instrumentation for a particular time interval might look
something like this:

    {
      start_time: 1308789361,
      duration: 1,
      value: 573
      ...
    }

In this case, `start_time` denotes the start of the time interval in Unix time,
`duration` denotes the length of the interval in seconds, and `value` denotes
the actual value.  This means that 573 FS operations completed on all
systems for a user in the cloud between times 1308789361 and 1308789362.

### Discrete decompositions

Now suppose we create a new instrumentation with a decomposition by `execname`.
Then the raw value might look something like this:

    {
      start_time: 1308789361,
      duration: 1,
      value: {
        ls: 1,
        cat: 49,
        ...
      }
      ...
    }

We call the decomposition by `execname` a **discrete decomposition** because the
possible values of execname ("ls", "cat", ...) are not numbers.

### Numeric decompositions

It's useful to decompose some metrics by numeric fields.  For example, you might
want to view FS operations decomposed by latency (how long the operation
took).  The result is a statistical *distribution*, which groups nearby
latencies into buckets and shows the number of disk I/O operations that fell
into each bucket. The result looks like this:

    {
      "start_time": 1308863061,
      "duration": 1,
      "value": [
        [ [ 53000, 53999 ], 4 ],
        [ [ 54000, 54999 ], 4 ],
        [ [ 55000, 55999 ], 7 ],
        ...
        [ [ 810000, 819999 ], 1 ]
      ]
    }

That data indicates that at time 1308863061, the system completed:

* 4 requests with latency between 53 and 54 microseconds,
* 4 requests with latency between 54 and 55 microseconds,
* 7 requests between 55 and 56 microseconds, and so on, and finally
* 1 request with latency between 810 and 820 microseconds.

This type of instrumentation is called a **numeric decomposition**.

### Combining decompositions

It's possible to combine a single discrete and numeric decomposition to produce
an object mapping discrete key to numeric distribution, whose value looks like
this:

    {
      "start_time": 1308863799,
      "duration": 1,
      "value": {
        "ls": [
          [ [ 110000, 119999 ], 1 ],
          [ [ 120000, 129999 ], 1 ],
          ...
          [ [ 420000, 429999 ], 1 ],
          [ [ 25000000, 25999999 ], 1 ]
        ]
      }
    }

As we will see, this data allows clients to visualize the distribution of I/O
latency, and then highlight individual programs in the distribution (or whatever
field you broke it down along).

### Value-related properties

We can now explain several of the instrumentation properties shown previously:

* `value-dimension`: the number of dimensions in returned values, which is
  the number of decompositions specified in the instrumentation, plus 1.
  Instrumentations with no decompositions have dimension 1 (scalar values).
  Instrumentations with a single discrete or numeric decomposition have value 2
  (vector values).  Instrumentations with both a discrete and numeric
  decomposition have value 3 (vector of vectors).
* `value-arity`: describes the format of individual values
    * `scalar`: the value is a scalar value (a number)
    * `discrete-decomposition`: the value is an object mapping discrete keys to
      scalars
    * `numeric-decomposition`: the value is either an object (really an array of
      arrays) mapping buckets (numeric ranges) to scalars, or an object mapping
      discrete keys to such an object.  That is, a numeric decomposition is one
      which contains at the leaf a distribution of numbers.

The arity serves as a hint to visualization clients: scalars are typically
rendered as line or bar graphs, discrete decompositions are rendered as stacked
or separate line or bar graphs, and numeric decompositions are rendered as
heatmaps.

### Predicate Syntax

Predicates allow you to filter out data points based on the *fields* of a
metric.  For example, instead of looking at FS operations for your whole
cloud, you may only care about operations with latency over 100ms, or on a
particular machine.

Predicates are represented as JSON objects using an LISP-like syntax.  The
primary goal for predicate syntax is to be very easy to construct and parse
automatically, making it easier for people to build tools to work with them.

The following leaf predicates are available:

`{ eq: [ fieldname, value ] }`: equality (string or number, as appropriate).
`{ ne: [ fieldname, value ] }`: inequality (string or number, as appropriate).
`{ le: [ fieldname, value ] }`: less than or equal to (numbers only).
`{ lt: [ fieldname, value ] }`: less than (numbers only).
`{ ge: [ fieldname, value ] }`: greater than or equal to (numbers only).
`{ gt: [ fieldname, value ] }`: greater than (numbers only).

Additionally, the following compound predicates are available:

`{ and: [ predicate, ... ] }`: all of subpredicates must be true.
`{ or: [ predicate, ... ] }`: at least one of subpredicates must be true.

All of these can be combined to form complex filters for drilling down.  For
example, this predicate:

    {
      and: {
        { eq: [ "execname", "mysqld" ] }
        { gt: [ "latency", 100000000 ] },
        { or: [
          { eq: [ "hostname", "host1" ] },
          { eq: [ "hostname", "host2" ] },
          { eq: [ "hostname", "host3" ] }
        ] },
      }
    }

This predicate could be used with the "logical filesystem operations" metric to
identify file operations performed by MySQL on machines "host1", "host2", or
"host3" that took longer than 100ms.

### Heatmaps

Up to this point we have been showing **raw values**, which are JSON
representations of the data exactly as gathered by Cloud Analytics. However, the
service may provide other representations of the same data.  For numeric
decompositions, the service provides several **heatmap** resources that generate
heatmaps, like this one:

<img src="media/img/heatmap.png" />

Like raw values, heatmap values are returned using JSON, but instead of
specifying a `value` property, they specify an `image` property whose contents
are a base64-encoded PNG image.  For details, see the API reference.  Using the
API, it's possible to specify the size of the image, the colors used, which
values of the discrete decomposition to select, and many other properties
controlling the final result.

Heatmaps also provide a resource for getting the details of a particular heatmap
bucket, which looks like this:

    {
      "start_time": 1308865184,
      "duration": 60,
      "nbuckets": 100,
      "width": 600,
      "height": 300,
      "bucket_time": 1308865185,
      "bucket_ymin": 10000,
      "bucket_ymax": 19999,
      "present": {
        "ls": 5,
        "cat": 57
      },
      "total": 1,
    }

This example indicates the following about the particular heatmap bucket we
clicked on:

* the time represented by the bucket is 1308865185
* the bucket covers a latency range between 10 and 20 microseconds
* at that time and latency range, program `ls` completed 5 operations and
  program `cat` completed 57 operations.

This level of detail is critical for understanding hot spots or other patterns
in the heatmap.


## Data granularity and data retention

By default, CA collects and saves data each second for ten minutes.  So if you
create an instrumentation for FS operations, the service will save the
per-second number of FS operations going back for the last ten minutes.  These
parameters are configurable using the following instrumentation properties:

* `granularity`: how frequently to aggregate data, in seconds.  The default is
  one second.  For example, a value of 300 means to aggregate every five
  minutes' worth of data into a single data point.  The smaller this value, the
  more space the raw data takes up.  `granularity` cannot be changed after an
  instrumentation is created.
* `retention-time`: how long, in seconds, to keep each data point.  The default
  is 600 seconds (ten minutes).  The higher this value, the more space the raw
  data takes up.  `retention-time` can be changed after an instrumentation is
  created.

These values affect the space used by the instrumentation's data.  For example,
all things being equal, the following all store the same amount of data:

* 10 minutes' worth of per-second data (600 data points)
* 50 minutes' worth of per-5-second data
* 25 days' worth of per-hour data
* 600 days' worth of per-day data

The system imposes limits on these properties so that each instrumentation's
data cannot consume too much space.  The limits are expressed internally as a
number of data points, so you can adjust granularity and retention-time to match
your needs.  Typically, you'll be interested in either per-second data for live
performance analysis, or an array of different granularities and retention-times
for historical usage patterns.


## Data persistence

By default, data collected by the CA service is only cached in memory, not
persisted to disk.  As a result, transient failures of the underlying CA service
instances can result in loss of the collected data.  For live performance
analysis, this is likely not an issue, since the likelihood of a crash is low
and the data can probably be collected again.  For historical data being kept
for days, weeks, or even months, it's necessary to persist data to disk.  This
can be specified by setting the `persist-data` instrumentation property to
"true".  In that case, CA will ensure that data is persisted at approximately
the `granularity` interval of the instrumentation, but no more frequently than
every few minutes.  (For that reason, there's little value in persisting an
instrumentation whose retention time is only a few minutes.)


## Transformations

Transformations are post-processing functions that can be applied to data when
it's retrieved.  You do not need to specify transformations when you create an
instrumentation; you need only specify them when you retrieve the value.
Transformations map values of a discrete decomposition to something else.  For
example, a metric that reports HTTP operations decomposed by IP address supports
a transformation that performs a reverse-DNS lookup on each IP address so that
you can view the results by hostname instead.  Another transformation maps IP
addresses to geolocation data for displaying incoming requests on a world map.

Each supported transformation has a name, like "reversedns".  When a
transformation is requested for a value, the returned value includes a
`transformations` object with keys corresponding to each transformation (e.g.,
"reversedns").  Each of these is an object mapping keys of the discrete
decomposition to transformed values.  For example:

    {
      "value": {
        "8.12.47.107": 57
      },
      "transformations": {
        "reversedns": {
          "8.12.47.107": [ "joyent.com" ]
        }
      },
      "start_time": 1308863799,
      "duration": 1,
      "nsources": 1,
      "minreporting": 1,
      "requested_start_time": 1308863799,
      "requested_duration": 1,
      "requested_end_time": 1308863800
    }

Transformations are always performed asynchronously and the results cached
internally for future requests.  So the first time you request a transformation
like "reversedns", you may see no values transformed at all.  As you retrieve
the value again, the system will have completed the reverse-DNS lookup for
addresses in the data and they will be included in the returned value.




# Appendix C: HTTP Signature Authentication

In addition to HTTP Basic Authentication, CloudAPI supports a new mechanism for
authenticating HTTP requests based on signing with your SSH private key.
Specific examples of using this mechanism with SDC are given here. Reference the
`HTTP Signature Authentication` specification by Joyent, Inc. for complete
details.

A node.js library for HTTP Signature is available with:

    $ npm install http-signature@0.9.11


## CloudAPI Specific Parameters

The `Signature` authentication scheme is based on the model that the client must
authenticate itself with a digital signature produced by the private key
associated with an SSH key under your account (see `/my/keys` above).  Currently
only RSA signatures are supported.  You generate a signature by signing the
value of the HTTP `Date` header.

As an example, assuming that you have associated an RSA SSH key with your
account, called 'rsa-1', the following request is what you would send for a
`ListMachines` request:

    GET /my/machines HTTP/1.1
    Host: api.example.com
    Date: Sat, 11 Jun 2011 23:56:29 GMT
    Authorization: Signature keyId="/demo/keys/rsa-1",algorithm="rsa-sha256" <Base64(rsa(sha256($Date)))>
    Accept: application/json
    Api-Version: ~7.0

Where the signature is attached with the
`Base64(rsa(sha256(Sat, 11 Jun 2011 23:56:29 GMT)))` output.  Note that the
`keyId` parameter **cannot** use the *my* shortcut, as in the HTTP resource
paths. This is because CloudAPI must lookup your account to resolve the key, as
with Basic authentication.  In short, you **MUST** use the login name associated
to your account to specify the `keyId`.


## Sample Code

Sample code for generating the `Authorization` header (and `Date` header):

    var crypto = require('crypto');
    var fs = require('fs');
    var https = require('https');



    /**
     * Simply pads a number < 10 with a leading 0.
     *
     * @param {String} val a numeric string.
     * @return {String} a new value that may have a leading 0.
     */
    function pad(val) {
      if (parseInt(val, 10) < 10)
        val = '0' + val;
      return val;
    }


    /**
     * Generates an RFC 1123 compliant Date String
     *
     * @return {String} RFC 1123 date string.
     */
    function httpDate() {
      var now = new Date();
      var months = ['Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'];
      var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return days[now.getUTCDay()] + ', ' +
                  pad(now.getUTCDate()) + ' ' +
                  months[now.getUTCMonth()] + ' ' +
                  now.getUTCFullYear() + ' ' +
                  pad(now.getUTCHours()) + ':' +
                  pad(now.getUTCMinutes()) + ':' +
                  pad(now.getUTCSeconds()) +
                  ' GMT';
    }


    ///--- Mainline

    // Read in an SSH key from the "usual" location.
    var file = process.env.HOME + '/.ssh/id_rsa';
    var key = fs.readFileSync(file, 'ascii');
    if (!key)
      throw new Error(file + ' was not a valid RSA key');

    var date = httpDate();
    var signer = crypto.createSign('RSA-SHA256');
    signer.update(date);
    authz = 'Signature keyId="/mark/keys/rsa-1",algorithm="rsa-sha256" ' + signer.sign(key, 'base64');

    var request = {
      host: 'api.example.com',
      path: '/my/machines',
      headers: {
        'x-api-version': '~7.0',
        'Date': date,
        'Authorization': authz
      }
    };
    https.get(request, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers, null, 2));
      res.setEncoding('utf8');
      res.body = '';
      res.on('data', function(chunk) {
        res.body += chunk;
      });
      res.on('end', function() {
        console.log('BODY: ' + JSON.stringify(res.body, null, 2));
      });
    }).end();




# Appendix D: CloudAPI CLI Commands

||**Command**||**Description**||
||[sdc-addmachinetags](#AddMachineTags)||Allows you to add additional tags, other than those set at provisioning time.||
||[sdc-chmod](#SetRoleTags)||Add role tags to CloudAPI resources.||
||[sdc-createfirewallrule](#CreateFirewallRule)||Add a new firewall rule.||
||[sdc-createimagefrommachine](#CreateImageFromMachine)||Create a new custom image from a machine.||
||[sdc-createinstrumentation](#CreateInstrumentation)||Creates an instrumentation.||
||[sdc-createkey](#CreateKey)||Uploads a new OpenSSH key to SmartDataCenter.||
||[sdc-createmachine](#CreateMachine)||Allows you to provision a machine.||
||[sdc-createmachinesnapshot](#CreateMachineSnapshot)||Allows you to take a snapshot of a machine.||
||[sdc-deletefirewallrule](#DeleteFirewallRule)||Removes a given firewall rule.||
||[sdc-deleteimage](#DeleteImage)||Delete a private image.||
||[sdc-deleteinstrumentation](#DeleteInstrumentation)||Destroys an instrumentation.||
||[sdc-deletekey](#DeleteKey)||Deletes an SSH key by name.||
||[sdc-deletemachine](#DeleteMachine)||Allows you to completely destroy a machine.||
||[sdc-deletemachinemetadata](#DeleteMachineMetadata)||Deletes a single metadata key from this machine.||
||[sdc-deletemachinesnapshot](#DeleteMachineSnapshot)||Deletes the specified snapshot of a machine.||
||[sdc-deletemachinetag](#DeleteMachineTag)||Deletes a single tag from this machine.||
||[sdc-describeanalytics](#DescribeAnalytics)||Retrieves the "schema" for instrumentations that can be created using the analytics endpoint.||
||[sdc-disablefirewallrule](#DisableFirewallRule)||Disable an enabled firewall rule.||
||[sdc-disablemachinefirewall](#DisableMachineFirewall)||Completely disable the firewall on a machine.||
||[sdc-enablefirewallrule](#EnableFirewallRule)||Enable a disabled firewall rule.||
||[sdc-enablemachinefirewall](#EnableMachineFirewall)||Enable the firewall on a machine.||
||[sdc-exportimage](#ExportImage)||Export an image to Manta.||
||[sdc-fabric](#Fabrics)||Administer fabric networks and VLANs.||
||[sdc-getaccount ](#GetAccount)||Gets details about your account.||
||[sdc-getdataset](#GetDataset)||Gets an individual dataset by id. (deprecated)||
||[sdc-getfirewallrule](#GetFirewallRule)||Get details about a specific firewall rule.||
||[sdc-getimage](#GetImage)||Gets an individual image by id.||
||[sdc-getinstrumentation](#GetInstrumentation)||Retrieves the configuration for an instrumentation.||
||[sdc-getkey](#GetKey)||Retrieves an individual key record.||
||[sdc-getmachine](#GetMachine)||Gets the details for an individual machine.||
||[sdc-getmachineaudit](#MachineAudit)||Get a historical list of actions performed on a machine.||
||[sdc-getmachinemetadata](#GetMachineMetadata)||Returns the complete set of metadata associated with this machine.||
||[sdc-getmachinesnapshot](#GetMachineSnapshot)||Gets the state of the named snapshot.||
||[sdc-getmachinetag](#GetMachineTag)||Returns the value for a single tag on this machine.||
||[sdc-getnetwork](#GetNetwork)||Gets a network by the given id.||
||[sdc-getpackage](#GetPackage)||Gets a package by name.||
||sdc-info||List of role-tags assigned to a given resource.||
||[sdc-listdatacenters](#ListDatacenters)||Provides a list of all datacenters this cloud is aware of.||
||[sdc-listdatasets](#ListDatasets)||Provides a list of datasets available in this datacenter. (deprecated)||
||sdc-listfirewallrulemachines||||
||[sdc-listfirewallrules](#ListFirewallRules)||List all firewall rules applying to this account.||
||[sdc-listimages](#ListImages)||Provides a list of images available in this datacenter.||
||[sdc-listinstrumentations](#ListInstrumentations)||Retrieves all currently created instrumentations.||
||[sdc-listkeys](#ListKeys)||Lists all public keys we have on record for the specified account.||
||sdc-listmachinefirewallrules||List firewall rules applying to a specific machine.||
||[sdc-listmachines](#ListMachines)||Lists all machines on an account.||
||[sdc-listmachinesnapshots](#ListMachineSnapshots)||Lists all snapshots taken for a given machine.||
||[sdc-listmachinetags](#ListMachineTags)||Returns the complete set of tags associated with this machine.||
||[sdc-listnetworks](#ListNetworks)||Provides a list of networks available to the user in this datacenter.||
||[sdc-listpackages](#ListPackages)||Provides a list of packages available in this datacenter.||
||[sdc-policy](#Policies)||Add, list, update and remove policies.||
||[sdc-rebootmachine](#RebootMachine)||Allows you to 'reboot' a machine.||
||[sdc-renamemachine](#RenameMachine)||Rename a machine.||
||[sdc-replacemachinetags](#ReplaceMachineTags)||Replace all tags on a machine.||
||[sdc-resizemachine](#ResizeMachine)||Allows you to resize a SmartMachine.||
||[sdc-role](#Roles)||Add, list, update and remove roles.||
||[sdc-setup](#set-up-your-cli)||Sets up an account on a datacenter for use with this CLI.||
||[sdc-startmachine](#StartMachine)||Allows you to boot up a machine||
||[sdc-startmachinefromsnapshot](#StartMachineFromSnapshot)||Starts a stopped machine from the referenced snapshot.||
||[sdc-stopmachine](#StopMachine)||Allows you to shut down a machine.||
||[sdc-updateaccount](#UpdateAccount)||Change details of the current account.||
||[sdc-updatefirewallrule](#UpdateFirewallRule)||Change a firewall rule.||
||[sdc-updateimage](#UpdateImage)||Update metadata about an image.||
||[sdc-updatemachinemetadata](#UpdateMachineMetadata)||Allows you to update the metadata for a given machine.||
||[sdc-user](#Users)||Add, update and remove account users and their keys.||




# Appendix E: SDC 7 Changelog

CloudAPI and SmartDC CLI have been completely rewritten for SDC 7.0.  Notably,
required version of Node.js to run the CLI is now greater or equal than 0.8.14.

Most of the commands remain the same, taking exactly the same options and
returning exactly the same JSON information in an attempt to preserve backwards
compatibility between 6.5 and 7.0 API clients, and software built for 6.5.

There are some important differences between SDC 7.0 and the previous version,
where the main one is:

* The request version of SDC 7.0 CLI is `~7.0` instead of `6.5`.

* This means that the parameter `--image` (or the equivalent `-e` short option)
is mandatory for the command `sdc-createmachine`.  On previous versions of the
API, it was possible to provision a machine without specifying an image to the
create machine command.  This behavior has been deprecated, and the desired
image **must** be specified.

* Starting with version 7.0, there isn't a `default` image.  For backward
compatibility purposes, when a request using `~6.5` is received, the latest
version of the `smartos` image will become the default one.

* Starting with version 7.0, virtual machines can also be resized, but **only
resizing virtual machines to a higher capacity/package is supported**.

* Version 7.0 also deprecates the `URN` attribute for any entity, either Images
or Packages.  URN support will finish with SDC 6.5 support.

* Starting with version 7.0, packages listed by GET `/:account/packages` accept
search filters.  Additionally, the package members `vcpus`, `id` and `version`
are included on packages, as explained in the
[packages section](#packages-description).

* Starting with version 7.0, a historical list of actions performed on machines
is available through request `GET /:account/machines/:id/audit`.

* Starting with version 7.0, customers can manage Firewall Rules through the
`/:account/fwrules` resource, as explained in the
[Firewall Rules section](#FirewallRules).

* Starting with version 7.0, `GET /:account` exposes account details, and allows
the modification of account properties -- with the exception of `password` and
`login` -- through `POST /:account`.  Details are explained in the
[Account section](#Account)

* Starting with version 7.0, networks details are exposed through the
`/:account/networks` resource, as explained in the
[Networks section](#Networks).

* Starting with version 7.0,  node-smartdc's `sdc-createmachine` accepts an
optional `--networks|-w` argument, which can be set to the `id` of one or more
of the networks retrieved from `/:account/networks`.

* Starting with version 7.1.0, customer image management is made available,
allowing [Machine Creation from Images](#CreateImageFromMachine),
[exporting images to the specified manta path](#ExportImage) and
[custom images deletion](#DeleteImage).

* Starting with version 7.1.1, firewall rules will include information regarding
rules being global or not, and will optionally include a human-readable
description for the rules (which can be modified except for the global rules).

* Starting with version 7.2.0, RBAC has been made available on the CloudAPI
interface. Accounts can create users, rules can be created and combined to make
policies, policies and users can be associated together using roles, and role
tags can be applied to CloudAPI resources.




* Version 7.1.0 now adds the listing and manipulation of NICs on VMs.

# Appendix F: SDC 6.5 Support

**Version 6.5 of the API will not be supported longer than a period of six
months after the public release of SDC 7.0.**

During this period, backwards compatibility will be granted in order to give
3rd-party software built on top of the previous API version time enough to
migrate to the new version.


<p style="min-height: 31px; margin-top: 60px; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc; padding: 10px 0">
<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0;float:left;margin:4px 8px 0 0;" src="https://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a> <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">Joyent CloudAPI Documentation</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.joyent.com" property="cc:attributionName" rel="cc:attributionURL">Joyent, Inc.</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.
</p>
