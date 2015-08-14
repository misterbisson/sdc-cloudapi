Title: UpdateUser (POST /:account/users/:user)
---
Text:

Update any user's modifiable properties.

Password changes are not allowed using this route; there is an additional route
for password changes so it can be selectively allowed/disallowed for users
using policies.

### Inputs

||**Field**||**Type**||**Description**||
||email||String||(Required) Email address||
||companyName||String||...||
||firstName||String||...||
||lastName||String||...||
||address||String||...||
||postalCode||String||...||
||city||String||...||
||state||String||...||
||country||String||...||
||phone||String||...||

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
||InvalidArgument||If any of the parameters are invalid, e.g. you try to add a `login` name already taken by another user of your account||
||MissingParameter||If you didn't send a `login` or `email`||
||ResourceNotFound||If `:account` or `:user` do not exist||

### CLI Command:

    $ sdc-user update 93c3d419-a927-6195-b6fc-b3a4af541aa3 --login=joe

