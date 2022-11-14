import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Actors} from '../models';
import {ActorsRepository, MoviesRepository} from '../repositories';
import {CustomResponse, CustomResponseSchema} from '../utils/custom-schema';

export class ActorsController {
  constructor(
    @repository(ActorsRepository)
    public actorsRepository: ActorsRepository,
    @repository(MoviesRepository)
    public moviesRepository: MoviesRepository,
  ) {}

  @post('/actors')
  @response(200, {
    description: 'Actors model instance',
    content: {'application/json': {schema: getModelSchemaRef(Actors)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Actors, {
            title: 'NewActors',
            exclude: ['id'],
          }),
        },
      },
    })
    actors: Omit<Actors, 'id'>,
  ): Promise<Actors> {
    return this.actorsRepository.create(actors);
  }

  @get('/actors')
  @response(200, {
    description: 'Array of Actors model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Actors, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Actors) filter?: Filter<Actors>): Promise<Actors[]> {
    return this.actorsRepository.find(filter);
  }

  @get('/actors/{id}')
  @response(200, {
    description: 'Actors model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Actors, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Actors, {exclude: 'where'})
    filter?: FilterExcludingWhere<Actors>,
  ): Promise<Actors> {
    return this.actorsRepository.findById(id, filter);
  }

  @put('/actors/{id}')
  @response(204, {
    description: 'Actors PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() actors: Actors,
  ): Promise<void> {
    await this.actorsRepository.replaceById(id, actors);
  }

  @del('/actors/{id}')
  @response(204, {
    description: 'Actors DELETE success',
    content: {'application/json': {schema: CustomResponseSchema}},
  })
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<CustomResponse<{}>> {
    try {
      const {count} = await this.moviesRepository.count({
        actorsId: id,
      });
      if (count > 0) {
        return {
          success: false,
          data: null,
          message: `This actor can't de delete, as he/she had been cast in a movie. `,
        };
      } else {
        await this.actorsRepository.deleteById(id);
        return {
          success: true,
          data: id,
          message: 'Actor deleted successfully.',
        };
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error ? error.message : 'Deleting actor failed.',
      };
    }
  }
}
