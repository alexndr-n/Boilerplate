'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      first_name: 'Alejandro',
      last_name: 'Nieto',
      email: 'ale.nieto97@gmail.com',
      role: 'admin',
      password: '$2b$10$8fA0WWNrqMQMPPtN40g65.D3VDg71JLVcMJDpCPMLj6XmD2w0W/0K',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      first_name: "Cullin",
      last_name: "McGrath",
      email: "cullin@twentyxtech.com",
      role: "admin",
      password: "$2b$08$LVeajuBiNVyaBXwljklxDuPAq1gsRlchnHlWPMsiJePtOPH1y.VEa",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});

  }
};
