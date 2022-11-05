import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Movies extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  imageUrl: string;

  @property({
    type: 'number',
    required: true,
  })
  budgetCost: number;

  @property({
    type: 'string',
    required: true,
  })
  yearOfRelease: string;

  @property({
    type: 'string',
    required: true,
  })
  runningTime: string;

  @property({
    type: 'string',
    required: true,
  })
  director: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  actorsId?: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Movies>) {
    super(data);
  }
}

export interface MoviesRelations {
  // describe navigational properties here
}

export type MoviesWithRelations = Movies & MoviesRelations;
