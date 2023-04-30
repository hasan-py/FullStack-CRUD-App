import express from "express";
import cors from "cors";
import morgan from "morgan";
import { ConnectMongoDB } from "./config";
import { ItemRoutes, AuthRoutes } from "./routes";

class Server {
  public app: express.Application;

  // Initialization with middleware and mongo connection
  constructor() {
    this.app = express();
    this.config();
    ConnectMongoDB();
    this.routes();
  }

  // Middleware use's
  public config(): void {
    this.app.set("port", process.env.PORT || 8000);
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(morgan("tiny"));
    this.app.use(express.static("public"));
    this.app.use(
      cors({
        origin: ["http://localhost:5173/"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
      })
    );
    this.app.use(express.json());
  }

  public routes(): void {
    this.app.use("/api/auth", new AuthRoutes().router);
    this.app.use("/api/item", new ItemRoutes().router);

    this.app.get("/*", (req, res) => {
      res.status(404);
    });
  }

  // Run the Server
  public start(): void {
    this.app.listen(this.app.get("port"), () => {
      console.log(`API is running at http://localhost:${this.app.get("port")}`);
    });
  }
}

// Server Initialization
export const server = new Server();
server.start();
