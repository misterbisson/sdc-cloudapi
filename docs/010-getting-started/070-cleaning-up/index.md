Title: Cleaning up
---
Text:

After going through this `Getting Started` section, you should now have at least
one SSH key, one machine and one instrumentation.  The rest of the commands
assume you have [json](https://www.npmjs.org/package/json) installed.

### Deleting Instrumentations

Before cleaning up your machines, let's get rid of the instrumentation we
created:

    $ sdc-deleteinstrumentation 1

### Deleting Machines

Machines need to be shutdown before you can delete them, so let's do some fancy
shell work to do that:

    $ sdc-listmachines -n getting-started | json 0.id | xargs sdc-stopmachine

Now go ahead and check the state a few times until it's `stopped`, then run
`sdc-deletemachine`:

    $ sdc-listmachines -n getting-started | json 0.state
    $ sdc-listmachines -n getting-started | json 0.id | xargs sdc-deletemachine

### Deleting keys

Finally, you probably have one or two SSH keys uploaded to SmartDataCenter after
going through the guide, so delete the one we setup:

    $ sdc-deletekey id_rsa


