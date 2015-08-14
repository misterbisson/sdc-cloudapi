Title: ListFirewallRules (GET /:login/fwrules)
---
Text:

List all firewall rules for the current account.

### Inputs

* None

### Returns

An array of firewall rule objects.  Firewall Rules are:

||**Field**||**Type**||**Description**||
||id||String||Unique identifier for this rule||
||enabled||Boolean||Indicates if the rule is enabled||
||rule||String||Firewall rule text||
||global||Boolean||Indicates if the rule is global (optional, since v7.1.1)||
||description||String||Human-readable description for the rule (optional, since v7.1.1)||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist||

### CLI

    $ sdc-listfirewallrules

#### Example Request

    GET /login/fwrules HTTP/1.1
    authorization: Signature keyId="...
    accept: application/json
    accept-version: ~7.0
    host: api.example.com
    connection: keep-alive

#### Example Response

    HTTP/1.1 200 OK
    content-type: application/json
    content-length: 158
    access-control-allow-origin: *
    access-control-allow-headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    access-control-allow-methods: GET
    access-control-expose-headers: Api-Version, Request-Id, Response-Time
    connection: Keep-Alive
    content-md5: v6s92rl/nTS2Ts5CNDcgQw==
    server: Joyent SmartDataCenter 7.0.0
    api-version: 7.0.0
    request-id: 35147710-7f49-11e2-8585-bd5fc323c72c
    response-time: 134
    x-request-id: 35147710-7f49-11e2-8585-bd5fc323c72c
    x-api-version: 7.0.0
    x-response-time: 134

    [
      {
        "id": "38de17c4-39e8-48c7-a168-0f58083de860",
        "rule": "FROM vm 3d51f2d5-46f2-4da5-bb04-3238f2f64768 TO subnet 10.99.99.0/24 BLOCK tcp PORT 25",
        "enabled": true
      }
    ]

