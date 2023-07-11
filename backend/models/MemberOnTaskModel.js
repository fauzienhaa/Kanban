import { Sequelize } from "sequelize";
import db from "../config/Database.js"
import Members from "./MembersModel.js";
import Tasks from "./TasksModel.js";

const { DataTypes } = Sequelize;

const MemberOnTask = db.define('memberontask',{
    memberId:{
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

Members.belongsToMany(Tasks, {through: MemberOnTask, foreignKey: 'memberId'})
Tasks.belongsToMany(Members, {through: MemberOnTask, foreignKey: 'taskId'})

export default MemberOnTask;