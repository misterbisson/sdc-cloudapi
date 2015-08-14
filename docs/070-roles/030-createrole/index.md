Title: CreateRole (POST /:account/roles)
---
Text:


Create a new role for your account.

### Inputs

||**Field**||**Type**||**Description**||
||name||String||The role name||
||members||Array||The list of account's user logins to be added to this role (Optional)||
||default_members||Array||The list of account's user logins to be added to this role and have it enabled by default (Optional)||
||policies||Array||The list of account's policies to be given to this role (Optional)||

### Returns

Account role.

||**Field**||**Type**||**Description**||
||name||String||The role name||
||members||Array||The list of this account's user logins this role applies to (Optional)||
||default_members||Array||The list of this account's user logins this role applies to by default (Optional)||
||policies||Array||The list of this account's policies which this role obeys (Optional)||
||id||String||(UUID) Unique role identifier||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||InvalidArgument||If member or policies are invalid, e.g. you try to add a non-existent user||
||MissingParameter||If you didn't send a `name`||
||ResourceNotFound||If `:account` does not exist||

### CLI Command:

    $ sdc-role create --name='test-role' --members=bob --members=fred --default-members=bob --policies=test-policy

Possible alternate formats to pass in multiple items; in `sdc-role`, CSV and
JSON are also acceptable formats for `--members`, `--default-members` and
`--policies`:

    $ sdc-role create --name='test-role' --members=bob,fred --default-members=bob --policies=test-policy
    $ sdc-role create --name='test-role' --members='["bob","fred"]' --default-members=bob --policies=test-policy


### Example Request

    POST /my/roles HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Host: api.example.com
    Api-Version: ~7.2
    Content-Length: 40
    Authorization: Signature keyId...

    {
        "name": "reboot",
        "members": ["bob","fred","pedro"],
        "policies": ["rebootMachine"]
    }

### Example Response

    HTTP/1.1 201 Created
    Location: /my/roles/4025de02-b4b6-4041-ae72-0749e99a5ac4
    Content-Type: application/json
    Content-Length: 97
    Server: Joyent SmartDataCenter 7.2.0
    Api-Version: 7.2.0
    Request-Id: 84c20bf0-93da-11e3-a4d2-8dccf42a3df3

    {
        "id": "4025de02-b4b6-4041-ae72-0749e99a5ac4",
        "name": "reboot",
        "members": ["bob","fred","pedro"],
        "policies": ["rebootMachine"]
    }

