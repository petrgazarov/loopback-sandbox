'use strict';

module.exports = function(server) {
  // create dummy Event records to help demonstrate the bug

  server.models.Event.create({
    name: 'event1',
    objectId: '1234',
  });

  server.models.Event.create({
    name: 'event2',
    objectId: '1234',
  });

  server.models.Event.create({
    name: 'event3',
    objectId: '4567',
  });

  server.models.Event.create({
    name: 'event4',
    objectId: '4567',
  });
};
