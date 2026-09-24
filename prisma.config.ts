import { defineConfig } from 'prisma/config';

// Prisma v7+ configuration file
// Connection URLs are now defined here instead of in schema.prisma
// DATABASE_URL is read from environment variables automatically

export default defineConfig({
  schema: 'prisma/schema.prisma',
});

