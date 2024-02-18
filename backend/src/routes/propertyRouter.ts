import express from "express";
import verifyJWT from "../middleware/verifyJWT";
import { PropertiesById, Propertieslist } from "../controller/propertyController";

const router = express.Router()

router.use(verifyJWT)

router.get('/page/:page', Propertieslist)

router.get('/propertyBy/:id', PropertiesById)



export default router