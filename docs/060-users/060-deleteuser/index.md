Title: DeleteUser (DELETE /:account/users/:user)
---
Text:

Remove a user. They will no longer be able to use this API.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:account` does not exist or there isn't a user with either the `login` or `id` given as `:user` value||

### CLI Command:

    $ sdc-user delete 707811cd-d0fa-c5cc-f41f-bfd2d9f545d1

#### Example Request

    DELETE /my/users/ed976ee5-80a4-42cd-b0d6-5493b7d41132 HTTP/1.1
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.2
    Content-Length: 0

#### Example Response

    HTTP/1.1 204 No Content
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, DELETE
    Server: SmartDataCenter
    Connection: close
    Date: Tue, 28 Jun 2011 23:14:34 GMT
    Api-Version: 7.2.0
    RequestId: 4655EA0A-C4CB-4486-8AA9-8C8C9A0B71B1
    Response-Time: 65
    Content-Length: 0
