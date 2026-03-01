import "reflect-metadata";
import { container } from "tsyringe";
import "./src/container";
import { Tokens } from "./src/container/tokens";
import { ServerConfigType } from "./src/config/server-config";
import { server } from "./src/server";

require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

process.on("uncaughtException", (err) => {
  console.log("Encountered uncaughtException", { err });
});

process.on("unhandledRejection", (err) => {
  console.log("Encountered unhandledRejection", { err });
});

server(container).then(
  (app: { listen: (arg0: string | number, arg1: () => void) => any }) => {
    const config: ServerConfigType = container.resolve(Tokens.ServerConfig);

    const { port = process.env.PORT || 4500, keepAliveTimeout } = config;
    if (!port) {
      console.log("Port not found, Please check server-config.js");
      return;
    }

    const finalApp = app.listen(port, () => {
      finalApp.keepAliveTimeout = keepAliveTimeout;
      finalApp.on("close", () => {
        console.log("Server stopped successfully");
      });
      console.log(
        `Server started successfully, running on port: ${
          finalApp.address().port
        }.`,
      );
    });
  },
);
