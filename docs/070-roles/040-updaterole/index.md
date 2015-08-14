Title: UpdateRole (POST /:account/roles/:role)
---
Text:

Modifies an account role.  Anything but `id` can be modified.

### Inputs

||**Field**||**Type**||**Description**||
||name||String||The role name (Required)||
||members||Array||The list of account's user logins to be added to this role (Optional)||
||default_members||Array||The list of account's user logins to be added to this role and have it enabled by default (Optional)||
||policies||Array||The list of account's policies to be given to this role (Optional)||

### Returns

Account role

||**Field**||**Type**||**Description**||
||name||String||The role name||
||members||Array||The list of account's user logins to be added to this role (Optional)||
||default_members||Array||The list of account's user logins to be added to this role and have it enabled by default (Optional)||
||policies||Array||The list of account's policies to be given to this role (Optional)||
||id||String||(UUID) Unique role identifier. Identifier purpose is just to allow role name modifications||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||InvalidArgument||If member or policies are invalid, e.g. you tried to add an non-existent user||
||MissingParameter||If you didn't send a `name`||
||ResourceNotFound||If `:account` does not exist||

### CLI Command:

    $ sdc-role update 3c2ef9da-b137-6a87-f227-dad1db4219b7 --members=joe,bob --default-members=bob,joe

### Example Request

    POST /my/roles/4025de02-b4b6-4041-ae72-0749e99a5ac4 HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Host: api.example.com
    Api-Version: ~7.2
    Content-Length: 40
    Authorization: Signature keyId...

    {
        "policies": ["rebootMachine", "resizeMachine"]
    }

### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: 97
    Server: Joyent SmartDataCenter 7.2.0
    Api-Version: 7.2.0
    Request-Id: 84c20bf0-93da-11e3-a4d2-8dccf42a3df3

    {
        "id": "4025de02-b4b6-4041-ae72-0749e99a5ac4",
        "name": "reboot",
        "members": ["bob","fred","pedro"],
        "policies": ["rebootMachine", "resizeMachine"]
    }

