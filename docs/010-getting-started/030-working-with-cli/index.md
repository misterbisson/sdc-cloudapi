Title: Working with the CLI
---
Text: 

For a complete list of CloudAPI CLI commands available, please see
[Appendix D: CloudAPI CLI Commands](#appendix-d-cloudapi-cli-commands).

To get help on command, use the `--help` flag.  For example:

    $ sdc-listdatacenters --help
    sdc-listdatacenters [--account string] [--debug boolean] [--help boolean] [--keyId string] [--url url]

You can set environment variables for the following flags so that you don't have
to type them for each request (e.g. in your .bash_profile).  All the examples in
this document assume that these variables have been set:

|| **CLI Flags** || **Description** || **Environment Variable** ||
||--account<br/>-a||Login name (account)||SDC\_ACCOUNT||
||--user||Subuser name when using [Role Based Access Control](#rbac-users-roles-policies)||SDC\_USER||
||--keyId<br/>-k||Fingerprint of the key to use for signing||SDC\_KEY\_ID||
||--url<br/>-u||URL of the CloudAPI endpoint||SDC\_URL||

You can use the short form of flags as well.  For instance, you can use the `-a`
or `--account` flag.

