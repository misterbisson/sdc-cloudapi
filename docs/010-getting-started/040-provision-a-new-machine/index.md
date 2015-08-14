Title: Provision a new machine
---
Text:

To provision a new machine, you first need to get the `id`s for the image and
package you want to use as the base for your machine.

An image is a snapshot of a filesystem and its software (for SmartMachines),
or a disk image (for Virtual Machines).  You can get the list of available
images using the `sdc-listimages` command; see the [ListImages](#ListImages)
section below for a detailed explanation of this command.

A package is a set of dimensions for the new machine, such as RAM and disk size.
You can get the list of available packages using the `sdc-listpackages` command;
see the [ListPackages](#ListPackages) section below for a detailed explanation
of this command.

Once you have the package and image ids, to provision a new machine:

    $ sdc-createmachine --name=getting-started --image=c3321aac-a07c-11e3-9430-fbb1cc12d1df --package=9fcd9ab7-bd07-cb3c-9f9a-ac7ec3aa934e
    {
      "id": "4adf88fb-ba7e-c4b1-a017-b988f510cbc2",
      "name": "getting-started",
      "type": "smartmachine",
      "state": "provisioning",
      "image": "c3321aac-a07c-11e3-9430-fbb1cc12d1df",
      "ips": [],
      "memory": 256,
      "disk": 16384,
      "metadata": {
        "root_authorized_keys": "..."
      },
      "tags": {},
      "created": "2014-05-28T10:12:38.329Z",
      "updated": "2014-05-28T10:12:38.329Z",
      "networks": [],
      "dataset": "sdc:sdc:base64:13.4.1",
      "firewall_enabled": false,
      "compute_node": null,
      "package": "g3-devtier-0.25-smartos"
    }

You can use the `--name` flag to name your machine; if you do not specify a
name, SmartDataCenter will generate one for you.  `--image` is the `id` of the
image you'd like to use as the new machine's base.  `--package` is the `id` of
the package to use to set machine dimensions.

Retrieve the status of your new machine by:

    $ sdc-listmachines --name=getting-started
    [
      {
        "id": "4adf88fb-ba7e-c4b1-a017-b988f510cbc2",
        "name": "getting-started",
        "type": "smartmachine",
        "state": "running",
        "image": "c3321aac-a07c-11e3-9430-fbb1cc12d1df",
        "ips": [
          "165.225.138.124",
          "10.112.2.89"
        ],
        "memory": 256,
        "disk": 16384,
        "metadata": {
          "root_authorized_keys": "..."
        },
        "tags": {},
        "created": "2014-05-28T10:15:33.301Z",
        "updated": "2014-05-28T10:16:50.000Z",
        "networks": [
          "65ae3604-7c5c-4255-9c9f-6248e5d78900",
          "56f0fd52-4df1-49bd-af0c-81c717ea8bce"
        ],
        "dataset": "sdc:sdc:base64:13.4.1",
        "primaryIp": "165.225.138.124",
        "firewall_enabled": false,
        "compute_node": "44454c4c-3800-104b-805a-b4c04f355631",
        "package": "g3-devtier-0.25-smartos"
      }
    ]

When you provision a new machine, the machine will take time to be initialized
and booted; the `state` attribute will reflect this.  Once the `state` attribute
in the JSON from `sdc-listmachines` is "running", you can login to your new
machine (assuming it's a Unix-based machine), with the following:

    $ ssh-add ~/.ssh/id_rsa
    $ ssh -A admin@165.225.138.124

Replace `~/.ssh/id_rsa` with the path to the key you added in the portal, and
`165.225.138.124` with the IP of your new machine.

These two commands set up your SSH agent (which has some magical properties,
such as the ability for the CLI to work on your SmartMachine without keys), and
logs you in as the `admin` user on that machine.  Note that the `admin` user has
password-less sudo capabilities, so you may want to set up some less priviledged
users.  The SSH keys on your account will allow you to login as `root` or
`admin` on your SmartMachine.

Now that we've done some basics with a machine, let's introduce a few concepts:


<a name="image-description"></a>
### Images

By default, you can use SmartOS images.  Your SmartDataCenter cloud may have
other images available as well, such as Linux or Windows images.  The list of
available images can be obtained with:

    $ sdc-listimages

The main difference with (older) datasets is that images will not provide an
URN, but just a unique id which must be used to identify your image of choice.


<a name="packages-description"></a>
### Packages

You can list packages available in your cloud with:

    $ sdc-listpackages
    [
      {
        "name": "g3-standard-8-smartos",
        "memory": 8192,
        "disk": 807936,
        "swap": 16384,
        "lwps": 2000,
        "vcpus": 0,
        "default": false,
        "id": "28d8c3f1-cf62-422a-a41d-fdf8b5110d00",
        "version": "1.0.0",
        "description": "Standard 8 GB RAM 2 vCPUs and bursting 789 GB Disk",
        "group": "Standard"
      },
      ...
    ]

Packages are the SmartDataCenter name for the dimensions of your machine.
Packages are provided so that you do not need to select individual settings,
such as RAM or disk size.  To provision a new SmartMachine with more memory than
the one your created above, try:

    $ sdc-createmachine --name=big-one --image=3390ca7c-f2e7-11e1-8818-c36e0b12e58b --package=28d8c3f1-cf62-422a-a41d-fdf8b5110d00

Please note this example assumes that the package and image `id`s above exist in
the SmartDataCenter setup you are interacting with.  That may or not be the
case, given that packages and image may change from one setup to another.  Just
make sure you try the previous example with an existing package and image `id`s
from those you obtained using `sdc-listpackages` and `sdc-listimages`
respectively.


