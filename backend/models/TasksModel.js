import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Members from "./MembersModel.js";
import Section from "./SectionModel.js";

const { DataTypes } = Sequelize;

const Tasks = db.define('tasks',{
    
    judul:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    due:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    deskripsi:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'description is not defined..',
        
    },
    completeAt:{
        type: DataTypes.DATE,
    },
    position:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    bobot:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    sectionId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
},{
    freezeTableName: true
})

Section.hasMany(Tasks);
Tasks.belongsTo(Section, {foreignKey: 'sectionId'})

export default Tasks;