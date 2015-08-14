Title: GetInstrumentationHeatmap (GET /:login/analytics/instrumentations/:id/value/heatmap/image)
--- 
Text:


Retrieves metadata and a base64-encoded PNG image of a particular
instrumentation's heatmap.

### Inputs

||**Field**||**Type**||**Description**||
||height||Number||height of the image in pixels||
||width||Number||width of the image in pixels||
||ymin||Number||Y-Axis value for the bottom of the image (default: 0)||
||ymax||Number||Y-Axis value for the top of the image (default: auto)||
||nbuckets||Number||Number of buckets in the vertical dimension||
||selected||Array||Array of field values to highlight, isolate or exclude||
||isolate||Boolean||If true, only draw selected values||
||exclude||Boolean||If true, don't draw selected values at all||
||hues||Array||Array of colors for highlighting selected field values||
||decompose_all||Boolean||highlight all field values (possibly reusing hues)||

### Returns

||**Field**||**Type**||**Description**||
||bucket\_time||Number||time corresponding to the bucket (Unix seconds)||
||bucket\_ymin||Number||Minimum y-axis value for the bucket||
||bucket\_ymax||Number||Maximum y-axis value for the bucket||
||present||Object||if the instrumentation defines a discrete decomposition, this property's value is an object whose keys are values of that field and whose values are the number of data points in that bucket for that key||
||total||Number||The total number of data points in the bucket||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||
||InvalidArgument||If input values were incorrect||

### CLI

* None

### Example Request

    GET /my/analytics/instrumentations/1/heatmap/image HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET
    Connection: close
    X-Api-Version: 7.0.0
    Date: Wed, 29 Jun 2011 23:57:44 GMT
    Server: SmartDataCenter
    X-Request-Id: 3d511185-36b8-4699-9cdd-a67bf8be7a6d
    X-Response-Time: 109
    Content-Type: application/json
    Content-MD5: r5tPNDLr1HQE1tsLNqPbvg==
    Content-Length: 2052

    {
      "nbuckets": 100,
      "width": 600,
      "height": 300,
      "ymin": 0,
      "ymax": 400000,
      "present": [],
      "transformations": {},
      "image": "iVBORw0KGgoAAA...",
      "start_time": 1309391804,
      "duration": 60,
      "nsources": 1,
      "minreporting": 1,
      "requested_start_time": 1309391804,
      "requested_duration": 60,
      "requested_end_time": 1309391864
      }

