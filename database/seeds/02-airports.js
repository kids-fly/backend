
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('airports').del()
    .then(function () {
      // Inserts seed entries
      return knex('airports').insert([
        {id: 1, airport_name: 'MMH Anternational Airport', airport_location:'Lagos'},
        {id: 2, airport_name: 'JFK Airport',airport_location:'Washington DC'}
      ]);
    });
};
