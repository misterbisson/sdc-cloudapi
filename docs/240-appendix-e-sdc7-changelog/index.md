Title: Appendix E: SDC 7 Changelog
---
Text:


CloudAPI and SmartDC CLI have been completely rewritten for SDC 7.0.  Notably,
required version of Node.js to run the CLI is now greater or equal than 0.8.14.

Most of the commands remain the same, taking exactly the same options and
returning exactly the same JSON information in an attempt to preserve backwards
compatibility between 6.5 and 7.0 API clients, and software built for 6.5.

There are some important differences between SDC 7.0 and the previous version,
where the main one is:

* The request version of SDC 7.0 CLI is `~7.0` instead of `6.5`.

* This means that the parameter `--image` (or the equivalent `-e` short option)
is mandatory for the command `sdc-createmachine`.  On previous versions of the
API, it was possible to provision a machine without specifying an image to the
create machine command.  This behavior has been deprecated, and the desired
image **must** be specified.

* Starting with version 7.0, there isn't a `default` image.  For backward
compatibility purposes, when a request using `~6.5` is received, the latest
version of the `smartos` image will become the default one.

* Starting with version 7.0, virtual machines can also be resized, but **only
resizing virtual machines to a higher capacity/package is supported**.

* Version 7.0 also deprecates the `URN` attribute for any entity, either Images
or Packages.  URN support will finish with SDC 6.5 support.

* Starting with version 7.0, packages listed by GET `/:account/packages` accept
search filters.  Additionally, the package members `vcpus`, `id` and `version`
are included on packages, as explained in the
[packages section](#packages-description).

* Starting with version 7.0, a historical list of actions performed on machines
is available through request `GET /:account/machines/:id/audit`.

* Starting with version 7.0, customers can manage Firewall Rules through the
`/:account/fwrules` resource, as explained in the
[Firewall Rules section](#FirewallRules).

* Starting with version 7.0, `GET /:account` exposes account details, and allows
the modification of account properties -- with the exception of `password` and
`login` -- through `POST /:account`.  Details are explained in the
[Account section](#Account)

* Starting with version 7.0, networks details are exposed through the
`/:account/networks` resource, as explained in the
[Networks section](#Networks).

* Starting with version 7.0,  node-smartdc's `sdc-createmachine` accepts an
optional `--networks|-w` argument, which can be set to the `id` of one or more
of the networks retrieved from `/:account/networks`.

* Starting with version 7.1.0, customer image management is made available,
allowing [Machine Creation from Images](#CreateImageFromMachine),
[exporting images to the specified manta path](#ExportImage) and
[custom images deletion](#DeleteImage).

* Starting with version 7.1.1, firewall rules will include information regarding
rules being global or not, and will optionally include a human-readable
description for the rules (which can be modified except for the global rules).

* Starting with version 7.2.0, RBAC has been made available on the CloudAPI
interface. Accounts can create users, rules can be created and combined to make
policies, policies and users can be associated together using roles, and role
tags can be applied to CloudAPI resources.




* Version 7.1.0 now adds the listing and manipulation of NICs on VMs.

