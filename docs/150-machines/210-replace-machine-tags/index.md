Title: ReplaceMachineTags (PUT /:login/machines/:id/tags)
--- 
Text:

Allows you to replace all machine tags. This API lets you *overwrite* existing
tags, not append to existing tags.

This call allows you to send any number of parameters; all of these will be
converted into tags on the machine that can be used for searching later.

### Inputs

||**Field**||**Type**||**Description**||
||$tagName||String||You can assign any number of tags in this call||

### Returns

Returns the current set of tags.

||**Field**||**Type**||**Description**||
||$tagName||String||Your value||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI Command

    $ sdc-replacemachinetags --tag='foo=bar' --tag='group=test' 5e42cd1e-34bb-402f-8796-bf5a2cae47db

### Example Request

    PUT /my/machines/5e42cd1e-34bb-402f-8796-bf5a2cae47db/tags HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 12
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

    foo=bar&group=test

### Example Response

    HTTP/1.1 200 Ok
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST, PUT
    Connection: close
    X-Api-Version: 7.0.0
    Date: Tue, 05 Jul 2012 17:19:26 GMT
    Server: SmartDataCenter
    X-Request-Id: 4bcf467e-4b88-4ab4-b7ab-65fad7464de9
    X-Response-Time: 754
    Content-Type: application/json
    Content-MD5: qKVbfrhXVqh7Oni6Pub9Pw==
    Content-Length: 116

    {
      "foo": "bar",
      "group": "test"
    }


