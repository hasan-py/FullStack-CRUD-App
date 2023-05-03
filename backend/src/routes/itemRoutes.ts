import { Router } from "express";
import { ItemController } from "../controller";
import {
  idParamValidation,
  newItemValidation,
  updateItemValidation,
} from "../validations";

export class ItemRoutes {
  router: Router;
  public itemController: ItemController = new ItemController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    const { itemList, newItem, updateItem, deleteItem, itemById } =
      this.itemController;

    this.router.get(`/list`, itemList);
    this.router.get(`/get/:id`, idParamValidation, itemById);
    this.router.post("/new", newItemValidation, newItem);
    this.router.put(`/update/:id`, updateItemValidation, updateItem);
    this.router.delete(`/delete/:id`, idParamValidation, deleteItem);
  }
}
