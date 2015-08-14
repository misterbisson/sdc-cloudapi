Title: UpdateFirewallRule (POST /:login/fwrules/:id)
---
Text:

Updates the given rule record and -- depending on rule contents --
adds/removes/updates the rule on all the required machines.

### Inputs

||**Field**||**Type**||**Description**||
||rule||String||Firewall rule text||
||description||String||Human-readable description for the rule (optional, since v7.1.1)||

### Returns

Firewall rule object.

||**Field**||**Type**||**Description**||
||id||String||Unique identifier for this rule||
||enabled||Boolean||Indicates if the rule is enabled||
||rule||String||Firewall rule text||
||global||Boolean||Indicates if the rule is global (optional, since v7.1.1)||
||description||String||Human-readable description for the rule (optional, since v7.1.1)||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||InvalidArgument||If rule is invalid or you are trying to modify a global rule||
||MissingParameter||If rule wasn't present||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI

    $ sdc-updatefirewallrule --rule='...' 38de17c4-39e8-48c7-a168-0f58083de860

#### Example Request

    POST /login/fwrules/38de17c4-39e8-48c7-a168-0f58083de860 HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    content-type: application/json
    accept-version: ~7.0
    content-length: 111
    host: api.example.com

    ...

#### Example Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 170
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    server: Joyent SmartDataCenter 7.0.0
    api-version: 7.0.0
    request-id: 284907d0-7f67-11e2-8585-bd5fc323c72c
    response-time: 225
    x-request-id: 284907d0-7f67-11e2-8585-bd5fc323c72c
    x-api-version: 7.0.0
    x-response-time: 225

    {
      "id": "38de17c4-39e8-48c7-a168-0f58083de860",
      "rule": "FROM vm 3d51f2d5-46f2-4da5-bb04-3238f2f64768 TO subnet 10.99.99.0/24 BLOCK tcp (PORT 25 AND PORT 80)",
      "enabled": true
    }

