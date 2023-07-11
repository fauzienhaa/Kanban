import express from "express";
import {
    createLabel,
    deleteLabel,
    getLabel,
    getLabelById,
    getLabelByProjectId,
    updateLabel
} from "../controllers/Label.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/label', verifyUser, getLabel)
router.get('/label/:id', verifyUser, getLabelById)
router.post('/label', verifyUser, createLabel)
router.patch('/label/:id', verifyUser, updateLabel)
router.delete('/label/:id', verifyUser, deleteLabel)

export default router;