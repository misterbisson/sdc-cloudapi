Title: Appendix C: HTTP Signature Authentication
---
Text:


In addition to HTTP Basic Authentication, CloudAPI supports a new mechanism for
authenticating HTTP requests based on signing with your SSH private key.
Specific examples of using this mechanism with SDC are given here. Reference the
`HTTP Signature Authentication` specification by Joyent, Inc. for complete
details.

A node.js library for HTTP Signature is available with:

    $ npm install http-signature@0.9.11


