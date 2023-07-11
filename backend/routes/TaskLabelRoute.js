import express from "express";
import {
    createTaskLabel,
    deleteTaskLabel,
    getTaskLabel,
    // getTaskLabelById,
    updateTaskLabel
} from "../controllers/LabelOnTask.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/labeltask', verifyUser, getTaskLabel)
// router.get('/labeltask/:id', verifyUser, getTaskLabelById)
router.post('/labeltask', verifyUser, createTaskLabel)
router.patch('/labeltask/:id', verifyUser, updateTaskLabel)
router.delete('/labeltask/:id', verifyUser, deleteTaskLabel)

export default router;