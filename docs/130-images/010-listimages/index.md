Title: ListImages (GET /:login/images)
---
Text:


Provides a list of images available in this datacenter.

### Inputs

The following optional query parameters are available to filter the list of
images:

||**Field**||**Type**||**Description**||
||name||String||The "friendly" name for this image||
||os||String||The underlying operating system for this image||
||version||String||The version for this image||
||public||Boolean||(New in 7.1.) Filter public/private images, e.g. `?public=true`, `?public=false`||
||state||String||(New in 7.1.) Filter on image [state](https://images.joyent.com/docs/#manifest-state). By default only active images are shown. Use `?state=all` to list all images.||
||owner||String||(New in 7.1.) Filter on the owner UUID.||
||type||String||(New in 7.1.) Filter on the image type, e.g. `?type=smartmachine`.||

### Returns

An array of images.  Image objects include the following fields:

|| **Field**    ||**Type**||**Description**||
|| id           || String ||A unique identifier for this image||
|| name         || String ||The "friendly" name for this image||
|| os           || String ||The underlying operating system for this image||
|| version      || String ||The version for this image||
|| type         || String ||Whether this is a smartmachine or virtualmachine dataset||
|| requirements || Object ||Contains a grouping of various minimum requirements for provisioning a machine with this image. For example 'password' indicates that a password must be provided.||
|| homepage     || String ||(New in 7.0.) The URL for a web page with more detailed information for this image||
|| files        || Array  ||(New in 7.1.) An array of image files that make up each image. Currently only a single file per image is supported.||
|| files[0].compression     || String ||(New in 7.1.) The type of file compression used for the image file. One of 'bzip2', 'gzip', 'none'.||
|| files[0].sha1     || String ||(New in 7.1.) SHA-1 hex digest of the file content. Used for corruption checking.||
|| files[0].size     || Number ||(New in 7.1.) File size in bytes.||
|| published_at || String (ISO-8859) ||(New in 7.0.) The time this image has been made publicly available.||
|| owner        || String ||(New in 7.1.) The UUID of the user who owns this image.||
|| public       || Boolean ||(New in 7.1.) Indicates if this image is publicly available.||
|| state        || String ||(New in 7.1.) The current state of the image. One of 'active', 'unactivated', 'disabled', 'creating', 'failed'.||
|| tags         || Object ||(New in 7.1.) An object of key/value pairs that allows clients to categorize images by any given criteria.||
|| eula         || String ||(New in 7.1.) URL of the End User License Agreement (EULA) for the image.||
|| acl          || Array ||(New in 7.1.) Access Control List. An array of account UUIDs given access to a private image. The field is only relevant to private images.||
|| error        || Object ||(New in 7.1.) If `state=="failed"`, resulting from [CreateImageFromMachine](#CreateImageFromMachine) failure, then there may be an error object of the form `{"code": "<string error code>", "message": "<string desc>"}`||
|| error.code   || String ||(New in 7.1.) A CamelCase string code for this error, e.g. "PrepareImageDidNotRun". See [GetImage](#GetImage) docs for a table of error.code values.||
|| error.message|| String ||(New in 7.1.) A short description of the image creation failure.||

<!-- TODO: list possible error.code values, link to troubleshooting docs -->

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `login` does not exist||

### CLI Command

    $ sdc-listimages

### Example Request

    GET /my/images HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET
    Server: SmartDataCenter
    Connection: close
    Date: Tue, 28 Jun 2011 23:14:34 GMT
    X-Api-Version: 7.0.0
    X-RequestId: FD6F87E7-5EA5-4B55-97D9-DEE29259731D
    X-Response-Time: 257
    Content-Type: application/json
    Content-Length: 402
    Content-MD5: y7YOeXG98DYchC96s46yRw==

    [
      {
        "name": "nodejs",
        "version": "1.1.3",
        "os": "smartos",
        "id": "7456f2b0-67ac-11e0-b5ec-832e6cf079d5",
        "default": true,
        "type": "smartmachine",
        "published_at": "2011-04-15T22:04:12+00:00"
      },
      {
        "name": "smartos",
        "version": "1.3.12",
        "os": "smartos",
        "id": "febaa412-6417-11e0-bc56-535d219f2590",
        "default": false,
        "type": "smartmachine",
        "published_at": "2011-04-11T08:45:00+00:00"
      }
    ]



