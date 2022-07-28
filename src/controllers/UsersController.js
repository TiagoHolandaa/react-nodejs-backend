import User from "../models/User";

import { createPasswordHash } from "../services/auth";

class UsersController {

    async index(req, res) {
       try {
        const users = await User.find();
        return res.json(users)
       } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error."})
       }
    }

    async show(req, res) {
       try {
        const {id} = req.params;
        const user =  await User.findById(id);

        if (!user) {
            return res.status(404).json();
        }

        return res.json(user)
       } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error."})
       }
    }

    async create(req, res) {
       try {
        const {email, password} = req.body
        const user =  await User.findOne({email})

        if (user) {
            return res
                .status(422)
                .json({message: `User ${email} already exists.`});
        }

        //criptografia o password
        const encrytedPassword = await createPasswordHash(password)

        const newUser = await User.create({
            email,
            password: encrytedPassword
        });

        return res.status(201).json(newUser)
       } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error."})
       }
    }

    async uptade(req, res) {
       try {
        const {id} = req.params;
        const {email, password} = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json();
        }

        const encrytedPassword = await createPasswordHash(password)

        await user.updateOne({
            email,
            password: encrytedPassword
        });

        return res.status(200).json({user: user});
       } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error."})
       }
    }

    async destroy(req, res) {
       try {
        const {id} = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json();
        }

        await user.deleteOne();

        return res.status(200).json({message: "deleted."})
       } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error."})
       }
    }
}

export default new UsersController();