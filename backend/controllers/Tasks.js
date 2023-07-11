import Tasks from "../models/TasksModel.js";
import Label from "../models/LabelModel.js"
import TaskLabel from "../models/TaskLabelModel.js";
import MemberOnTask from "../models/MemberOnTaskModel.js"
import Members from "../models/MembersModel.js";
import Users from "../models/UsersModel.js";

export const getTasks = async (req, res) =>{
    try {
        const response = await Tasks.findAll(
            {
            include: [{
                model: Label,
                attributes: ['id', 'color', 'name', 'projectId']
            }, {
                model: Members,
                attributes: ['id'],
                include: {
                    model: Users,
                    attributes: ['id', 'name', 'role']}
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatePosition = async (req, res) => {
    const tasks = await Tasks.findOne({
        where: {
            id: req.params.id
        }
    });
    const {destinationId} = req.body;
    try {
        await Tasks.update({
            sectionId: destinationId
        },{
            where:{
                id: tasks.id
            }
        });
        res.status(200).json({msg: "task position updated"});
    } catch (error) {
        res.status(500).json({msg: error.response})
    }
}

export const getTasksById = async (req, res) =>{
    try {
        const response = await Tasks.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createTasks = async (req, res) =>{
    const tasks = await Tasks.findOne({
        where:{
            judul: req.body.name
        }
    })
    const {name, due, content, priority, sectionId} = req.body;
    if(tasks) return res.status(400).json({msg: 'Name already exist!'})
    try {
        await Tasks.create({
            judul: name,
            due: due,
            deskripsi: content,
            position: 1,
            bobot: priority,
            sectionId: sectionId
        });
        res.status(201).json({msg: "Task created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateTasks = async (req, res) =>{
    const tasks = await Tasks.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!tasks) return res.status(404).json({msg: 'No Task Available'})
    const {name, content, due, priority} = req.body;
    try {
        await Tasks.update({
            judul: name,
            deskripsi: content,
            due: due,
            bobot: priority
        },{
            where:{
                id: tasks.id
            }
        });
        res.status(201).json({msg: "Task updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteTasks = async (req, res) =>{
    const tasks = await Tasks.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!tasks) return res.status(404).json({msg: 'No Task Available'})
    try {
        await Tasks.destroy({
            where:{
                id: tasks.id
            }
        });
        res.status(200).json({msg: "Task deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const addLabel = async (req, res) =>{
    const {taskId, labelId} = req.body;
    try {
        await TaskLabel.create({
            taskId: [taskId],
            labelId: [labelId]
        });
        res.status(201).json({msg: "Label added"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const assignMember = async (req, res) =>{
    const {memberId, taskId} = req.body;
    try {
        await MemberOnTask.create({
            memberId: [memberId],
            taskId: [taskId]
        });
        res.status(201).json({msg: "Member added"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}