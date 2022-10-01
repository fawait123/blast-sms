"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          name: "admin",
          username: "admin",
          email: "admin@admin.com",
          password:
            "8ee1c05c8e67234a96ef7e073801616378182bbb3fc31b34fa7b6e34a819287f0165bc9b8a3c56856ef83c149f377ac8e97ac230f3989e39e09fbcad4329746d.3afbb7c5776250e3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
