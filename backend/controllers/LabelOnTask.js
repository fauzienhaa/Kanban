import TaskLabel from "../models/TaskLabelModel.js";
import Label from "../models/LabelModel.js";
import Tasks from "../models/TasksModel.js";

export const getTaskLabel = async (req, res) =>{
    try {
        const response = await TaskLabel.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

// export const getTaskLabelById = async (req, res) =>{
//     try {
//         const response = await TaskLabel.findOne({
//             where: {
//                 id: req.params.id
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

//api get data tasks == controller tasks.js
//api update tasks == controller tasks.js

export const createTaskLabel = async (req, res) =>{
    const tasklabel = await TaskLabel.findOne({
        where:{
            name: req.body.name
        }
    })
    const {name, color, projectId} = req.body;
    if(tasklabel) return res.status(400).json({msg: 'Name already exist!'})
    try {
        await TaskLabel.create({
            name: name,
            color: color,
            projectId: projectId,
        });
        res.status(201).json({msg: "Label created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateTaskLabel = async (req, res) =>{
    const tasklabel = await TaskLabel.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!tasklabel) return res.status(404).json({msg: 'No Label Available'})
    const {name, color} = req.body;
    try {
        await TaskLabel.update({
            name: name,
            color: color,
        });
        res.status(201).json({msg: "Label updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteTaskLabel = async (req, res) =>{
    const tasklabel = await TaskLabel.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!tasklabel) return res.status(404).json({msg: 'No Label Available'})
    try {
        await TaskLabel.destroy({
            where:{
                id: tasklabel.id
            }
        });
        res.status(200).json({msg: "Label deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}