exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("arrivals")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("arrivals").insert([
        { id: 1, user_trip_id: 3, user_location: "Right Wing MMH Airport" }
      ]);
    });
};
