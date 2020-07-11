const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            password: DataTypes.STRING,
            email: DataTypes.STRING,
            islogged: DataTypes.BOOLEAN
        }, {
            sequelize,
            hooks: {
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                },
            },
        })
    }

    static associate(models) {
        this.hasMany(models.Address, { foreignKey: 'user_id', as: 'address' });
        this.belongsToMany(models.Course, { foreignKey: 'user_id', through: 'user_courses', as: 'courses'});
    }

}

module.exports = User;