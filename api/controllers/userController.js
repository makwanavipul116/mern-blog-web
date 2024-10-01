import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from '../models/userModel.js'

//update user
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    const user = await User.findById(req.params.userId);
    if (!user) return next(errorHandler(400, 'user Not Found'));

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username can only contain letters and numbers'));
        }
    }

    try {
        const userUpdate = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username || user.username,
                    password: req.body.password || user.password,
                    email: req.body.email || user.email,
                    profilePicture: req.body.profilePicture || user.profilePicture,
                },
            }, { new: true })

        const { password, ...rest } = userUpdate._doc
        res.status(200).json(rest)

    } catch (error) {
        next(error)
    }
}

//delete user
export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(400, 'you can delete only your own account'))
    }
    try {
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json("Account Deleted SuccessFuly")
    } catch (error) {
        next(error)
    }

}

//signOut
export const signOutUser = async (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('sognOut Successfully')
    } catch (error) {
        next(error)
    }
}

//getUsers
export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to see all users'));
    }

    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;

        const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });
    } catch (error) {
        next(error);
    }
}

//getUser
export const getUser = async (req, res, next) => {

    try {

        const user = await User.findById(req.params.userId)

        if (!user) {
            return next(errorHandler(403, 'user not found'));
        }

        const { password, ...rest } = user._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}