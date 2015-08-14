Title: UpdateMachineMetadata (POST /:login/machines/:id/metadata)
---
Text:

Allows you to update the metadata for a given machine.  Note that updating the
metadata via CloudAPI will result in the metadata being updated in the running
instance.

The semantics of this call are subtly different that the AddMachineTags call --
any metadata keys passed in here are created if they do not exist, and
overwritten if they do.

### Inputs

||**Field**||**Type**||**Description**||
||$key||String||You can assign any number of metadata keys in this call; the string can be either a plain string, or a JSON-encoded object||

### Returns

Returns the current set of tags.

||**Field**||**Type**||**Description**||
||$key||Object||Your value(s)||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI Command

    $ ./sdc-updatemachinemetadata -m foo=bar -m group=test cf055959-d776-482e-bd71-ca510a04bdd7

### Example Request

    POST /my/machines/cf055959-d776-482e-bd71-ca510a04bdd7/metadata HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 12
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

    foo=bar&group=test

### Example Response

    HTTP/1.1 200 Ok
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Connection: close
    X-Api-Version: 7.0.0
    Date: Tue, 05 Jul 2011 17:19:26 GMT
    Server: SmartDataCenter
    X-Request-Id: 4bcf467e-4b88-4ab4-b7ab-65fad7464de9
    X-Response-Time: 754
    Content-Type: application/json
    Content-MD5: qKVbfrhXVqh7Oni6Pub9Pw==
    Content-Length: 116

    {
      "foo": "bar",
      "group": "test"
    }

