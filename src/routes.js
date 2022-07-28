import { Router } from "express";

import auth from "./middlewares/auth";

import HelloController from "./controllers/HelloControllrs";
import RespositoriesController from "./controllers/RespositoriesController";
import SessionsController from "./controllers/SessionsController";
import UsersController from "./controllers/UsersController";

const routes = new Router();

//controller público
routes.post("/sessions", SessionsController.create);
routes.get("/hello", HelloController.index);

//controller privado
routes.use(auth);

// RESTFull
routes.get("/users", UsersController.index);
routes.get("/users/:id", UsersController.show);
routes.post("/users", UsersController.create);
routes.put("/users/:id", UsersController.uptade);
routes.delete("/users/:id", UsersController.destroy);

routes.get("/users/:user_id/repositories", RespositoriesController.index);
routes.post("/users/:user_id/repositories", RespositoriesController.create);
routes.delete("/users/:user_id/repositories/:id", RespositoriesController.destroy);

export default routes;