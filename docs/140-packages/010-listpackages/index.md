Title: ListPackages (GET /:login/packages)
---
Text:

Provides a list of packages available in this datacenter.

### Inputs

* The following are all optional inputs:

||name||String||The "friendly" name for this package||
||memory||Number||How much memory will by available (in MiB)||
||disk||Number||How much disk space will be available (in MiB)||
||swap||Number||How much swap space will be available (in MiB)||
||lwps||Number||Maximum number of light-weight processes (threads) allowed||
||version||String||The version of this package||
||vcpus||Number||Number of vCPUs for this package||
||group||String||The group this package belongs to||

When any value is provided for one or more of the aforementioned inputs, the
retrieved packages will match all of them.

### Returns

An array of objects, of the form:

||name||String||The "friendly" name for this package||
||memory||Number||How much memory will by available (in MiB)||
||disk||Number||How much disk space will be available (in MiB)||
||swap||Number||How much swap space will be available (in MiB)||
||lwps||Number||Maximum number of light-weight processes (threads) allowed||
||vcpus||Number||Number of vCPUs for this package||
||default||Boolean||Whether this is the default package in this datacenter||
|id||String||Unique identifier for this package||
||version||String||The version of this package||
||group||String||The group this package belongs to||
||description||String||A human-friendly description about this package||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist||

### CLI Command

    $ sdc-listpackages

### Example Request

    GET /my/packages HTTP/1.1
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
    Date: Tue, 28 Jun 2011 23:14:34 GMT
    X-Api-Version: 7.0.0
    X-RequestId: FD6F87E7-5EA5-4B55-97D9-DEE29259731D
    X-Response-Time: 257
    Content-Type: application/json
    Content-Length: 402
    Content-MD5: y7YOeXG98DYchC96s46yRw==

    [
      {
        "name": "regular_128",
        "id": "5968a8a4-5bff-4c5e-8034-d79de962e7f6",
        "memory": 128,
        "disk": 5120,
        "swap": 256,
        "lwps": 1000,
        "version": "1.0.0",
        "vcpus": 1,
        "default": true
      },
      {
        "name": "regular_256",
        "id": "ebb5dffb-04fd-487f-bd03-581ade19f717",
        "memory": 256,
        "disk": 5120,
        "swap": 512,
        "lwps": 2000,
        "version": "1.0.0",
        "default": false
      },
      {
        "name": "regular_512",
        "id": "4dad8aa6-2c7c-e20a-be26-c7f4f1925a9a",
        "memory": 512,
        "disk": 10240,
        "swap": 1024,
        "lwps": 2000,
        "version": "1.0.1",
        "default": false
      },
      {
        "name": "regular_1024",
        "id": "9fcd9ab7-bd07-cb3c-9f9a-ac7ec3aa934e",
        "memory": 1024,
        "disk": 15360,
        "swap": 2048,
        "lwps": 4000,
        "version": "1.2.0",
        "default": false
      }
    ]

