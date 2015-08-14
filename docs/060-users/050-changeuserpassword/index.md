Title: ChangeUserPassword (POST /:account/users/:user/change_password)
---
Text:

This is a separate rule for password change, so different policies can be used
for an user trying to modify other data, or only their own password.

### Inputs

||**Field**||**Type**||**Description**||
||password||String||(Required) Password||
||password\_confirmation||String||(Required) Password confirmation||

### Returns

User object:

||**Field**||**Type**||**Description**||
||id||String||Unique id for the user||
||login||String||Sub-user login name||
||email||String||Email address||
||companyName||String||...||
||firstName||String||...||
||lastName||String||...||
||address||String||...||
||postalCode||String||...||
||city||String||...||
||state||String||...||
||country||String||...||
||phone||String||...||
||created||Date (ISO8601)||When this user was created||
||updated||Date (ISO8601)||When this user was updated||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||InvalidArgument||The provided `password` and `password\_confirmation` didn't match||
||MissingParameter||Either `password` or `password\_confirmation` parameters are missing||
||ResourceNotFound||If `:account` or `:user` do not exist||

### CLI Command:

    $ sdc-user change-password 93c3d419-a927-6195-b6fc-b3a4af541aa3 --password=foo123bar --password-confirmation=foo123bar

### Example Request

    POST /my/users/ed976ee5-80a4-42cd-b0d6-5493b7d41132/change_password HTTP/1.1
    Accept: application/json
    Content-Type: application/json
    Host: api.example.com
    Api-Version: ~7.2
    Content-Length: 40
    Authorization: Signature keyId...

    {
        "password": "foo123bar",
        "password_confirmation": "foo123bar"
    }

### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: 199
    Api-Version: 7.2.0
    Request-Id: 84c20bf0-93da-11e3-a4d2-8dccf42a3df3

    {
        id: 'ed976ee5-80a4-42cd-b0d6-5493b7d41132',
        login: 'a4ce91ff',
        email: 'a4ce91ff_test@test.com',
        updated: '2014-02-13T09:18:46.644Z',
        created: '2014-02-13T09:18:46.644Z'
    }


