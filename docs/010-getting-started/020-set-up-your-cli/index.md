Title: Set up your CLI
---
Text:

You need to know the following information in order to interact with CloudAPI:

* `SDC_ACCOUNT`: Your username.  The login you use for SDC.
* `SDC_USER`: The account subuser when you are using
  [Role Based Access Control](#rbac-users-roles-policies).
* `SDC_URL`: The URL of the CloudAPI endpoint.
* `SDC_KEY_ID`: Fingerprint for the key you uploaded to SmartDC through portal.

An example for `SDC_URL` is `https://us-west-1.api.joyentcloud.com`.  Each
datacenter in a cloud has its own CloudAPI endpoint; a different cloud that uses
SmartDataCenter would have a different URL.

In this document, we'll use `api.example.com` as the `SDC_URL` endpoint; please
replace it with the URL of your DC(s).  Note that CloudAPI always uses secure
HTTP, which means that the endpoint URL must begin with `https`.

You can quickly get your key fingerprint for `SDC_KEY_ID` by running:

    $ ssh-keygen -l -f ~/.ssh/id_rsa.pub | awk '{print $2}' | tr -d '\n'

where you obviously replace `~/.ssh/id_rsa.pub` with the path to the public key
you want to use for signing requests.

