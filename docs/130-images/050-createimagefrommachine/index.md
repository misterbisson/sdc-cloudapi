Title: CreateImageFromMachine (POST /:login/images)
—
Text:

(**Beta.** Custom image management is currently in beta.)

Create a new custom image from a machine.  The typical process is:

1. Customize a machine so it's the way you want it.
2. Call this endpoint to create the new image.
3. ... repeat from step 1 if more customizations are desired with different images.
4. Use the new image(s) for provisioning via [CreateMachine](#CreateMachine).

### Inputs

All inputs except `machine` are image manifest fields as defined by
[the IMGAPI docs](https://images.joyent.com/docs/#image-manifests).  Note that
not all fields listed there can be specified here.

||**Field**||**Type**||**Required?**||**Default**||**Notes**||
||machine||UUID||Yes||-||The prepared and stopped machine UUID from which the image is to be created.||
||name||String||Yes||-||The name of the custom image, e.g. "my-image". See the [IMGAPI docs](https://images.joyent.com/docs/#manifest-name) for details.||
||version||String||Yes||-||The version of the custom image, e.g. "1.0.0". See the [IMGAPI docs](https://images.joyent.com/docs/#manifest-version) for details.||
||description||String||No||-||The image [description](https://images.joyent.com/docs/#manifest-description).||
||homepage||String||No||-||The image [homepage](https://images.joyent.com/docs/#manifest-homepage).||
||eula||String||No||-||The image [eula](https://images.joyent.com/docs/#manifest-eula).||
||acl||String||No||-||The image [acl](https://images.joyent.com/docs/#manifest-acl).||
||tags||String||No||-||The image [tags](https://images.joyent.com/docs/#manifest-tags).||

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

### Errors

For general errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).
Some typical and specific errors for this endpoint:

|| **Code** || **HTTP Status** || **Description** ||
|| InsufficientServerVersionError || 422 || The `machine` given is running on a server that is too old. ||
|| NotAvailable || 501 || Typically this indicates that image creation is not supported for the OS of the given VM. ||

<!-- TODO: integrate these errors into the general table above -->

### Example CLI Command

    $ sdc-createimagefrommachine --machine=a44f2b9b-e7af-f548-b0ba-4d9270423f1a --name=my-custom-image --imageVersion=1.0.0

#### Example HTTP Request

    POST /my/images HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

    {
      "machine": "a44f2b9b-e7af-f548-b0ba-4d9270423f1a",
      "name": "my-custom-image",
      "version": "1.0.0"
    }

#### Example HTTP Response

    HTTP/1.1 201 Created
    x-joyent-jobid: 0b30ef20-d622-436a-9c30-7376ba7d904c
    Location: /admin/images/b87616a2-7a49-4e02-a71d-2e0ce5a2f037
    Content-Type: application/json
    Content-Length: 125
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    Access-Control-Allow-Methods: GET, HEAD, POST
    Access-Control-Expose-Headers: Api-Version, Request-Id, Response-Time
    Connection: Keep-Alive
    Content-MD5: 2sEZ45LmhRiretMPn5sqVA==
    Date: Tue, 30 Jul 2013 19:59:25 GMT
    Server: Joyent SmartDataCenter 7.0.0
    Api-Version: 7.0.0
    Request-Id: 88af23b0-f952-11e2-8f2c-fff0ec35f4ce
    Response-Time: 160
    X-Request-Id: 88af23b0-f952-11e2-8f2c-fff0ec35f4ce
    X-Api-Version: 7.0.0
    X-Response-Time: 160

    {
        "id": "62306cd7-7b8a-c5dd-d44e-8491c83b9974",
        "name": "my-custom-image",
        "version": "1.2.3",
        "requirements": {},
        "owner": "47034e57-42d1-0342-b302-00db733e8c8a",
        "public": false,
        "state": "creating"
    }

