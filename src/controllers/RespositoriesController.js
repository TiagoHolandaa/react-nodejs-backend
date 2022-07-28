import User from "../models/User";
import Repository from "../models/Repository";

class RepositoriesController {
    async index(req, res) {
        try {
            const {user_id} = req.params;
            const { q } = req.query

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            let query = {};

            if (q) {
                query = {url: { $regex: q } }
            }

            const repositories = await Repository.find({
                userId: user_id,
                ...query
            });
            
            return res.json(repositories);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Internal server error."})
        }
     }

     async create(req, res) {
        try {
            const {user_id} = req.params;
            const {name, url} = req.body;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json();
            }

            const repository = await Repository.findOne({
                userId: user_id,
                url
            })

            if (repository) {
                return res
                    .status(422)
                    .json({message: `Repository ${name} already exists.`})
            }

            const newRepository = await Repository.create({
                userId: user_id,
                name,
                url
            });

            return res.status(201).json(newRepository);
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Internal server error."})
        }
     }

     async destroy(req, res) {
        try {
            const {user_id, id} = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                return res.status(404).json({message: "user."});
            }

            const repository = await Repository.findOne({
                userId: user_id,
                _id: id,
            })

            if (!repository) {
                return res.status(404).json({message: "repo."});
            }

            await repository.deleteOne()

            return res.status(200).json({message: "deleted."});
        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Internal server error."})
        }
     }

}

export default new RepositoriesController();