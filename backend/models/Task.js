module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Medium',
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('Pending', 'In Progress', 'Completed', 'Overdue'),
        defaultValue: 'Pending',
      },
      recurring: {
        type: DataTypes.ENUM('None', 'Daily', 'Weekly', 'Monthly'),
        defaultValue: 'None',
      },
      attachments: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      completionDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
  
    Task.associate = function(models) {
      Task.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };
  
    return Task;
  };
  