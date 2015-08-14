Title: CloudAPI Specific Parameters
---
Text:

The `Signature` authentication scheme is based on the model that the client must
authenticate itself with a digital signature produced by the private key
associated with an SSH key under your account (see `/my/keys` above).  Currently
only RSA signatures are supported.  You generate a signature by signing the
value of the HTTP `Date` header.

As an example, assuming that you have associated an RSA SSH key with your
account, called 'rsa-1', the following request is what you would send for a
`ListMachines` request:

    GET /my/machines HTTP/1.1
    Host: api.example.com
    Date: Sat, 11 Jun 2011 23:56:29 GMT
    Authorization: Signature keyId="/demo/keys/rsa-1",algorithm="rsa-sha256" <Base64(rsa(sha256($Date)))>
    Accept: application/json
    Api-Version: ~7.0

Where the signature is attached with the
`Base64(rsa(sha256(Sat, 11 Jun 2011 23:56:29 GMT)))` output.  Note that the
`keyId` parameter **cannot** use the *my* shortcut, as in the HTTP resource
paths. This is because CloudAPI must lookup your account to resolve the key, as
with Basic authentication.  In short, you **MUST** use the login name associated
to your account to specify the `keyId`.

