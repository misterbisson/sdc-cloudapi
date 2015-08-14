Title: DeleteUserKey (DELETE /:account/users/:user/keys/:key)
---
Text:

Removes a key.  See [GetKey](#GetKey).

### CLI Command:

    $ sdc-user delete-key dd71f8bb-f310-4746-8e36-afd7c6dd2895 '0b:56:ae:c5:d1:7b:7a:98:09:58:1a:a2:0c:22:63:9f'



# Config

These endpoints allow you to get and set configuration values related to your
account.

## GetConfig (GET /:login/config)

Outputs configuration for your account.  The configuration values that are
currently configurable are:

* `default_network`: the network that docker containers are provisioned on.


### Inputs

* None

### Returns

An object with configuration values.

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

### CLI Command

A user's default fabric network is stored on this config object. The following
command uses this endpoint to retrieve it.

    $ sdc-fabric network get-default
    7fa999c8-0d2c-453e-989c-e897716d0831

### Example Request

    GET /my/config HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.3

### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: 60
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0


    {
      "default_network": "7fa999c8-0d2c-453e-989c-e897716d0831"
    }

## UpdateConfig (PUT /:login/config)

Updates configuration values for your account.

### Inputs

||**Field**||**Type**||**Description**||
||default_network||String||ID of the network used for provisioning docker containers||

### Returns

An object with the updated configuration.

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

### CLI Command

    $ sdc-fabric network set-default c786128e-fa80-11e4-bdad-83592a0bd906

### Example Request

    PUT /my/config HTTP/1.1
    Authorization: Basic ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.3
    {
        "default_network": "c786128e-fa80-11e4-bdad-83592a0bd906"
    }

### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: 60
    Server: Joyent SmartDataCenter 7.3.0
    Api-Version: 7.3.0

    {
        "default_network": "c786128e-fa80-11e4-bdad-83592a0bd906"
    }

