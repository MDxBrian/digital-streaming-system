import {SchemaObject} from '@loopback/openapi-v3';

// API Response Schema
export const CustomResponseSchema: SchemaObject = {
  type: 'object',
  title: 'Response',
  'x-ts-type': 'Response',
  properties: {
    success: {
      type: 'boolean',
    },
    data: {
      type: 'object',
    },
    message: {
      type: 'string',
    },
  },
};

export type CustomResponse<T> = {
  success: boolean;
  data?: T | T[] | null;
  message?: string;
};