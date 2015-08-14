Title: DeleteImage (DELETE /:login/images/:id)
---
Text:

(**Beta.** Custom image management is currently in beta.)

Delete an image.  One must be the owner of the image to delete it.

### Inputs

None

### Returns

Responds with HTTP 204 'No Content'.

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI Command

    $ sdc-deleteimage 0c428eb9-7f03-4bb0-ac9f-c0718945d604

#### Example Request

    DELETE /my/images/e42f8c84-bbea-11e2-b920-078fab2aab1f HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

#### Example Response

    HTTP/1.1 204 No Content
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    Access-Control-Allow-Methods: GET, HEAD, DELETE
    Access-Control-Expose-Headers: Api-Version, Request-Id, Response-Time
    Connection: Keep-Alive
    Date: Sat, 10 Aug 2013 00:43:33 GMT
    Server: Joyent SmartDataCenter 7.0.0
    Api-Version: 7.0.0
    Request-Id: e23eeef0-0155-11e3-8fd4-39aa5371c390
    Response-Time: 244
    X-Request-Id: e23eeef0-0155-11e3-8fd4-39aa5371c390
    X-Api-Version: 7.0.0
    X-Response-Time: 244

