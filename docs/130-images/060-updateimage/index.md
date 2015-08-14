Title: UpdateImage (POST /:login/images/:id?action=update)
---
Text:

(**Beta.** Custom image management is currently in beta.)

Updates metadata about an image.

### Inputs

Only the image attributes listed below can be updated.

||**Field**||**Type**||**Notes**||
||name||String||Name of the image, e.g. "my-image". See the [IMGAPI docs](https://images.joyent.com/docs/#manifest-name) for details.||
||version||String||Version of the image, e.g. "1.0.0". See the [IMGAPI docs](https://images.joyent.com/docs/#manifest-version) for details.||
||description||String||The image [description](https://images.joyent.com/docs/#manifest-description).||
||homepage||String||The image [homepage](https://images.joyent.com/docs/#manifest-homepage).||
||eula||String||The image [eula](https://images.joyent.com/docs/#manifest-eula).||
||acl||String||The image [acl](https://images.joyent.com/docs/#manifest-acl).||
||tags||String||The image [tags](https://images.joyent.com/docs/#manifest-tags).||

### Returns

An updated image object.

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

### Errors

For general errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).
Some typical and specific errors for this endpoint:

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### Example CLI Command

    $ sdc-updateimage --name=my-renamed-image eca995fe-b904-11e3-b05a-83a4899322dc

#### Example HTTP Request

    POST /my/images/eca995fe-b904-11e3-b05a-83a4899322dc?action=update HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

    {
      "name": "my-renamed-image",
    }

#### Example HTTP Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    ...
    Request-Id: b8e43c60-b904-11e3-93b7-1f685001b0c3
    Response-Time: 135
    X-Request-Id: b8e43c60-b904-11e3-93b7-1f685001b0c3
    X-Api-Version: 7.2.0
    X-Response-Time: 135

    {
      "id": "eca995fe-b904-11e3-b05a-83a4899322dc",
      "name": "my-renamed-image",
      "version": "1.0.0",
      "os": "smartos",
      "requirements": {},
      "type": "smartmachine",
      "published_at": "2013-11-25T17:44:54Z",
      "owner": "47034e57-42d1-0342-b302-00db733e8c8a",
      "public": true,
      "state": "active"
    }


