import { object } from 'joi';
import { Schema } from 'mongoose';

export default {
  openapi: '3.0.1',
  info: {
    description: 'This is a simple example NodeJS Blog API project with Typescript',
    version: '1.0.0',
    title: 'Blog API',
    contact: {
      name: 'menoIy',
      email: 'menoly.code@gmail.com'
    }
  },

  servers: [{ url: 'http/localhost:5000/api/v1', description: 'Local server' }],
  paths: {
    '/users': {
      post: {
        tags: ['User operations'],
        description: 'Create new user',
        operationId: 'CreateUser',
        parameters: [
          {
            name: 'user',
            in: 'body',
            description: 'create new user',
            schema: { $ref: '#/schemas/createUser' }
          }
        ],
        response: {
          '200': {
            description: 'new user is created'
          }
        }
      }
    },
    '/posts': {},
    '/comments': {}
  },
  schemas: {
    createUser: {
      type: object,
      properties: {
        username: { type: 'string', required: true },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string' }
      },
      example: {
        username: 'username',
        firstname: 'firstName',
        lastName: 'lastName',
        email: 'email@email.com',
        password: 'Password1'
      }
    }
  }
};
