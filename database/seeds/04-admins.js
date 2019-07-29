exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("admins")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("admins").insert([
        {
          id: 1,
          user_id: 3,
          airport_id: 1,
          admin_location: "Left Wing, fMMH Airport"
        },
        {
          id: 2,
          user_id: 5,
          airport_id: 2,
          admin_location: "The terrace lounge"
        },
        { id: 3, user_id: 6, airport_id: 1, admin_location: "Suites" }
      ]);
    });
};
