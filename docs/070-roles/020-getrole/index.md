Title: GetRole (GET /:account/roles/:role)
—
Text:

Get an account role (`:role`) by `id`.

### Inputs

* None

### Returns

||**Field**||**Type**||**Description**||
||name||String||The role name||
||members||Array||The list of this account's user logins this role applies to (Optional)||
||default_members||Array||The list of this account's user logins this role applies to by default (Optional)||
||policies||Array||The list of this account's policies which this role obeys (Optional)||
||id||String||(UUID) Unique role identifier||

### Errors

||**Error Code**||**Description**||
||ResourceNotFound||If `:account` or `:role` do not exist||


### CLI Command:

    $ sdc-role get 4025de02-b4b6-4041-ae72-0749e99a5ac4

### Example Request

    GET /my/roles/4025de02-b4b6-4041-ae72-0749e99a5ac4 HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Host: api.example.com
    Api-Version: ~7.2
    Authorization: Signature keyId...

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
        "policies": ["rebootMachine"]
    }

