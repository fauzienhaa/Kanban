import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Projects from "./ProjectsModel.js";

const { DataTypes } = Sequelize;

const Label = db.define('label',{
    color:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: 'Please pick the color!'
            },
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: {
                msg: 'Please enter name'
            },
            len: [3, 100]
        }
    },
    projectId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
},{
    freezeTableName: true
})

Projects.hasMany(Label);
Label.belongsTo(Projects, {foreignKey: 'projectId'})

export default Label;