import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  model,
  property,
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
  SchemaObject,
} from '@loopback/rest';

import {CustomResponse, CustomResponseSchema} from '../utils/custom-schema';
import {ReviewsRepository} from '../repositories';
// ---------- ADD IMPORTS FROM JWT AUTHENTICATION -------------
import {inject} from '@loopback/core';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {authenticate, TokenService} from '@loopback/authentication';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
// ----------------------------------

@model()
export class CreateUser extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const UserSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    roleId: {
      type: 'number',
    },
    active: {
      type: 'boolean',
    },
  },
};

export const RequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: UserSchema},
  },
};

export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class UsersController {
  constructor(
    @repository(UserRepository)
    public usersRepository: UserRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(ReviewsRepository)
    public reviewsRepository: ReviewsRepository,
  ) {}

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: CustomResponseSchema,
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreateUser, {
            title: 'User registration.',
          }),
        },
      },
    })
    newUserRequest: Omit<CreateUser, 'id'>,
  ): Promise<CustomResponse<{}>> {
    try {
      const emailExists = await this.userRepository.findOne({
        where: {email: newUserRequest.email},
      });

      if (emailExists) throw new Error('Email is already exist.');

      const password = await hash(newUserRequest.password, await genSalt());
      const savedUser = await this.userRepository.create(
        _.omit(newUserRequest, 'password'),
      );

      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      return {
        success: true,
        data: savedUser,
        message: 'Successfully registered',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error ? error.message : 'User registration failed.',
      };
    }
  }

  @post('/signin', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async signIn(
    @requestBody(RequestBody) credentials: Credentials,
  ): Promise<CustomResponse<{}>> {
    try {
      const root = await this.usersRepository.findOne({
        where: {email: credentials.email},
      });

      if (root && root.active !== true)
        throw new Error(
          'Your account is inactive, please kindly contact your administrator.',
        );

      const user = await this.userService.verifyCredentials(credentials);
      const userProfile = this.userService.convertToUserProfile(user);
      const token = await this.jwtService.generateToken(userProfile);

      return {
        success: true,
        data: token,
        message: 'Login successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error ? error.message : 'Login failed.',
      };
    }
  }

  @authenticate('jwt')
  @get('/whoami', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    loggedInUserProfile: UserProfile,
  ): Promise<string> {
    return loggedInUserProfile[securityId];
  }

  @post('/users')
  @response(200, {
    description: 'Users model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    })
    users: Omit<User, 'id'>,
  ): Promise<User> {
    return this.usersRepository.create(users);
  }

  @get('/users/count')
  @response(200, {
    description: 'Users model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.usersRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.usersRepository.find(filter);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'})
    filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.usersRepository.findById(id, filter);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'Users PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() users: User,
  ): Promise<CustomResponse<{}>> {
    try {
      if (users.hasOwnProperty('email')) {
        const emailExists = await this.usersRepository.findOne({
          where: {email: users.email},
        });

        if (emailExists && emailExists.id !== id)
          throw new Error('Email is already taken.');
      }
      const res = await this.usersRepository.replaceById(id, users);
      return {
        success: true,
        data: res,
        message: 'Successfully updated.',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error ? error.message : 'Failed to updated.',
      };
    }
  }

  @del('/users/{id}')
  @response(204, {
    description: 'Users DELETE success',
    content: {'application/json': {schema: CustomResponseSchema}},
  })
  async deleteById(
    @param.path.string('id') id: string,
  ): Promise<CustomResponse<{}>> {
    try {
      const root = await this.usersRepository.findOne({
        where: {email: 'admin@root.com'},
      });

      if (root && root.id === id)
        throw new Error('Invalid to delete the root admin.');

      await this.usersRepository.deleteById(id);
      await this.usersRepository.userCredentials(id).delete();
      await this.reviewsRepository.deleteAll({userId: id});

      return {
        success: true,
        data: id,
        message: 'User deleted successfully.',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        message: error ? error.message : 'Deleting user failed.',
      };
    }
  }
}
