import {
  Filter,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Movies} from '../models';
import {MoviesRepository, ReviewsRepository} from '../repositories';
import {CustomResponse, CustomResponseSchema} from '../utils/custom-schema';
export class MoviesController {
  constructor(
    @repository(MoviesRepository)
    public moviesRepository: MoviesRepository,
    @repository(ReviewsRepository)
    public reviewsRepository: ReviewsRepository,
  ) {}

  @post('/movies')
  @response(200, {
    description: 'Movies model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movies)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movies, {
            title: 'NewMovies',
            exclude: ['id'],
          }),
        },
      },
    })
    movies: Omit<Movies, 'id'>,
  ): Promise<Movies> {
    return this.moviesRepository.create(movies);
  }

  @get('/movies')
  @response(200, {
    description: 'Array of Movies model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movies, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Movies) filter?: Filter<Movies>): Promise<Movies[]> {
    return this.moviesRepository.find(filter);
  }

  @get('/movies/{id}')
  @response(200, {
    description: 'Movies model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movies, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Movies, {exclude: 'where'})
    filter?: FilterExcludingWhere<Movies>,
  ): Promise<Movies> {
    return this.moviesRepository.findById(id, filter);
  }

  @put('/movies/{id}')
  @response(204, {
    description: 'Movies PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() movies: Movies,
  ): Promise<void> {
    await this.moviesRepository.replaceById(id, movies);
  }

  @del('/movies/{id}')
  @response(204, {
    description: 'Movies DELETE success',
    content: {'application/json': {schema: CustomResponseSchema}},
  })
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<CustomResponse<{}>> {
    try {
      
    await this.moviesRepository.deleteById(id);
    await this.reviewsRepository.deleteAll({movieId: id});
    return {
      success: true,
      data: id,
      message: 'Successfully deleted.',
    };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error ? error.message : 'Deleting movies failed.',
      };
    }
  }
}
