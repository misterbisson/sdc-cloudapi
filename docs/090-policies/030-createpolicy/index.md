Title: CreatePolicy (POST /:account/policies)
---
Text:

Creates a new account policy.

### Inputs

||**Field**||**Type**||**Description**||
||name||String||The policy name||
||rules||Array||One or more Aperture sentences to be added to the current policy||
||description||String||A description for this policy (Optional)||

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

    $ sdc-policy create --name=test-policy --description='Policy to test cmdln tool' --rules='CAN rebootmachine, createmachine AND getmachine' --rules='CAN listkeys AND listuserkeys'

### Example Request

    POST /my/policies HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Host: api.example.com
    Api-Version: ~7.2
    Authorization: Signature keyId...


    {
        "name": "rebootMachine",
        "rules": ["* can rebootMachine *"],
        "description": "Restart any machine"
    }

### Example Response

    HTTP/1.1 201 Created
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


