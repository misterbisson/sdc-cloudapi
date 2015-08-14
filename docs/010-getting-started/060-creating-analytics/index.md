Title: Creating Analytics
---
Text:

Now that you have a SmartMachine up and running, and you logged in and did
whatever it is you thought was awesome, let's create an instrumentation to
monitor performance.  Analytics are one of the most powerful features of
SmartDataCenter, so for more information, be sure to read
[Appendix B: Cloud Analytics](#appendix-b-cloud-analytics).

To get started, let's create an instrumentation on our network bytes:

    $  sdc-createinstrumentation --module=nic --stat=vnic_bytes
    {
      "module": "nic",
      "stat": "vnic_bytes",
      "predicate": {},
      "decomposition": [],
      "value-dimension": 1,
      "value-arity": "scalar",
      "enabled": true,
      "retention-time": 600,
      "idle-max": 3600,
      "transformations": {},
      "nsources": 0,
      "granularity": 1,
      "persist-data": false,
      "crtime": 1401278156130,
      "value-scope": "interval",
      "id": "1",
      "uris": [
        {
          "uri": "/.../analytics/instrumentations/1/value/raw",
          "name": "value_raw"
        }
      ]
    }

Great, now ssh back into your machine, and do something silly like:

    $ wget joyent.com
    $ ping -I 1 joyent.com

Back on your CLI, go ahead and run:

    $ sdc-getinstrumentation 1
    {
      "module": "nic",
      "stat": "vnic_bytes",
      "predicate": {},
      "decomposition": [],
      "value-dimension": 1,
      "value-arity": "scalar",
      "enabled": true,
      "retention-time": 600,
      "idle-max": 3600,
      "transformations": {},
      "nsources": 0,
      "granularity": 1,
      "persist-data": false,
      "crtime": 1401278293816,
      "value-scope": "interval",
      "id": "2",
      "uris": [
        {
          "uri": "/marsell/analytics/instrumentations/2/value/raw",
          "name": "value_raw"
        }
      ]
    }

Where `1` is the id you got back from `sdc-createinstrumentation`.  You should
be able to run this a few times and see the changes.  This is just a starting
point, for a full discussion of analytics, be sure to read
[Appendix B: Cloud Analytics](#appendix-b-cloud-analytics).
