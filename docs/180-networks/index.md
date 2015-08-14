Title: Networks
---
Text:


CloudAPI provides a way to get details on public and customer-specific networks
in a datacenter. This also includes all of the networks available in your
fabric.

||uuid||String||Unique identifier for this network||
||name||String||The network name||
||public||Boolean||Whether this a public or private (rfc1918) network||
||fabric||Boolean||Whether this network is created on a fabric||
||description||String||Description of this network (optional)||
||subnet||String||A CIDR formatted string that describes the network||
||provision_start_ip||String||The first IP on the network that may be assigned||
||provision_end_ip||String||The last IP on the network that may be assigned||
||gateway||String||Optional Gateway IP address||
||resolvers||String||Optional Resolver IP addresses||
||routes||Routes Object||Optional Static routes for hosts on this network||


