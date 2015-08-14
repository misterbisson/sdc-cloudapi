Title: DeleteKey (DELETE /:login/keys/:key)
---
Text:

Deletes a single SSH key, by name or fingerprint.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:key` does not exist||

### CLI Command

    $ sdc-deletekey id_rsa

#### Example Request

    DELETE /my/keys/id_rsa HTTP/1.1
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0
    Content-Length: 0

#### Example Response

    HTTP/1.1 204 No Content
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, DELETE
    Server: SmartDataCenter
    Connection: close
    Date: Tue, 28 Jun 2011 23:14:34 GMT
    X-Api-Version: 7.0.0
    X-RequestId: 4655EA0A-C4CB-4486-8AA9-8C8C9A0B71B1
    X-Response-Time: 65
    Content-Length: 0


