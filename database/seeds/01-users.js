exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 2,
          username: "basil",
          password:"$2a$12$JGQMBreNeGG7XnEIrzKRku1cWoDPa8jSquKYgPxTSNd84lxc9BiPy",
          firstname: "nicholas",
          lastname: "patterson",
          contact: "55213",
          isAdmin: true
        },
        {
          id: 2,
          username: "nicleen",
          password: "n12345",
          firstname: "nicholas",
          lastname: "patterson",
          contact: "55213",
          isAdmin: false
        },
        {
          id: 3,
          username: "deAli",
          password: "d12345",
          firstname: "duraan",
          lastname: "ali",
          contact: "764779776",
          isAdmin: true
        },
        {
          id: 4,
          username: "kesp",
          password: "k12345",
          firstname: "keshwan",
          lastname: "proper",
          contact: "789990",
          isAdmin: false
        },
        {
          id: 5,
          username: "dbjohn",
          password: "bj12345",
          firstname: "dbgoin",
          lastname: "johnson",
          contact: "557890",
          isAdmin: true
        },
        {
          id: 6,
          username: "lettmen",
          password: "l12345",
          firstname: "letelly",
          lastname: "menesh",
          contact: "789980",
          isAdmin: true
        },
        {
          id: 7,
          username: "kim-ryan",
          password: "k12345",
          firstname: "kimberly",
          lastname: "ryan",
          contact: "55567789",
          isAdmin: false
        }
      ]);
    });
};
