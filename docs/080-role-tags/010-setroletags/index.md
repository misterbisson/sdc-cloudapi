Title: SetRoleTags (PUT /:resource_path)
---
Text:


Sets the given role tags to the provided resource path. `resource_path`
can be the path to any of the CloudAPI resources described into this document:
account, keys, users, roles, policies, user's ssh keys, datacenters, images,
packages, machines, analytics, instrumentations, firewall rules and networks.

For each of these you can set role tags either for an individual resource or
for the whole group; i.e., you can set role tags for all the machines using:

        PUT /:account/machines

or just for a given machine using

        PUT /:account/machines/:machine_id

### Inputs

||**Field**||**Type**||**Description**||
||role-tag||Array||The list role-tags to be added to this resource||

### Returns

Resource role tags

||**Field**||**Type**||**Description**||
||name||String||Path to the resource||
||role-tag||Array||The list of role tags assigned to this resource||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||InvalidArgument||The provided resource path is not valid||
||ResourceNotFound||If :resource_path does not exist||


### CLI Command:

    $ sdc-chmod -- =read,create /my/machines

The list of role-tags assigned to a given resource can be obtained from the
command line with `sdc-info /:resource_path`:

    $ sdc-info /my/machines

### Example Request

    PUT /my/machines HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Host: api.example.com
    Api-Version: ~7.2
    content-length: 26
    content-md5: KwJKP+w/roeR+pRgKTMo7w==
    Authorization: Signature keyId...

    {
        "role-tag": ["test-role"]
    }

### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: 97
    Server: Joyent SmartDataCenter 7.2.0
    Api-Version: 7.2.0
    Request-Id: 84c20bf0-93da-11e3-a4d2-8dccf42a3df3

    {
        "name": "/my/machines",
        "role-tag": [
          "test-role"
        ]
    }


