import propertyModal from '../models/propertyModal'
import { RequestHandler } from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import AuthenticatedRequest from '../interfaces/request';


export const Propertieslist: RequestHandler = asyncErrorHandler(async (req, res, next) => {
    const page = Number(req.params.page) || 1;
    const perPage = 10;
    const totalProperties = await propertyModal.countDocuments()
    const totalPages = Math.ceil(totalProperties / perPage);

    if (totalProperties < 1) {
        return res.status(404).json({ status: "error", message: "no posts are found" })
    }

    if (page > totalPages) {
        return res.status(404).json({ status: "error", message: `Page no - ${page} is not exist, ${totalPages} are only avaliable` })
    }
    let propertieslist

    if (totalProperties > perPage) {
        propertieslist = await propertyModal.find().skip((page - 1) * perPage).limit(perPage).lean().select({ name: 1, price: 1, id: 1 })
    } else {
        propertieslist = await propertyModal.find().lean().select({ name: 1, price: 1, id: 1 })
    }

    res.status(200).json({ status: "ok", properties: propertieslist, totalProperties, totalPages, page })
})

export const PropertiesById: RequestHandler = asyncErrorHandler(async (req, res, next) => {
    const propertyId = req.params.id;

    if (!propertyId || typeof propertyId !== "string") return res.status(404).json({ status: "error", message: "id is not valid" })

    let property = await propertyModal.findOne({ id: propertyId }).lean()

    if (!property) return res.status(404).json({ status: "error", message: "Property is not found" })

    res.status(200).json({ status: "ok", property })
})
