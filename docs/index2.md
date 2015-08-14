Title: Joyent CloudAPI
---
Text: 

CloudAPI is the public API for a SmartDataCenter cloud: it allows operations
on VMs, networking, users, datasets, and other relevant details for the running
of machinery in a SmartDataCenter cloud.

This is the reference documentation for the CloudAPI that is part of Joyent's
SmartDataCenter 7.0 product.  This guide provides descriptions of the APIs
available, as well as supporting information -- such as how to use the SDK(s),
command line interface (CLI), and where to find more information.

For more information about this product visit
[Joyent SmartDataCenter](http://www.joyent.com/software/smartdatacenter).

This document refers to SmartDataCenter 7.0.  For information on version 6.5 of
this API see [CloudAPI 6.5 Documentation](65.html)


## Conventions

Any content formatted as follows is a command-line example that you
can run from a shell:

    $ sdc-listmachines

All other examples and information are formatted like so:

    GET /my/machines HTTP/1.1




# Introduction to CloudAPI

## What is CloudAPI?

CloudAPI is the API you use to interact with the SmartDataCenter product.  Using
CloudAPI, you can:

* Provision new machines (both SmartMachines and traditional Virtual Machines)
* Manage your account credentials
* Create custom analytics for monitoring your infrastructure


## How do I access CloudAPI?

CloudAPI is available as a REST API, and you can access it using:

* SmartDataCenter Customer Portal
* [Command line interface](https://github.com/joyent/node-smartdc) (CLI)
* [node.js SDK](https://github.com/joyent/node-smartdc)
* REST API

If you don't want to write any code, use the CloudAPI CLI.  The CLI lets you use
command-line tools to perform every action available in the SDK and REST API.



