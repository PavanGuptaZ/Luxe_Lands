import bcrypt from 'bcrypt';
import jwt, { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken';
import UserModal from '../models/userModal'
import { RequestHandler, Response } from 'express';
import asyncErrorHandler from '../utils/asyncErrorHandler';
import AuthenticatedRequest from '../interfaces/request';


export const Register: RequestHandler = asyncErrorHandler(async (req, res, next) => {
    let { name, email, password, country, age } = req.body

    if (!name || !email || !password || !country || !age) {
        return res.status(404).json({ status: 'error', message: "all Fields are Required" })
    }

    let isExist = await UserModal.findOne({ email }).lean()
    if (isExist) {
        return res.status(409).send({ status: 'error', message: email + " is already Register" })
    }
    const hashPassword = await bcrypt.hash(password, 10)

    let newUser = new UserModal({ name, email, password: hashPassword, country, age })
    await newUser.save()
    next()

})

export const Login: RequestHandler = asyncErrorHandler(async (req, res) => {
    let { email, password } = req.body

    if (!email && !password) {
        return res.status(404).json({ status: 'error', message: "all Fields are Required" })
    }

    let isExist = await UserModal.findOne({ email }).lean()

    if (!isExist) {
        return res.status(404).send({ status: 'error', message: email + " is not Register" })
    }

    const passwordCheck = await bcrypt.compare(password, isExist.password)
    if (!passwordCheck) {
        return res.status(404).send({ status: 'error', message: "Check Your credentials, Password is Wrong" })
    }

    const accessToken = jwt.sign({ email, _id: isExist._id }, process.env.ACCESS_TOKEN as Secret, { expiresIn: '1h' })

    const refreshToken = jwt.sign({ email, _id: isExist._id }, process.env.REFRESH_TOKEN as Secret, { expiresIn: '1d' })

    res.cookie(`REFRESH_TOKEN`, refreshToken, {
        sameSite: false,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
    })

    let { password: _delete, ...rem } = isExist

    res.status(200).json({ status: "success", user: { ...rem, token: accessToken } })
})

export const Refresh: RequestHandler = asyncErrorHandler(async (req, res) => {
    let { REFRESH_TOKEN } = req.cookies

    if (!REFRESH_TOKEN) {
        return res.status(404).json({ status: 'error', message: "Please Login With credentials" })
    }

    jwt.verify(REFRESH_TOKEN, process.env.REFRESH_TOKEN as Secret, async (err: VerifyErrors | null, data: JwtPayload | string | { email: string, _id: string } | undefined) => {
        if (err || typeof data !== 'object' || data !== null && !('email' in data)) return res.status(400).json({ status: 'error', message: "Please Login With credentials" })

        let { email, _id } = data
        let isExist = await UserModal.findOne({ email, _id }).lean()

        if (!isExist) {
            return res.status(404).send({ status: 'error', message: email + " is something Wrong" })
        }

        const accessToken = jwt.sign({ email, _id }, process.env.ACCESS_TOKEN as string, { expiresIn: '1h' })

        let { password: _delete, ...rem } = isExist

        res.status(200).json({ status: "success", user: { ...rem, token: accessToken } })
    })
})

export const updatedata = asyncErrorHandler(async (req: AuthenticatedRequest, res: Response) => {

    const role = Number(req.params.role);

    if (typeof role !== "number") return res.status(404).send({ status: 'error', message: "Invalid Role" });

    if (!req.user) {
        return res.status(401).json({ status: 'error', message: 'User not authenticated' });
    }

    const { email, _id } = req.user;

    let providedData = req.body as { name?: string, phone?: string | number, address?: string, profileIcon?: number, password?: string };

    if (!providedData?.password) {
        return res.status(404).send({ status: 'error', message: "Password is Required" })
    }

    let isExist = await UserModal.findOne({ email, _id }).lean()
    if (!isExist) {
        return res.status(404).send({ status: 'error', message: email + " is not Register" })
    }

    const passwordCheck = await bcrypt.compare(providedData?.password, isExist.password)
    if (!passwordCheck) {
        return res.status(404).send({ status: 'error', message: "Check Your credentials, Password is Wrong" })
    }

    delete providedData.password

    let updatedUser = await UserModal.updateOne({ _id: isExist._id }, {
        $set: {
            ...providedData
        }
    })

    res.status(200).json({ status: "success", updatedUser })
})

export const logout: RequestHandler = asyncErrorHandler(async (req, res) => {
    res.clearCookie(`REFRESH_TOKEN`, {
        sameSite: false,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
    })
    res.status(200).json({ status: 'ok', message: "Logout Successfully" })

})