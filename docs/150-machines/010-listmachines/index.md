Title: ListMachines (GET /:login/machines)
---
Text:

Lists all machines we have on record for your account.  If you have a large
number of machines, you can filter using the input parameters listed below.

You can paginate this API by passing in `offset` and `limit`.  HTTP responses
will contain the additional headers `x-resource-count` and `x-query-limit`.  If
`x-resource-count` is less than `x-query-limit`, you're done, otherwise call the
API again with `offset` set to `offset` + `limit` to fetch additional machines.

Note that there is a `HEAD /:login/machines` form of this API, so you can
retrieve the number of machines without retrieving a JSON describing the
machines themselves.

### Inputs

||type||String||The type of machine (virtualmachine or smartmachine)||
||name||String||Machine name to find (will make your list size 1, or 0 if nothing found)||
||image||String||Image id; returns machines provisioned with that image||
||state||String||The current state of the machine (e.g. running)||
||memory||Number||The current size of the RAM deployed for the machine (in MiB)||
||tombstone||Number||Include machines destroyed in the last N minutes||
||limit||Number||Return a max of N machines; default is 1000 (which is also the maximum allowable result set size)||
||offset||Number||Get a `limit` number of machines starting at this `offset`||
||tag.$name||String||An arbitrary set of tags can be used for querying, assuming they are prefixed with "tag."||
||credentials||Boolean||Whether to include the generated credentials for machines, if present. Defaults to false.||

Note that if the special input `tags=*` is provided, any other input will be
completely ignored and the response will return all machines with any tag.

### Returns

An array of machine objects, which contain:

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
||package||String||The id or name of the package used to create this machine||
||image||String||The image id this machine was provisioned with||

### Errors

For all possible errors, see [CloudAPI HTTP Responses](#cloudapi-http-responses).

||**Error Code**||**Description**||
||ResourceNotFound||If `:login` does not exist||
||InvalidArgument||If one of the input parameters was invalid||

### CLI Command

Get all machines:

    $ sdc-listmachines

Get all SmartMachines:

    $ sdc-listmachines --type smartmachine

Get all SmartMachines that are currently running:

    $ sdc-listmachines --type smartmachine --state running

Get all SmartMachines that are currently running and have 256 MiB of memory:

    $ sdc-listmachines --type smartmachine --state running --memory 256

Get all SmartMachines that are currently running, with 256 MiB of RAM, tagged as
'test':

    $ sdc-listmachines --type smartmachine --state running --memory 256 --tag group=test

Get all tagged machines:

    $ sdc-listmachines --tag \*

Beware that depending on your shell you may need to escape the asterisk
character. E.g. Bash requires it escaped.

The CLI has parameters that let you filter on most things in the API, and you
can combine them.  Run `$ sdc-listmachines --help` to see all the options.

### Example Request

    GET /my/machines HTTP/1.1
    Authorization: ...
    Host: api.example.com
    Accept: application/json
    Api-Version: ~7.0

### Example Response

    HTTP/1.1 200 OK
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Methods: GET, POST
    Server: SmartDataCenter
    Connection: close
    Date: Tue, 28 Jun 2011 23:14:34 GMT
    X-Api-Version: 7.0.0
    X-RequestId: AECD793C-3368-45FA-ACD9-19AC394B8933
    X-Response-Time: 315
    x-resource-count: 2
    x-query-limit: 25
    Content-Type: application/json
    Content-Length: 292
    Content-MD5: kGRcBWkLgMT+IAjDM46rFg==

    [
      {
        "id": "15080eca-3786-4bb8-a4d0-f43e1981cd72",
        "name": "getting-started",
        "type": "smartmachine",
        "state": "running",
        "dataset": "sdc:sdc:smartos:1.3.15",
        "image": "01b2c898-945f-11e1-a523-af1afbe22822",
        "memory": 256,
        "disk": 5120,
        "ips": [
          "10.88.88.50"
        ],
        "metadata": {},
        "created": "2011-06-03T00:02:31+00:00",
        "updated": "2011-06-03T00:02:31+00:00"
      }
    ]

