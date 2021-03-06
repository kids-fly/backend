
exports.up = function(knex) {
    return knex.schema
      .createTable("users", table => {
        table.increments();
        table
          .string("username", 128)
          .notNullable()
          .unique();
        table.string("password", 128).notNullable();
        table.string("firstname", 128);
        table.string("lastname", 128);
        table.string("contact", 128).unique();
        table.string("image_url", 256);
        table.boolean("isAdmin");
      })
      .createTable("airports", table => {
        table.increments();
        table
          .string("airport_name")
          .notNullable()
          .unique();
        table.string("airport_location").notNullable();
      })
      .createTable("admins", table => {
        table.increments();
        table
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("airport_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("airports")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.text("admin_location").notNullable();
      })
      .createTable("flights", table => {
        // chheck time format in knex
        table.increments();
        table
          .integer("departure_airport_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("airports")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.datetime('departure_time', { useTz: false ,precision:6 }).defaultTo(knex.fn.now());
        table
          .integer("arrival_airport_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("airports")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.datetime('arrival_time', { precision: 6 , useTz: false}).defaultTo(knex.fn.now());
        table.string("airline_name",128);
      })
      .createTable("trips", table => {
        table.increments();
        table
          .integer("user_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("users")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("flight_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("flights")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("departure_admin_id")
          .unsigned()
          .references("id")
          .inTable("admins")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table
          .integer("arrival_admin_id")
          .unsigned()
          .references("id")
          .inTable("admins")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.integer("no_of_kids").unsigned();
        table.enu('no_of_assigned_admins',[1 ,2]);
        table.enu('admin_on',['departure','arrival','both'])
        table.boolean("trip_completed");
      })
      .createTable("arrivals", table => {
        table.increments();
        table
          .integer("user_trip_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("trips")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.text("user_location");
        table.boolean('isArriving');
        table
        .integer("airport_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("airports")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        // table.enu('hasArrived', ['departure_airport', 'arrival_airport'])
  
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("arrivals")
      .dropTableIfExists("trips")
      .dropTableIfExists("flights")
      .dropTableIfExists("admins")
      .dropTableIfExists("airports")
      .dropTableIfExists("users");
  };
  