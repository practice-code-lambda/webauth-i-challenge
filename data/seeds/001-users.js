
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'larie', password: "123" },
        { id: 2, username: 'brandon', password: "456" },
        { id: 3, username: 'chris', password: "789" }
      ]);
    });
};
