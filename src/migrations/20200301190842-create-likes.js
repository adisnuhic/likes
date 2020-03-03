'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Likes', {
      user_id: {
        type: Sequelize.INTEGER
      },
      follower_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        
      }
    }).then(() => queryInterface.addConstraint('Likes',['user_id'],{
      type: 'foreign key',
      name: 'likes_fkey_user_id',
      references:{
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })).then(() => queryInterface.addConstraint('Likes',['follower_id'],{
      type: 'foreign key',
      name: 'likes_fkey_follower_id',
      references:{
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })).then(() => queryInterface.addConstraint('Likes',['user_id', 'follower_id'], {
      type:'primary key',
      name: 'likes_pkey_user_id_follower_id'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  }
};