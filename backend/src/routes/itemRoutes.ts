import { Router } from "express";
import { ItemController } from "../controller/itemController";

export class ItemRoutes {
  router: Router;
  public crudController: ItemController = new ItemController();

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
