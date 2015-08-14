Title: Rules definition for access control
---
Text:

As mentioned earlier, the policies' rules use
[Aperture Policy Language](https://github.com/joyent/node-aperture#policy-language),
with the following *basic format*:

`<principals> CAN <actions> <resources> WHEN <conditions>`.

You should refer to the
[Aperture documentation](https://github.com/joyent/node-aperture) for the
complete details about the different possibilities when defining new rules.
This section will only cover a limited set strictly related to CloudAPI's usage.

In the case of CloudAPI, `<principal>` will be always the user performing the
HTTP request. Likewise, `<resource>` will always be the URL
of such request, for example `/:account/machines/:machine_id`.

We add one or more roles to a resource to explicitly define the active roles a
user trying to access a given resource must have. Therefore, we don't need to
specify `<principal>` in our rules, given it'll be always defined by the
role-tags of the resource the user is trying to get access to. For the same
reason, we don't need to specify `<resource>` in our rules.

Therefore, CloudAPI's Aperture rules have the format:

        CAN <actions> WHEN <conditions>

By default, the access policy will `DENY` any attempt made by any account
user to access a given resource, unless:

* that resource is tagged with a role
* that role is active
* that role has a policy
* that policy contains a rule which explicity `GRANTS` access to that resource

For example, a user with an active role `read`, which includes a policy rule
like `CAN listmachines and getmachines` will not get access to resources like
`/:account/machines` or `/:account/machines/:machine_id` unless these resources
are *role-tagged* with the role `read` too.

Additionally, given that the `<actions>` included in the policy rule are just
`listmachines` and `getmachine`, the user will be able to retrieve a machine's
details provided by the [GetMachine](#GetMachine) action, but will not be able
to perform any other machine actions (like [StopMachine](#StopMachine)).
However, if the role has a rule including that `<action>` (like StopMachine), or
the user has an additional role which includes that rule, then the user can
invoke that action too.

As an aside, the active roles of a user are set by the `default_members`
attribute in a role. If three different roles contain the "john" user (amongst
others) in their default-members list, then the "john" user will have those
three roles as active roles by default. This can be overridden by passing in
`?as-role=<comma-separated list of role names>` as part of the URL; provided
that each role contains that user in their `members` list, then those roles are
set as the currently-active roles for a request instead.

For more details on how Access Control works for both CloudAPI and Manta,
please refer to [Role Based Access Control][acuguide] documentation.

[acuguide]: https://docs.joyent.com/jpc/rbac/


## Fabrics

A fabric is the basis for building your own private networks that
cannot be accessed by any other user. It represents the physical infrastructure
that makes up a network; however, you don't have to cable or program it. Every
account has its own unique `fabric` in every data center.

On a fabric, you can create your own VLANs and layer three IPv4 networks. You
can create any VLAN from 0-4095, and you can create any number of IPv4 networks
on top of the VLANs, with all of the traditional IPv4 private addresses spaces -
`10.0.0.0/8`, `192.168.0.0/16`, and `172.16.0.0/12` - available for use.

You can create networks on your fabrics to create most network topologies. For
example, you could create a single isolated private network that nothing else
could reach, or you could create a traditional configuration where you have a
database network, a web network, and a load balancer network, each on their own
VLAN.



