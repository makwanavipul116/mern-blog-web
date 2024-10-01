import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/error.js'

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return next(errorHandler(400, 'All fields are required'));
        }

        const oldUser = await User.findOne({ email })
        if (oldUser) return next(errorHandler(400, 'User Already Sign Up this email Please Sign in'))

        const hashedPassword = bcryptjs.hashSync(password, 10)

        const user = new User({ username, email, password: hashedPassword })
        await user.save()
        res.status(200).json("User created SuccessFully")

    } catch (error) {
        next(error)
    }
}


export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password || email === '' || password === '') {
            return next(errorHandler(400, 'All fields Are required'))
        }

        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, 'User Not Found'))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(400, "Invalid password"))
        }

        const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_KEY)
        const { password: pass, ...rest } = validUser._doc

        res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)

    } catch (error) {
        next(error)
    }
}

export const google = async (req, res, next) => {
    try {
        const { name, email, googlePhotoURL } = req.body
        const user = await User.findOne({ email })
        if (user) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_KEY)
            const { password, ...rest } = user._doc
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                password: hashedPassword,
                email: email,
                profilePicture: googlePhotoURL
            })

            await newUser.save()
            const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_KEY)
            const { password, ...rest } = newUser._doc
            res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest)
        }
    } catch (error) {
        next(error)
    }
}