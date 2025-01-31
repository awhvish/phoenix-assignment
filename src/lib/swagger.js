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

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IMF Gadget API',
      version: '1.0.0',
      description: 'API for managing IMF gadgets with JWT cookie authentication',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' ? 'https://your-production-url' : 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'jwt',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
        Gadget: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            status: {
              type: 'string',
              enum: ['Available', 'Deployed', 'Destroyed', 'Decommissioned'],
            },
            success_probability: {
              type: 'number',
              format: 'float',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            decommissionedAt: {
              type: 'string',
              format: 'date-time',
            },
            destroyedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Status: {
          type: 'string',
          enum: ['Available', 'Deployed', 'Destroyed', 'Decommissioned'],
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: [authRoutePath, gadgetsRoutePath],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerUiOptions = {
  explorer: true,
  swaggerOptions: {
    persistAuthorization: true,
    withCredentials: true,
    displayRequestDuration: true,
    filter: true,
  },
  customSiteTitle: 'Phoenix: API Documentation',
};

const setupSwagger = (app) => {
  app.use('/api-docs', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerSpec, swaggerUiOptions));

  app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

export default setupSwagger;
