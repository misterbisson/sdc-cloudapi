Title: Issuing requests
---
Text:

All HTTP calls to CloudAPI must be made over SSL/TLS, and requests must carry at
least two headers (in addition to standard HTTP headers): `Authorization` and
`Api-Version` header.  The details are explained below.  In addition to these
headers, any requests requiring content must be sent in an acceptable scheme to
CloudAPI.  Details are also below.

### Content-Type

For requests requiring content, you can send parameters encoded with
`application/json`, `application/x-www-form-urlencoded` or
`multipart/form-data`.  Joyent recommends `application/json`.  The value of the
`Accept` header determines the encoding of content returned in responses.
CloudAPI supports `application/json` response encodings only.

For example, all of the following are valid calls:

Query String (on the uri):

    POST /my/keys?name=rsa&key=... HTTP/1.1
    Host: joyent.com
    Authorization: ...
    Content-Length: 0

Form encoded in the body:

    POST /my/keys HTTP/1.1
    Host: joyent.com
    Authorization: ...
    Content-Type: application/x-www-form-urlencoded
    Content-Length: 123

    name=rsa&key=...

JSON in the body:

    POST /my/keys HTTP/1.1
    Host: joyent.com
    Authorization: ...
    Content-Type: application/json
    Content-Length: 123

    {"name":"rsa","key":"..."}

### Authorization

All API calls to CloudAPI require an Authorization header, which supports
multiple ["schemes"](http://tools.ietf.org/html/rfc2617).  Currently CloudAPI
supports only one Authentication mechanism due to PCI compliance restrictions:

* HTTP Signature Authentication Scheme.  This Scheme is outlined in
[Appendix C](#Appendix-C).

In order to leverage HTTP Signature Authentication, only RSA signing mechanisms
are supported, and your keyId must be equal to the path returned from a
[ListKeys](#ListKeys) API call.  For example, if your SmartDataCenter login is
`demo`, and you've uploaded an RSA SSH key with the name `foo`, an Authorization
header would look like:

    Authorization: Signature keyId=/demo/keys/foo,algorithm="rsa-sha256" ${Base64($Date)}

The default value to sign for CloudAPI requests is simply the value of the HTTP
`Date` header.  For more informaton on the Date header value, see
[RFC 2616](http://tools.ietf.org/html/rfc2616#section-14.18).  All requests to
CloudAPI using the Signature authentication scheme *must* send a Date header.
Note that clock skew will be enforced to within 300 seconds (positive or
negative) from the value sent.

Full support for the HTTP Signature Authentication scheme is in the CloudAPI
SDK; an additional reference implementation for Node.js is available in the npm
`http-signature` module, which you can install with:

    npm install http-signature@0.9.11

### Api-Version

CloudAPI is strongly versioned, and all requests *must* specify a version of
the API.  The `Api-Version` header is expected to contain a
[semver](http://semver.org/) string describing the API version the client wants
to use, with the additional twist that your client can specify ranges of
versions it supports, much like you can with npm.  For details on how to specify
ranges, check [node-semver](https://github.com/isaacs/node-semver).  A couple
examples:

    Api-Version: ~7.0
    Api-Version: >=7.0.0

Joyent recommends you set the Api-Version header to `~7.0`; each service
release of SmartDataCenter will increment the `patch` version; any major
releases of SmartDataCenter will increment either the `minor` or `major`
version.

### Using cURL with CloudAPI

Since [cURL](http://curl.haxx.se/) is commonly used to script requests to web
services, here's a simple function you can use to wrap cURL when communicating
with CloudAPI:

    $ function cloudapi() {
      local now=`date -u "+%a, %d %h %Y %H:%M:%S GMT"` ;
      local signature=`echo ${now} | tr -d '\n' | openssl dgst -sha256 -sign ~/.ssh/id_rsa | openssl enc -e -a | tr -d '\n'` ;

      curl -is -H "Accept: application/json" -H "api-version: ~7.0" -H "Date: ${now}" -H "Authorization: Signature keyId=\"/demo/keys/id_rsa\",algorithm=\"rsa-sha256\" ${signature}" --url https://api.example.com$@ ;
      echo "";
    }

With that function, you could just do:

    $ cloudapi /my/machines


