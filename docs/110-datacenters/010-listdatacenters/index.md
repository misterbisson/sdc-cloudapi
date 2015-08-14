Title: ListDatacenters (GET /:login/datacenters)
—
Text:

Provides a list of all datacenters this cloud is aware of.

### Inputs

* None

### Returns

An object where the keys are the datacenter name, and the value is the URL
endpoint of that datacenter's Cloud API.

||**Field**||**Type**||**Description**||
||$datacentername||URL||location of the datacenter||


### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist||

### CLI Command

    $ sdc-listdatacenters

#### Example Request

    GET /my/datacenters HTTP/1.1
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0
    Content-Length: 0

#### Example Response

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET
    Connection: close
    x-api-version: 7.0.0
    Date: Mon, 06 Jun 2011 18:45:21 GMT
    Server: SmartDataCenter
    x-request-id: 75812321-5887-45ae-b0d4-6e562cb463b5
    x-response-time: 0
    Content-Type: application/json
    Content-Length: 28
    Content-MD5: nvk5mzwiEmQEfWbQCcBauQ==

    {
      "us-west-1": "https://us-west-1.api.joyentcloud.com"
    }


