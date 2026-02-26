import "reflect-metadata";
import { Tokens } from "./tokens";
import { mapClass, mapValue } from "./utils";
import { serverConfigs } from "../config/server-config";

mapValue(Tokens.serverConfig, serverConfigs);
