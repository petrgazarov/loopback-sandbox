# loopback-sandbox

A repository for reproducing [LoopBack community issues][wiki-issues].

[wiki-issues]: https://github.com/strongloop/loopback/wiki/Reporting-issues

### Steps to reproduce

Reproducing issue: https://github.com/strongloop/loopback/issues/3593

To reproduce, start the app and access explorer in the browser.
Select GET Events (`Event/Event_find` method) and click "Try it out!". Observe the 4 returned records and their
respective `referenceId` values. By constructing a simple where filter with this property, you can then try two different filters:

1. `{ "where": { "referenceId": "1234" } }` (works as expected, returns 2 records)
2. `{ "where": { "referenceId": "5a8c71cb3b800d0001f9b146" } }` (does not work, returns an empty array, despite there exist 2 records with this referenceId value)

The repo contains a working setup for 3 different database connectors:

1. memory
2. mongo
3. mysql

Mongo is the only connector where I could reproduce this issue. The other two connectors don't seem to have this problem.

### Behavior description

According to the [docs](https://github.com/strongloop/loopback-connector-mongodb#strictobjectidcoercion-flag), Loopback mongodb connector
automatically converts string properties that look like ids to ObjectID types.

1. With this default behavior, a simple where filter such as `{ "where": { "referenceId": "5a8c71cb3b800d0001f9b146" } }`
returns an empty array.

2. At the same time, a filter where referenceId does not have a default id format works as expected: `{ "where": { "referenceId": "1234" } }`.

### What to do

To avoid this default behavior, set `strictObjectIDCoercion` flag to `true` in model definition file, according to
[loopback-connector-mongodb docs](https://github.com/strongloop/loopback-connector-mongodb#strictobjectidcoercion-flag).
This prevents default coercion to ObjectID type and allows both examples of where filter above to work as expected.
