Title: ListServices (GET /:login/services)
---
Text:


Provides the URL endpoints for services for this datacenter. It is a mapping
of service name to URL endpoint.

### Inputs

* None

### Returns

An object where the keys are the service name, and the value is the URL
endpoint.

||**Field**||**Type**||**Description**||
||$serviceName||URL||URL endpoint of that service||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist||


#### Example Request

    GET /my/services HTTP/1.1
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0
    Content-Length: 0

#### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: 26
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Accept, Accept-Version, ...
    Access-Control-Allow-Methods: GET
    Access-Control-Expose-Headers: Api-Version, Request-Id, Response-Time
    Connection: Keep-Alive
    Content-MD5: xeiJhwRr1nPZp1bDheSJZg==
    Date: Fri, 27 Feb 2015 05:09:49 GMT
    Server: Joyent SmartDataCenter 7.2.0
    Api-Version: 7.2.0
    Request-Id: da9eaf80-be3e-11e4-8b3c-078d3dc40603
    Response-Time: 100
    X-Request-Id: da9eaf80-be3e-11e4-8b3c-078d3dc40603
    X-Api-Version: 7.2.0
    X-Response-Time: 100

    {
      "cloudapi": "https://us-west-1.api.example.com",
      "docker": "tcp://us-west-1.docker.example.com",
      "manta": "https://us-west.manta.example.com"
    }


