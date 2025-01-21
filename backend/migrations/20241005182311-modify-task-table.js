'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tasks', 'priority', {
      type: Sequelize.ENUM('Low', 'Medium', 'High'),
      defaultValue: 'Medium',
    });

    await queryInterface.addColumn('Tasks', 'dueDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Tasks', 'status', {
      type: Sequelize.ENUM('Pending', 'In Progress', 'Completed', 'Overdue'),
      defaultValue: 'Pending',
    });

    await queryInterface.addColumn('Tasks', 'recurring', {
      type: Sequelize.ENUM('None', 'Daily', 'Weekly', 'Monthly'),
      defaultValue: 'None',
    });

    await queryInterface.addColumn('Tasks', 'attachments', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('Tasks', 'completionDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Tasks', 'progress', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });

    // to ensure the categoryId references the Categories table
    await queryInterface.changeColumn('Tasks', 'categoryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id',
      },
    });

    // ensure userId references the Users table
    await queryInterface.changeColumn('Tasks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
  
    // await queryInterface.removeColumn('Tasks', 'priority');
    // await queryInterface.removeColumn('Tasks', 'dueDate');
    // await queryInterface.removeColumn('Tasks', 'status');
    // await queryInterface.removeColumn('Tasks', 'recurring');
    // await queryInterface.removeColumn('Tasks', 'attachments');
    // await queryInterface.removeColumn('Tasks', 'completionDate');
    // await queryInterface.removeColumn('Tasks', 'progress');

    await queryInterface.changeColumn('Tasks', 'categoryId', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.changeColumn('Tasks', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
