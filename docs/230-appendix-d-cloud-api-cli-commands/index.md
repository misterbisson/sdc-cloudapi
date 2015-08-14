Title: Appendix D: CloudAPI CLI Commands
---
Text: 


||**Command**||**Description**||
||[sdc-addmachinetags](#AddMachineTags)||Allows you to add additional tags, other than those set at provisioning time.||
||[sdc-chmod](#SetRoleTags)||Add role tags to CloudAPI resources.||
||[sdc-createfirewallrule](#CreateFirewallRule)||Add a new firewall rule.||
||[sdc-createimagefrommachine](#CreateImageFromMachine)||Create a new custom image from a machine.||
||[sdc-createinstrumentation](#CreateInstrumentation)||Creates an instrumentation.||
||[sdc-createkey](#CreateKey)||Uploads a new OpenSSH key to SmartDataCenter.||
||[sdc-createmachine](#CreateMachine)||Allows you to provision a machine.||
||[sdc-createmachinesnapshot](#CreateMachineSnapshot)||Allows you to take a snapshot of a machine.||
||[sdc-deletefirewallrule](#DeleteFirewallRule)||Removes a given firewall rule.||
||[sdc-deleteimage](#DeleteImage)||Delete a private image.||
||[sdc-deleteinstrumentation](#DeleteInstrumentation)||Destroys an instrumentation.||
||[sdc-deletekey](#DeleteKey)||Deletes an SSH key by name.||
||[sdc-deletemachine](#DeleteMachine)||Allows you to completely destroy a machine.||
||[sdc-deletemachinemetadata](#DeleteMachineMetadata)||Deletes a single metadata key from this machine.||
||[sdc-deletemachinesnapshot](#DeleteMachineSnapshot)||Deletes the specified snapshot of a machine.||
||[sdc-deletemachinetag](#DeleteMachineTag)||Deletes a single tag from this machine.||
||[sdc-describeanalytics](#DescribeAnalytics)||Retrieves the "schema" for instrumentations that can be created using the analytics endpoint.||
||[sdc-disablefirewallrule](#DisableFirewallRule)||Disable an enabled firewall rule.||
||[sdc-disablemachinefirewall](#DisableMachineFirewall)||Completely disable the firewall on a machine.||
||[sdc-enablefirewallrule](#EnableFirewallRule)||Enable a disabled firewall rule.||
||[sdc-enablemachinefirewall](#EnableMachineFirewall)||Enable the firewall on a machine.||
||[sdc-exportimage](#ExportImage)||Export an image to Manta.||
||[sdc-fabric](#Fabrics)||Administer fabric networks and VLANs.||
||[sdc-getaccount ](#GetAccount)||Gets details about your account.||
||[sdc-getdataset](#GetDataset)||Gets an individual dataset by id. (deprecated)||
||[sdc-getfirewallrule](#GetFirewallRule)||Get details about a specific firewall rule.||
||[sdc-getimage](#GetImage)||Gets an individual image by id.||
||[sdc-getinstrumentation](#GetInstrumentation)||Retrieves the configuration for an instrumentation.||
||[sdc-getkey](#GetKey)||Retrieves an individual key record.||
||[sdc-getmachine](#GetMachine)||Gets the details for an individual machine.||
||[sdc-getmachineaudit](#MachineAudit)||Get a historical list of actions performed on a machine.||
||[sdc-getmachinemetadata](#GetMachineMetadata)||Returns the complete set of metadata associated with this machine.||
||[sdc-getmachinesnapshot](#GetMachineSnapshot)||Gets the state of the named snapshot.||
||[sdc-getmachinetag](#GetMachineTag)||Returns the value for a single tag on this machine.||
||[sdc-getnetwork](#GetNetwork)||Gets a network by the given id.||
||[sdc-getpackage](#GetPackage)||Gets a package by name.||
||sdc-info||List of role-tags assigned to a given resource.||
||[sdc-listdatacenters](#ListDatacenters)||Provides a list of all datacenters this cloud is aware of.||
||[sdc-listdatasets](#ListDatasets)||Provides a list of datasets available in this datacenter. (deprecated)||
||sdc-listfirewallrulemachines||||
||[sdc-listfirewallrules](#ListFirewallRules)||List all firewall rules applying to this account.||
||[sdc-listimages](#ListImages)||Provides a list of images available in this datacenter.||
||[sdc-listinstrumentations](#ListInstrumentations)||Retrieves all currently created instrumentations.||
||[sdc-listkeys](#ListKeys)||Lists all public keys we have on record for the specified account.||
||sdc-listmachinefirewallrules||List firewall rules applying to a specific machine.||
||[sdc-listmachines](#ListMachines)||Lists all machines on an account.||
||[sdc-listmachinesnapshots](#ListMachineSnapshots)||Lists all snapshots taken for a given machine.||
||[sdc-listmachinetags](#ListMachineTags)||Returns the complete set of tags associated with this machine.||
||[sdc-listnetworks](#ListNetworks)||Provides a list of networks available to the user in this datacenter.||
||[sdc-listpackages](#ListPackages)||Provides a list of packages available in this datacenter.||
||[sdc-policy](#Policies)||Add, list, update and remove policies.||
||[sdc-rebootmachine](#RebootMachine)||Allows you to 'reboot' a machine.||
||[sdc-renamemachine](#RenameMachine)||Rename a machine.||
||[sdc-replacemachinetags](#ReplaceMachineTags)||Replace all tags on a machine.||
||[sdc-resizemachine](#ResizeMachine)||Allows you to resize a SmartMachine.||
||[sdc-role](#Roles)||Add, list, update and remove roles.||
||[sdc-setup](#set-up-your-cli)||Sets up an account on a datacenter for use with this CLI.||
||[sdc-startmachine](#StartMachine)||Allows you to boot up a machine||
||[sdc-startmachinefromsnapshot](#StartMachineFromSnapshot)||Starts a stopped machine from the referenced snapshot.||
||[sdc-stopmachine](#StopMachine)||Allows you to shut down a machine.||
||[sdc-updateaccount](#UpdateAccount)||Change details of the current account.||
||[sdc-updatefirewallrule](#UpdateFirewallRule)||Change a firewall rule.||
||[sdc-updateimage](#UpdateImage)||Update metadata about an image.||
||[sdc-updatemachinemetadata](#UpdateMachineMetadata)||Allows you to update the metadata for a given machine.||
||[sdc-user](#Users)||Add, update and remove account users and their keys.||

