Title: GetDatacenter (GET /:login/datacenters/:name)
---
Text:

Gets an individual datacenter by name.  Returns an HTTP redirect to your
client, where the datacenter url is in the Location header.

### Inputs

* None

### Returns

An object formatted like an Error Response; check the `Location` header for the
URL itself.

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist or `:name` does not exist||

### CLI Command

* None

### Example Request

    GET /my/datacenters/joyent HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 302 Moved Temporarily
    Location: https://api.example.com
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET
    Connection: close
    x-api-version: 7.0.0
    Date: Mon, 06 Jun 2011 18:47:01 GMT
    Server: SmartDataCenter
    x-request-id: e7b35c46-c36d-4e02-8cde-6fdf2695af15
    x-response-time: 178
    Content-Type: application/json
    Content-Length: 875
    Content-MD5: FV3cglJSamXOETia0jOZ5g==


    {
      "code": "ResourceMoved",
      "message": joyent is at https://api.example.com"
    }

