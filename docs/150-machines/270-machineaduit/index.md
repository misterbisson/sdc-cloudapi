Title: MachineAudit (GET /:login/machines/:id/audit)
---
Text:


Provides a list of machine's accomplished actions. Results are sorted from
newest to oldest action.

### Inputs

* None

### Returns

* An array of action objects, which contain:

||action||String||The name of the action||
||parameters||Object||The original set of parameters sent when the action was requested||
||time||Date (ISO8601)||When the action finished||
||success||String||Either "yes" or "no", depending on the action's success||
||caller||Object||Account requesting the action||

Depending on the account requesting the action, `caller` can have the following
members:

||type||String||Authentication type for the action request. One of "basic", "operator", "signature" or "token"||
||user||String||When the authentication type is "basic", this member will be present and include user login||
||ip||String||The IP addresses this from which the action was requested. Not present if type is "operator"||
||keyId||String||When authentication type is either "signature" or "token", SSH key identifier||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI Command

    $ sdc-getmachineaudit 75cfe125-a5ce-49e8-82ac-09aa31ffdf26

### Example Request

    GET /my/machines/75cfe125-a5ce-49e8-82ac-09aa31ffdf26/audit HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

#### Example Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 191
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    content-md5: GRmOq/dAdKZJ4wVpEelRrQ==
    date: Fri, 22 Feb 2013 15:19:37 GMT
    server: Joyent SmartDataCenter 7.0.0
    api-version: 7.0.0
    request-id: 453aee00-7d03-11e2-8048-5195b6159808
    response-time: 34
    x-request-id: 453aee00-7d03-11e2-8048-5195b6159808
    x-api-version: 7.0.0
    x-response-time: 34

    [{
        "success": "yes",
        "time": "2013-02-22T15:19:32.522Z",
        "action": "provision",
        "caller": {
          "type": "signature",
          "ip": "127.0.0.1",
          "keyId": "/:login/keys/:fingerprint"
        }
      }, ...]


