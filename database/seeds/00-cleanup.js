const cleaner = require('knex-cleaner')
  // Deletes ALL existing entries
  exports.seed = function(knex) {
    // Deletes ALL existing entries
    return cleaner.clean(knex ,{
      ignoreTables:['knex_migrations','knex_migrations_lock']
    })
  
  };
  

