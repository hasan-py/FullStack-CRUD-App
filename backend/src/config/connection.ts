import mongoose from "mongoose";
import { MONGODB_URI_LOCAL } from "./secret";
mongoose.set("strictQuery", true); // [MONGOOSE] DeprecationWarning:

export const ConnectMongoDB = () => {
  if (!MONGODB_URI_LOCAL) {
    console.log(
      "🚀 ~ file: mongoDbConnection.ts:9 ~ ConnectMongoDB ~ MONGODB_URI_CLOUD",
      "~ No mongodb connection string found. Please set MONGODB_URI_LOCAL or MONGODB_URI_CLOUD environment variable."
    );
    process.exit(1);
  }

  // Established the connection details
  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("Mongo Connection Established 🚀");
  });
  connection.on("reconnected", () => {
    console.log("Mongo Connection Reestablished ⚠️");
  });
  connection.on("disconnected", () => {
    console.log("Mongo Connection Disconnected ⚠️");
    console.log("Trying to reconnect to Mongo ...");

    setTimeout(() => {
      mongoose.connect(MONGODB_URI_LOCAL, {
        keepAlive: true,
        socketTimeoutMS: 3000,
        connectTimeoutMS: 3000,
      });
    }, 3000);
  });

  connection.on("close", () => {
    console.log("Mongo Connection Closed");
  });

  connection.on("error", (error: Error) => {
    console.log(
      "🚀 ~ file: mongoDbConnection.ts:46 ~ connection.on ~ error",
      error
    );
  });

  // Connecting to Mongo
  const run = async () => {
    await mongoose.connect(MONGODB_URI_LOCAL, {
      keepAlive: true,
    });
  };
  run().catch((error) => {
    console.log("error", JSON.stringify(error, null, 2));
    console.log(
      "🚀 ~ file: mongoDbConnection.ts:59 ~ ConnectMongoDB ~ error",
      error
    );
  });
};
