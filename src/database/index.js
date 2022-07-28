import mongoose from "mongoose";

import config from "../config/database";

class Database {
    constructor()  {
        this.connection = mongoose.connect(
            config.url,
            {
                useUnifiedTopology: true,
            }
        );
    }
}

export default new Database();