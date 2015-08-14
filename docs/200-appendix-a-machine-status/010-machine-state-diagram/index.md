Title: Machine State Diagram
---
Text:

The following is the state diagram for a machine:

<pre>
          POST /my/machines
                     |
                     |
                     V
          +----------------+
          |  Provisioning  |
          +----------------+
                     |
                     |
                     V
          +----------------+
    +---->|     Running    |
    |     +----------------+
    |                |
    |                | action=stop
    |                V
    |     +----------------+
    |     |    Stopping    |
    |     +----------------+
    |                |
    | action=start   |
    |                V
    |     +----------------+
    +---- |     Stopped    |
          +----------------+
                     |
                     | DELETE
                     V
          +----------------+
          |  Deleted       |---+
          +----------------+   |
                               |
                              ---
                               -

</pre>

At any point the state can also be `offline`, like if there is a network or
power event to the machine.

Since version 7.0 of this API, `failed` is used to signify a failed provision.


