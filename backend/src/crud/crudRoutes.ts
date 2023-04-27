import { Router } from "express";
import { CURDController } from "./crudController";

export class CRUDRoutes {
  router: Router;
  public crudController: CURDController = new CURDController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    const { list, newData, updateData, deleteData, dataById } =
      this.crudController;

    this.router.get(`/list`, list);
    this.router.post("/new", newData);
    this.router.get(`/get/:id`, dataById);
    this.router.put(`/update/:id`, updateData);
    this.router.delete(`/delete/:id`, deleteData);
  }
}
