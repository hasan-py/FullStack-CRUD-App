import { Router } from "express";
import { AuthController } from "./authController";

export class AuthRoutes {
  router: Router;
  public authController: AuthController = new AuthController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    const { loginController, createUserIfNotExists, checkUserCreated } =
      this.authController;

    this.router.post("/login", loginController);
    this.router.post(`/create-user`, createUserIfNotExists);
    this.router.get("/check-user-exist", checkUserCreated);
  }
}
