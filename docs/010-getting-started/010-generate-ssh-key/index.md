Title: Generate an SSH key
---
Text: 

The CloudAPI CLI does not allow you to use HTTP Basic Authentication, as that is
a weak security mechanism.  Furthermore, to interact with the provisioned
machines themselves, you need an SSH key to login.

If you haven't already generated an SSH key (required to use both SSH and HTTP
Signing), run the following command:

    $ ssh-keygen -b 2048 -t rsa

This will prompt you with a place to save the key.  You should probably just
accept the defaults, as many programs (SSH and SDC CLI) will first look for a
file called ~/.ssh/id_rsa.

