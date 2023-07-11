import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import Label from "./LabelModel.js";
import Tasks from "./TasksModel.js";

const { DataTypes } = Sequelize;

const TaskLabel = db.define('tasklabel',{
    labelId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    taskId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
})

Label.belongsToMany(Tasks, {through: TaskLabel, foreignKey: 'labelId'})
Tasks.belongsToMany(Label, {through: TaskLabel, foreignKey: 'taskId'})

export default TaskLabel;