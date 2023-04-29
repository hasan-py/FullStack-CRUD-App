import { Router } from "express";
import { AuthController } from "../controller";

export class AuthRoutes {
  router: Router;
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    const { loginController, createUser } = this.authController;

    this.router.post("/login", loginController);
    this.router.post(`/create-user`, createUser);
  }
}
