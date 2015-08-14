Title: Polling machine audit
---
Text:

There are some cases where polling for machine state change will not work
because there won't be a state change for the requested action (e.g. "rename"),
or because the state change is short-lived thus making the transition easy to
miss (e.g. "reboot").

In such cases, consider polling a machine's historical of actions available
through a machine's [Machine Audit](#MachineAudit), wait for the desired
action to appear on that list, and check successfulness there.  Taking our
example from previous section, this is how we could check for a reboot:

    function checkMachineAction(id, action, time, cb) {
        return sdc.getMachineAudit(id, function (err, actions) {
            if (err) {
                return cb(err);
            }

            var acts = actions.filter(function (a) {
                return (a.action === action && (new Date(a.time) > time));
            });

            if (acts.length === 0) {
                return cb(null, false);
            }

            var act = acts[0];
            if (act.success !== 'yes') {
                return cb(action + ' failed');
            }

            return cb(null, true);  // success!
        }, true);
    }


    function waitForAction(id, action, time, cb) {
        console.log('Waiting for machine \'%s\' %s to complete',
                id, action);

        return checkMachineAction(id, action, time, function (err, ready) {
            if (err) {
                return cb(err);
            }

            if (!ready) {
                return setTimeout(function () {
                    waitForAction(id, action, time, cb);
                }, (process.env.POLL_INTERVAL || 2500));
            }
            return cb(null);
        });
    }

With this code, you can poll when a machine with a given uuid has rebooted by
doing:

    waitForAction(machine, 'reboot', (new Date()), function (err) {
        if (err) {
            // .. something failed
        } else {
            // ...all good, reboot happened successfully and machine is running
        }
    });


