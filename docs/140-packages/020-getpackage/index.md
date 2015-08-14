Title: GetPackage (GET /:login/packages/:id)
---
Text:

Gets a package by `name` or `id`.

### Inputs

* None

### Returns

||name||String||The "friendly" name for this package||
||memory||Number||How much memory will by available (in MiB)||
||disk||Number||How much disk space will be available (in MiB)||
||swap||Number||How much swap space will be available (in MiB)||
||vcpus||Number||Number of vCPUs for this package||
||lwps||Number||Maximum number of light-weight processes (threads) allowed||
||default||Boolean||Whether this is the default package in this datacenter||
||id||String||Unique identifier for this package||
||version||String||The version of this package||
||group||String||The group this package belongs to||
||description||String||A human-friendly description about this package||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI Command

    $ sdc-getpackage 5968a8a4-5bff-4c5e-8034-d79de962e7f6

### Example Request

    GET /my/packages/5968a8a4-5bff-4c5e-8034-d79de962e7f6 HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET
    Server: SmartDataCenter
    Connection: close
    Date: Tue, 16 Oct 2012 23:14:34 GMT
    X-Api-Version: 7.0.0
    X-RequestId: F01F0DC1-12DE-4D9A-B92B-FB3A041E46B8
    X-Response-Time: 120
    Content-Type: application/json
    Content-Length: 122
    Content-MD5: aokYYCYw/EU8JwTD9F6PyA==

    {
      "name": "regular_128",
      "memory": 128,
      "swap": 256,
      "disk": 5120,
      "lwps": 1000,
      "default": true,
      "id": "5968a8a4-5bff-4c5e-8034-d79de962e7f6",
      "vcpus": 1,
      "version": "1.0.0"
    }

