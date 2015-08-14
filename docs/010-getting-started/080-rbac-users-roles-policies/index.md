Title: RBAC: Users, roles & policies
---
Text:

Starting at version 7.2.0, CloudAPI supports Role Based Access Control (RBAC),
which means that [accounts](#account) can have multiple users and
roles associated with them.

While the behaviour of the [main account](#GetAccount) remains the same,
including the [SSH keys](#keys) associated with it, it's now possible to have
multiple [Users](#users) subordinate to the main account.  Each of these
users have a different set of [SSH Keys](#sshKeys).  Both the users and their
associated SSH keys have the same format as the main account object (and the
keys associated with it).

It's worth mentioning that the `login` for an account's users must be different
only between the users of that account, not globally.  We could have an account
with login *"mark"*, another account "exampleOne" with a user with login "mark",
another account "exampleTwo" with another user with login "mark", and so
forth.

These account users can additionally be organized using [Roles](#roles):

    {
        id: '802fbab6-ec2b-41c3-9399-064ccb65075b',
        name: 'devs',
        members: [ 'bob', 'fred', 'pedro' ],
        default_members: [ 'bob', 'fred' ],
        policies: [ 'createMachine', 'resizeMachine', 'CreateImageFromMachine']
    }

Each role can have an arbitrary set of [Policies](#policies):

    {
        id: '9d99a799-8234-4dd8-b37d-9af14b96da25',
        name: 'restart machines',
        rules: [ 'CAN rebootmachine if requesttime::time > 07:30:00 and requesttime::time < 18:30:00 and requesttime::day in (Mon, Tue, Wed, THu, Fri)', 'CAN stopmachine', 'CAN startmachine' ],
        description: 'This is completely optional'
    }

A policies' `rules` are used for the access control of an account's users'
access.  These rules use [Aperture](https://github.com/joyent/node-aperture) as
the policy language, and are described in detail in the next section.

Our recommendation is to limit each policy's set of rules to a very scoped
collection, and then add one or more of these policies to each group.  This aids
easily reusing existing policies for one or more roles, allowing fine-grained
definition of each role's abilities.


