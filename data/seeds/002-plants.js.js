
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('plants').del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        { id: 1, nickName: 'rose', species: "flower", h2oFrequency: "every day", user_id: 1 },
        { id: 2, nickName: 'daisy', species: "flower", h2oFrequency: "every week", user_id: 2 },
        { id: 3, nickName: 'tulip', species: "flower", h2oFrequency: "every month", user_id: 3 }
      ]);
    });
};
