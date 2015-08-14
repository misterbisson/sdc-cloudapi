Title: DeletePolicy (DELETE /:account/policies/:policy)
---
Text:

Deletes an existing policy.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:account` or `:policy` do not exist||

### CLI Command:

    $ sdc-policy delete 1e14dd3e-dc9d-6cd6-dd5a-ab5a159e96d7

#### Example Request

    DELETE /my/policies/4025de02-b4b6-4041-ae72-0749e99a5ac4 HTTP/1.1
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.2
    Content-Length: 0

#### Example Response

    HTTP/1.1 204 No Content
    Connection: close
    Date: Tue, 28 Jun 2011 23:14:34 GMT
    Api-Version: 7.2.0
    RequestId: 4655EA0A-C4CB-4486-8AA9-8C8C9A0B71B1
    Response-Time: 65
    Content-Length: 0

