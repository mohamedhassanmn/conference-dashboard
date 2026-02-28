export const serverConfigs = {
  port: process.env.PORT || 4500,
  keepAliveTimeout: 120000,
};

export type ServerConfigType = typeof serverConfigs;
