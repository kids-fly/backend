exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("arrivals")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("arrivals").insert([
        { id: 1, user_trip_id: 3, user_location: "Right Wing MMH Airport", isArriving:false, airport_id:1 },
        { id: 2, user_trip_id: 2, user_location: " The Land room", isArriving:true , airport_id:2},
        { id: 3, user_trip_id: 1, user_location: "Left Wing MMH Airport", isArriving:true ,airport_id:1},
      ]);
    });
};
