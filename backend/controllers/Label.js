import Label from "../models/LabelModel.js";
import Tasks from "../models/TasksModel.js";

export const getLabel = async (req, res) =>{
    try {
        const response = await Label.findAll({
            include: {
                model: Tasks,
                attributes: ['id', 'judul']
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getLabelByProjectId = async (req, res) => {
    try {
        const response = await Label.findAll({
            where: {
                projectId: req.params.id,
            },
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

export const getLabelById = async (req, res) =>{
    try {
        const response = await Label.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createLabel = async (req, res) =>{
    const {name, color, projectId} = req.body;
    try {
        await Label.create({
            name: name,
            color: color,
            projectId: projectId,
        });
        res.status(201).json({msg: "Label created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateLabel = async (req, res) =>{
    const label = await Label.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!label) return res.status(404).json({msg: 'No Label Available'})
    const {name, color} = req.body;
    try {
        await Label.update({
            name: name,
            color: color,
        });
        res.status(201).json({msg: "Label updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteLabel = async (req, res) =>{
    const label = await Label.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!label) return res.status(404).json({msg: 'No Label Available'})
    try {
        await Label.destroy({
            where:{
                id: label.id
            }
        });
        res.status(200).json({msg: "Label deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}