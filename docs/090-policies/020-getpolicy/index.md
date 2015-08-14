Title: GetPolicy (GET /:account/policies/:policy)
---
Text:

Get an account policy (`:policy`) by `id`.

### Inputs

* None

### Returns

||**Field**||**Type**||**Description**||
||name||String||The policy name||
||rules||Array||One or more Aperture sentences applying to the policy||
||description||String||A description for this policy||
||id||String||(UUID) Unique policy identifier||

### Errors

||**Error Code**||**Description**||
||ResourceNotFound||If `:account` or `:role` do not exist||


### CLI Command:

    $ sdc-policy get 1e14dd3e-dc9d-6cd6-dd5a-ab5a159e96d7

### Example Request

    GET /my/policies/4025de02-b4b6-4041-ae72-0749e99a5ac4 HTTP/1.1
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
        "name": "rebootMachine",
        "rules": ["* can rebootMachine *"],
        "description": "Restart any machine"
    }

