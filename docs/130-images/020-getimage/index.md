Title: GetImage (GET /:login/images/:id)
—
Text:

Gets an individual image by `id`.

### Inputs

None

### Returns

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

Possible `error.code` values:

|| **error.code** || **Details** ||
|| PrepareImageDidNotRun || This typically means that the target KVM machine (e.g. Linux) has old guest tools that pre-date the image creation feature. Guest tools can be upgraded with installers at <https://download.joyent.com/pub/guest-tools/>. Other possibilities are: a boot time greater than the five-minute timeout, or a bug or crash in the image-preparation script. ||
|| VmHasNoOrigin || Origin image data could not be found for the machine. Typically this is for a machine *migrated* before image creation support was added. ||
|| NotSupported  || Indicates an error due to functionality that isn't currently supported. One example is that custom image creation of a VM based on a custom image isn't currently supported. ||
|| InternalError || A catch-all error for unexpected or internal errors. ||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

### CLI Command

    $ sdc-getimage e42f8c84-bbea-11e2-b920-078fab2aab1f

#### Example Request

    GET /my/images/e42f8c84-bbea-11e2-b920-078fab2aab1f HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

#### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: 340
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    Access-Control-Allow-Methods: GET, HEAD, POST
    Access-Control-Expose-Headers: Api-Version, Request-Id, Response-Time
    Connection: Keep-Alive
    Content-MD5: Q4ibyY8+ckGrTqyr/sbYLw==
    Date: Thu, 08 Aug 2013 06:02:49 GMT
    Server: Joyent SmartDataCenter 7.0.0
    Api-Version: 7.0.0
    Request-Id: 27431d80-fff0-11e2-b61a-f51841e5d1bd
    Response-Time: 491
    X-Request-Id: 27431d80-fff0-11e2-b61a-f51841e5d1bd
    X-Api-Version: 7.0.0
    X-Response-Time: 491

    {
      "id": "e42f8c84-bbea-11e2-b920-078fab2aab1f",
      "name": "fedora",
      "version": "2.4.2",
      "os": "linux",
      "type": "virtualmachine",
      "requirements": {},
      "description": "Fedora 18 64-bit image with just essential...",
      "published_at": "2013-05-17T18:18:36.472Z",
      "public": true
      "state": "active",
    }
