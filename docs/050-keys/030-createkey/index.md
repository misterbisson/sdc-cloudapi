Title: CreateKey (POST /:login/keys)
---
Text:

Uploads a new OpenSSH key to SmartDataCenter for use in HTTP signing and SSH.

### Inputs

||**Field**||**Type**||**Description**||
||name||String||Name for this key (optional)||
||key||String||OpenSSH formatted public key||

### Returns

||**Field**||**Type**||**Description**||
||name||String||Name for this key||
||fingerprint||String||Key fingerprint||
||key||String||OpenSSH formatted public key||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||InvalidArgument||If name or key is invalid (usually key)||
||MissingParameter||If you didn't send a key||
||ResourceNotFound||If `:login` does not exist||

### CLI Command

    $ sdc-createkey -n id_rsa ~/.ssh/id_rsa.pub

### Example Request

    POST /my/keys HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 455
    Content-Type: application/json
    Api-Version: ~7.0

    {
      "name": "id_rsa",
      "key": "ssh-rsa AAA...",
      "fingerprint": "59:a4:..."
    }

### Example Response

    HTTP/1.1 201 Created
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
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
      "fingerprint": "59:a4:..."
    }

