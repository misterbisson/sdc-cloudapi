Title: API introduction
---
Text:

CloudAPI exposes a REST API over HTTPS.  You can work with the REST API by
either calling it directly via tooling you already know about (such as curl, et
al), or by using the CloudAPI SDK from Joyent.  The CloudAPI SDK is available as
an npm module, which you can install with:

    $ npm install smartdc

The rest of this document will show all APIs in terms of both the raw HTTP
specification, the SDK API, and the CLI command.
