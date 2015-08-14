Title: ExportImage (POST /:login/images/:id?action=export)
---
Text:

(**Beta.** Custom image management is currently in beta.)

Exports an image to the specified Manta path.  One must be the owner of the
image and the correspondent Manta path prefix in order to export it.  Both the
image manifest and the image file will be exported, and their filenames will
default to the following format when the specified manta path is a directory:

    <manta_path>/NAME-VER.imgmanifest
    <manta_path>/NAME-VER.zfs.FILE-EXT

Where NAME is the image name and VER is the image version.  FILE-EXT is the file
extension of the image file.  As an example, exporting a foo-1.0.0 image to
/user/stor/cloudapi would result in the following files being exported:

    /user/stor/cloudapi/foo-1.0.0.imgmanifest
    /user/stor/cloudapi/foo-1.0.0.zfs.gz

By contrast, if the basename of the given prefix is not a directory, then
"MANTA_PATH.imgmanifest" and "MANTA_PATH.zfs[.EXT]" are created.  As an example,
the following shows how to export foo-1.0.0 with a custom name:

    /my/images/<uuid>?action=export&manta_path=/user/stor/my-image

    /user/stor/my-image.imgmanifest
    /user/stor/my-image.zfs.gz

### Inputs

||**Field** ||**Type**||**Description**||
||manta_path||String||The Manta path prefix to use when exporting the image.||

### Returns

A Manta location response object.  It provides the properties that allow a
CloudAPI user to retrieve the image file and manifest from Manta: manta_url,
image_path, manifest_path.

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` or `:id` does not exist||

### CLI Command

    $ sdc-exportimage --mantaPath=/user/stor/my-image 0c428eb9-7f03-4bb0-ac9f-c0718945d604

#### Example Request

    POST /my/images/e42f8c84-bbea-11e2-b920-078fab2aab1f?action=export&manta_path=/user/stor/my-image HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

#### Example Response

    HTTP/1.1 200 OK
    Content-Type: application/json
    Content-Length: 150
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, Api-Version, Response-Time
    Access-Control-Allow-Methods: GET, HEAD, POST, DELETE
    Access-Control-Expose-Headers: Api-Version, Request-Id, Response-Time
    Connection: Keep-Alive
    Content-MD5: qSUhN+dwdJKEFlcyrUdBiw==
    Date: Tue, 03 Sep 2013 23:21:05 GMT
    Server: Joyent SmartDataCenter 7.1.0
    Api-Version: 7.1.0
    Request-Id: 8180ad80-14ef-11e3-a62d-89e8106c294e
    Response-Time: 670
    X-Request-Id: 8180ad80-14ef-11e3-a62d-89e8106c294e
    X-Api-Version: 7.1.0
    X-Response-Time: 670

    {
      "manta_url": "https://us-east.manta.joyent.com",
      "image_path": "/user/stor/my-image.zfs.gz",
      "manifest_path": "/user/stor/my-image.imgmanifest"
    }


