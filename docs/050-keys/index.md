Title: Keys
---
Text: 

This part of the API is the means by which you operate on your SSH/signing keys.
These keys are needed in order to login to machines over SSH, as well as signing
requests to this API (see the HTTP Signature Authentication Scheme outlined in
[Appendix C](#Appendix-C) for more details).

Currently CloudAPI supports uploads of public keys in the OpenSSH format.

Note that while it's possible to provide a `name` attribute for an SSH key, in
order to use it as an human-friendly alias, this attribute's presence is
completely optional.  When it's not provided, the ssh key fingerprint will be
used as the `name` instead.

On the following routes, the parameter placeholder `:key` can be replaced with
with either the key's `name` or its `fingerprint`.  It's strongly recommended to
use `fingerprint` when possible, since the `name` attribute does not have
uniqueness constraints.
