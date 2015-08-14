Title: Firewall Rule Syntax
—
Text:

In general, the firewall rule is composed of the following pieces:

    FROM <target a> TO <target b> <action> <protocol> <port>

where `target` can be one of `wildcard`, `ip`, `subnet`, `tag` or `vm`, `action`
is either `ALLOW` or `BLOCK`, `protocol` will be one of `tcp`, `udp` and `icmp`,
and `port` is a valid port number.

The rule should have `tag` or `vm` in the FROM or TO target. The following are some possibilities:

### Allow incoming http traffic to a VM:

    {
        "enabled": true,
        "rule": "FROM any TO vm 0abeae82-c040-4080-ac60-b60d3e3890a7 ALLOW tcp port 80"
    }

### Block outgoing SMTP traffic from a VM to a subnet:

    {
        "enabled": true,
        "rule": "FROM vm 0abeae82-c040-4080-ac60-b60d3e3890a7 TO subnet 10.99.99.0/24 BLOCK tcp port 25"
    }

### Allow an IP HTTP and HTTPS access to all VMs tagged www or testwww:

    {
        "enabled": true,
        "rule": "FROM ip 10.99.99.7 TO (tag www OR tag testwww) ALLOW tcp (port 80 AND port 443)"
    }

### Allow syslog traffic from VMs tagged with group=web to VMs tagged with group=mon:

    {
        "enabled": true,
        "rule": "FROM tag group=www TO tag group=mon ALLOW udp port 514"
    }


