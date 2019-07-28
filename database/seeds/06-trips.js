exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("trips")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("trips").insert([
        {
          id: 1,
          user_id: 1,
          flight_id: 2,
          admin_id: 1,
          no_of_kids: 3,
          isArrived: false
        },
        {
          id: 2,
          user_id: 2,
          flight_id: 2,
          admin_id: 3,
          no_of_kids: 2,
          isArrived: false
        },
        {
          id: 3,
          user_id: 7,
          flight_id: 3,
          admin_id: 2,
          no_of_kids: 1,
          isArrived: true
        }
      ]);
    });
};
