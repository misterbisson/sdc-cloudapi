Title: CloudAPI HTTP responses
---
Text:

Like mentioned above, CloudAPI returns all response objects as
`application/json` encoded HTTP bodies.  In addition to the JSON body, all
responses have the following headers:

||**Header**||**Description**||
||Date||When the response was sent (RFC 1123 format)||
||Api-Version||The exact version of the CloudAPI server you spoke with||
||Request-Id||A unique id for this request; you should log this||
||Response-Time||How long the server took to process your request (ms)||

For backwards compatibility with `~6.5` version of the API, the headers
`X-Api-Version`, `X-Request-Id` and `X-Response-Time` are also provided with
exactly the same values as their counterparts without the `X-` prefix.  These
`X-` prefixed headers will be removed when we remove
[support for version 6.5 of CloudAPI](#appendix-f-sdc-65-support).

If there is content, you can expect:

||**Header**||**Description**||
||Content-Length||How much content, in bytes||
||Content-Type||Formatting of the response (almost always application/json)||
||Content-MD5||An MD5 checksum of the response; you should check this||

### HTTP Status Codes

Your client should check for each of the following status codes from any API
request:

||**Response**||**Code**||**Description**||
||400||Bad Request||Invalid HTTP Request||
||401||Unauthorized||Either no Authorization header was sent, or invalid credentials were used||
||403||Forbidden||No permissions to the specified resource||
||404||Not Found||Something you requested was not found||
||405||Method Not Allowed||Method not supported for the given resource||
||406||Not Acceptable||Try sending a different Accept header||
||409||Conflict||Most likely invalid or missing parameters||
||413||Request Entity Too Large||You sent too much data||
||415||Unsupported Media Type||You encoded your request in a format we don't understand||
||420||Slow Down||You're sending too many requests||
||449||Retry With||Invalid Version header; try with a different Api-Version string||
||503||Service Unavailable||Either there's no capacity in this datacenter, or we're in a maintenance window||

### Error Responses

In the event of an error, CloudAPI will return a standard error response object
in the body with the scheme:

    {
      "code": "CODE",
      "message": "human readable string"
    }

Where the code element is one of:

||**Code**||**Description**||
||BadRequest||You sent bad HTTP||
||InternalError||Something was wrong on our end||
||InUseError||The object is in use and cannot be operated on||
||InvalidArgument||You sent bad arguments or a bad value for an argument||
||InvalidCredentials||Try authenticating correctly||
||InvalidHeader||You sent a bad HTTP header||
||InvalidVersion||You sent a bad Api-Version string||
||MissingParameter||You didn't send a required parameter||
||NotAuthorized||You don't have access to the requested resource||
||RequestThrottled||You were throttled||
||RequestTooLarge||You sent too much request data||
||RequestMoved||HTTP Redirect||
||ResourceNotFound||What you asked for wasn't found||
||UnknownError||Something completely unexpected happened||

Clients are expected to check HTTP status code first, and if it's in the 4xx
range, they can leverage the codes above.

