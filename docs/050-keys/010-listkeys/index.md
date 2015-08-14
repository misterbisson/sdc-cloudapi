Title: ListKeys (GET /:login/keys)
---
Text:

Lists all public keys we have on record for the specified account.

### Inputs

* None

### Returns

An array of key objects.  Keys are:

||**Field**||**Type**||**Description**||
||name||String||Name for this key||
||fingerprint||String||Key fingerprint||
||key||String||Public key in OpenSSH format||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist||

### CLI Command

    $ sdc-listkeys

### Example Request

    GET /my/keys HTTP/1.1
    Host: api.example.com
    Authorization: ...
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Server: SmartDataCenter
    Connection: close
    Date: Tue, 28 Jun 2011 23:05:42 GMT
    X-API-Version: 7.0.0
    X-RequestId: 9E962AAA-E5F6-487F-8339-45FABA3CF5BD
    X-Response-Time: 66
    Content-Type: application/json
    Content-Length: 503
    Content-MD5: RHiVkkX0AZHOjijYqJFRNg==

    [
      {
        "name": "rsa",
        "key": "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEA0A5Pf5Cq...",
        "fingerprint": "59:a4:..."
      }
    ]


