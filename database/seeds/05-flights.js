exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("flights")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("flights").insert([
        {
          id: 1,
          departure_airport_id: 1,
          departure_time: "08-09-2019 15:03",
          arrival_airport_id: 2,
          arrival_time: "08-09-2019 18:03",
          airline_name: "Emirates"
        },
        {
          id: 2,
          departure_airport_id: 1,
          departure_time: "09_09_2019 12:00",
          arrival_airport_id: 2,
          arrival_time: "09_09_2019 16:00",
          airline_name: "Airpeace"
        },
        {
          id: 3,
          departure_airport_id: 2,
          departure_time: "09_09_2019 13:00",
          arrival_airport_id: 1,
          arrival_time: "10_09_2019 09:00",
          airline_name: "Emirates"
        }
      ]);
    });
};
