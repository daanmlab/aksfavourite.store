import { getDatabaseUrl } from "./src/config";

export default {
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "bun prisma/seed.ts",
  },
  datasource: {
    url: getDatabaseUrl(),
  },
};
