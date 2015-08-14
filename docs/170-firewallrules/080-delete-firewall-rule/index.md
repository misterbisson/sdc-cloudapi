Title: DeleteFirewallRule (DELETE /:login/fwrules/:id)
---
Text:


Removes the given firewall rule from all the required machines.

### Inputs

* None

### Returns

* None

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI

    $ sdc-deletefirewallrule 38de17c4-39e8-48c7-a168-0f58083de860

#### Example Request

    DELETE /login/fwrules/38de17c4-39e8-48c7-a168-0f58083de860 HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    accept-version: ~7.0
    host: api.example.com

#### Example Response

    HTTP/1.1 204 No Content
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    server: Joyent SmartDataCenter 7.0.0
    api-version: 7.0.0
    request-id: 50a78b60-7f68-11e2-8585-bd5fc323c72c
    response-time: 219
    x-request-id: 50a78b60-7f68-11e2-8585-bd5fc323c72c
    x-api-version: 7.0.0
    x-response-time: 219

