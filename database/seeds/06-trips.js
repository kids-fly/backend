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
          departure_admin_id: 1,
          arrival_admin_id: 2,
          no_of_kids: 3,
          no_of_assigned_admins:1,
          admin_on:'arrival',
          trip_completed: false
        },
        {
          id: 2,
          user_id: 2,
          flight_id: 2,
          departure_admin_id: 3,
          arrival_admin_id: 2,
          no_of_kids: 2,
          no_of_assigned_admins:1,
          admin_on:'departure',
          trip_completed: false
        },
        {
          id: 3,
          user_id: 7,
          flight_id: 3,
          departure_admin_id: 2,
          arrival_admin_id: 1,
          no_of_kids: 1,
          no_of_assigned_admins:2,
          admin_on:'both',
          trip_completed: true
        }
      ]);
    });
};
