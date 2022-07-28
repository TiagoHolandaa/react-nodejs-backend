class HelloController {

    async index(req, res) {
       return res.json({hello: "joabe viado"});
    }
}

export default new HelloController();