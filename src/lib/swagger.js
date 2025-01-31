// src/lib/swagger.js
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routesPath = join(__dirname, '..', 'routes');
const authRoutePath = join(routesPath, 'auth.route.js');
const gadgetsRoutePath = join(routesPath, 'gadgets.route.js');

console.log('Looking for routes in:', routesPath);
console.log('Auth route path:', authRoutePath);
console.log('Gadgets route path:', gadgetsRoutePath);

if (fs.existsSync(routesPath)) {
  console.log('Files in routes directory:', fs.readdirSync(routesPath));
} else {
  console.log('Routes directory not found!');
}

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IMF Gadget API',
      version: '1.0.0',
      description: 'API for managing IMF gadgets',
    },
    servers: [{ url: 'http://localhost:5000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [authRoutePath, gadgetsRoutePath],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
