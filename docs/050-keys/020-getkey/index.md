Title: GetKey (GET /:login/keys/:key)
---
Text:

Retrieves the record for an individual key.

### Inputs

* None

### Returns

||**Field**||**Type**||**Description**||
||name||String||Name for this key||
||fingerprint||String||Key fingerprint||
||key||String||OpenSSH formatted public key||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:key` does not exist||

### CLI Command

    $ sdc-getkey rsa

### Example Request

    GET /my/keys/rsa HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, DELETE
    Server: SmartDataCenter
    Connection: close
    Date: Tue, 28 Jun 2011 23:14:34 GMT
    X-Api-Version: 7.0.0
    X-RequestId: BE3559EE-713B-43EB-8DEB-6EE93F441C23
    X-Response-Time: 78
    Content-Type: application/json
    Content-Length: 501
    Content-MD5: O5KO1sbXxLHk1KHxN6U+Fw==

    {
      "name": "rsa",
      "key": "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA0A5Pf5Cq...",
      "fingerprint": "59:a4:61:..."
    }


