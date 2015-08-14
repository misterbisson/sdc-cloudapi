Title: An important note about RBAC and certain reads after writes
---
Text:

CloudAPI uses replication and caching behind the scenes for user, role and
policy data. This implies that API reads after a write on these particular
objects can be up to several seconds out of date.

For example, when a user is created, cloudapi returns both a user object
(which is up to date), and a location header indicating where that new user
object actually lives. Following that location header may result in a 404 for
a short period.

As another example, if a policy is updated, the API call will return a policy
object (which is up to date), but GETing that URL again may temporarily return
a outdated object with old object details.

For the time being, please keep in mind that user, role and policy
creation/updates/deletion may potentially take several seconds to settle. They
have eventual consistency, not read-after-write.
