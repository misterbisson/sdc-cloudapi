Title: CreateMachine (POST /:login/machines)
---
Text:

Allows you to provision a machine.

If you do not specify a package and/or dataset, you'll get the datacenter
defaults for each.  If you do not specify a name, CloudAPI will generate a
random one for you.

**NOTE:**
CreateMachine no longer returns IP addresses as of SDC 7.0.  To obtain the IP
address of a newly-provisioned machine, poll [ListMachines](#ListMachines) or
[GetMachine](#GetMachine) until the machine state is `running` or a failure.

Your machine will initially be not available for login (SmartDataCenter must
provision and boot it); you can poll [GetMachine](#GetMachine) for status.
When the `state` field is equal to `running`, you can log in. If the machine is
of type `smartmachine`, you can use any of the SSH keys managed under the
[keys section](#keys) of CloudAPI to login as any POSIX user on the OS.  You can
add/remove keys over time, and the machine will automatically work with that
set.

If the the machine is a `virtualmachine`, and of a UNIX-derived OS (e.g. Linux),
you *must* have keys uploaded before provisioning; that entire set of keys will
be written out to `/root/.ssh/authorized_keys`, and you can SSH in using one of
those.  Changing the keys over time under your account will not affect a
running virtual machine in any way; those keys are statically written at
provisioning-time only, and you will need to manually manage them on the machine
itself.

If the image you create a machine from is set to generate passwords for you,
the username/password pairs will be returned in the metadata response as a
nested object, like:

    "metadata": {
      "credentials": {
        "root": "s8v9kuht5e",
        "admin": "mf4bteqhpy"
      }
    }

You cannot overwrite the `credentials` key in CloudAPI.

More generally, the metadata keys can be set either at machine-creation time
or after the fact.  You must either pass in plain-string values, or a JSON
encoded string.  On metadata retrieval, you will get back a JSON object.

Networks are usually provided by the package, although they can be specified
using the networks attribute. If neither the package, nor the inputs, contains
an array of networks the machine should attach to, the machine will default to
attaching to one externally-accessible network (it will have one public
IP), and one internally-accessible network. This behaviour can be overridden by
specifying 'external' and/or 'internal' in a default_networks array. Ergo, it's
possible to have a machine only attached to an internal network, or both public
and internal, or just external. NB: 'internal' cannot be reached from the
Internet, but all users also on the internal network can reach it.

Typically, SDC will allocate the new machine somewhere reasonable within the
cloud.  You may want this machine to be placed close to, or far away from, other
existing machines belonging to you;  if so, you can provide locality hints to
cloudapi.  Locality hints are not guarantees, but SDC will attempt to satisfy
the hints if possible. An example of a locality hint is:

    "locality": {
      "near": ["af7ebb74-59be-4481-994f-f6e05fa53075"],
      "far": ["da568166-9d93-42c8-b9b2-bce9a6bb7e0a", "d45eb2f5-c80b-4fea-854f-32e4a9441e53"]
    }

UUIDs provided should be the ids of machines belonging to you.

Locality hints are optional. Both `near` and `far` are also optional; you can
provide just one if desired. Lastly, if there's only a single UUID entry in an
array, you can omit the array and provide the UUID string directly as the value
to a near/far key.

### Inputs

||name||String||Friendly name for this machine; default is a randomly generated name||
||package||String||Id of the package to use on provisioning; default is indicated in ListPackages||
||image||String||The image UUID (the "id" field in [ListImages](#ListImages))||
||networks||Array||Desired networks ids, obtained from ListNetworks||
||default_networks||Array||Alter the default networks IPs are drawn from if Inputs or the package have no networks||
||locality||Object[String => Array]||Optionally specify which machines the new machine should be near or far from||
||metadata.$name||String||An arbitrary set of metadata key/value pairs can be set at provision time, but they must be prefixed with "metadata."||
||tag.$name||String||An arbitrary set of tags can be set at provision time, but they must be prefixed with "tag."||
||firewall_enabled||Boolean||(Added in SDC 7.0.)Completely enable or disable firewall for this machine||

### Returns

||id||String||Unique identifier for this machine||
||name||String||The "friendly" name for this machine||
||type||String||The type of machine (virtualmachine or smartmachine)||
||state||String||The current state of this machine (e.g. running)||
||dataset||URN||The dataset urn this machine was provisioned with (for new images without a URN, this value will be the image id)||
||memory||Number||The amount of RAM this machine has (in MiB)||
||disk||Number||The amount of disk this machine has (in MiB)||
||ips||Array[String]||The IP addresses this machine has||
||metadata||Object[String => String]||Any additional metadata this machine has||
||created||Date (ISO8601)||When this machine was created||
||updated||Date (ISO8601)||When this machine was last updated||
||package||String||The name of the package used to create this machine||
||image||String||The image id this machine was provisioned with||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist||
||InsufficientCapacity||There isn't enough capacity in this datacenter||
||InvalidArgument||If one of the input parameters was invalid||

### CLI Command

    $ sdc-createmachine --image=01b2c898-945f-11e1-a523-af1afbe22822 --package=5968a8a4-5bff-4c5e-8034-d79de962e7f6

### Example Request

    POST /my/machines HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Content-Length: 455
    Content-Type: application/x-www-form-urlencoded
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 201 Created
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Server: Joyent
    Connection: close
    Date: Wed, 13 Apr 2011 23:12:39 GMT
    X-Api-Version: 7.0.0
    X-RequestId: 04BF964B-C285-4BDF-84B1-762B8FDCADB1
    X-Response-Time: 470
    Content-Type: application/json
    Content-Length: 197
    Content-MD5: yuUKkqnVw/ZtHXTTeoWVDQ==

    {
      "id": "55a366ce-6c30-4f88-a36b-53638bd0cb62",
      "name": abcd1234",
      "type": "smartmachine",
      "state": "provisioning",
      "dataset": nodejs-1.1.4",
      "image": "01b2c898-945f-11e1-a523-af1afbe22822",
      "memory": 128,
      "disk": 5120,
      "ips": [],
      "metadata": {},
      "created": "2011-06-03T00:02:31+00:00",
      "updated": "2011-06-03T00:02:31+00:00",
    }

### More Examples

Create machine with multiple nics

    $ sdc-createmachine --image=01b2c898-945f-11e1-a523-af1afbe22822 --package=5968a8a4-5bff-4c5e-8034-d79de962e7f6 --networks=42325ea0-eb62-44c1-8eb6-0af3e2f83abc --networks=c8cde927-6277-49ca-82a3-741e8b23b02f

Create machine with tags

    $ sdc-createmachine --image=01b2c898-945f-11e1-a523-af1afbe22822 --package=5968a8a4-5bff-4c5e-8034-d79de962e7f6 --networks=42325ea0-eb62-44c1-8eb6-0af3e2f83abc -t foo=bar -t group=test

### User-script

The special value `metadata.user-script` can be specified to provide a custom
script which will be executed by the machine right after creation.  This script
can be specified using the command line option `--script`, which should be an
absolute path to the file we want to upload to our machine.


