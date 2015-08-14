Title: Managing SSH keys
---
Text:

For machines of `type` `smartmachine` (see the JSON returned from
`sdc-listmachines`), you can manage the SSH keys that allow logging into the
machine via CloudAPI (Virtual Machines are static, and whatever keys were in
your account at machine creation time are used).  For example, to rotate keys:

    $ sdc-createkey --name=my-other-rsa-key ~/.ssh/my_other_rsa_key.pub

The `--name` option sets the name of the key.  If you don't provide one,
CloudAPI sets it to the name of the file; in this case `my_other_rsa_key.pub`.

To use the new key, you will need to update the environment variables:

    $ export SDC_KEY_ID=`ssh-keygen -l -f ~/.ssh/my_other_rsa_key.pub | awk '{print $2}' | tr -d '\n'`

At this point you could delete your other key from the system; see
[Cleaning Up](#cleaning-up) for a quick example.
