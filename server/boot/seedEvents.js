'use strict';

function createEvents(Event) {
  console.log(`creating Event records in datasource ${Event.dataSource.name}`);

  Event.findOrCreate({
      where: { name: "event1" }
    },
    {
      name: 'event1',
      referenceId: '1234',
  });

  Event.findOrCreate({
      where: { name: "event2" },
    },
    {
      name: 'event2',
      referenceId: '1234',
  });

  Event.findOrCreate({
      where: { name: "event3" },
    },
    {
      name: 'event3',
      referenceId: '5a8c71cb3b800d0001f9b146',
  });

  Event.findOrCreate({
      where: { name: "event4" },
    },
    {
      name: 'event4',
      referenceId: '5a8c71cb3b800d0001f9b146',
  });
}

module.exports = function(server) {
  const Event = server.models.Event;
  const datasourceName = Event.dataSource.name;

  if (datasourceName === 'localMongo') {
    createEvents(Event);
  } else if (datasourceName === 'localMySQL') {
    // need to auto-migrate mySQL database
    const localMySQL = server.dataSources.localMySQL;

    localMySQL.automigrate('Event', function(err) {
      if (err) {
        throw err;
        return;
      }

      console.log('\nMySQL: Auto-migrated table `Event`.');

      createEvents(Event);
    });
  }
};
