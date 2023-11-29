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
import {BuildType} from '../models';
import {BuildTypeRepository} from '../repositories';

export class BuildTypeController {
  constructor(
    @repository(BuildTypeRepository)
    public buildTypeRepository : BuildTypeRepository,
  ) {}

  @post('/build-types')
  @response(200, {
    description: 'BuildType model instance',
    content: {'application/json': {schema: getModelSchemaRef(BuildType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BuildType, {
            title: 'NewBuildType',
            exclude: ['ID'],
          }),
        },
      },
    })
    buildType: Omit<BuildType, 'ID'>,
  ): Promise<BuildType> {
    return this.buildTypeRepository.create(buildType);
  }

  @get('/build-types/count')
  @response(200, {
    description: 'BuildType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(BuildType) where?: Where<BuildType>,
  ): Promise<Count> {
    return this.buildTypeRepository.count(where);
  }

  @get('/build-types')
  @response(200, {
    description: 'Array of BuildType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(BuildType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(BuildType) filter?: Filter<BuildType>,
  ): Promise<BuildType[]> {
    return this.buildTypeRepository.find(filter);
  }

  @patch('/build-types')
  @response(200, {
    description: 'BuildType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BuildType, {partial: true}),
        },
      },
    })
    buildType: BuildType,
    @param.where(BuildType) where?: Where<BuildType>,
  ): Promise<Count> {
    return this.buildTypeRepository.updateAll(buildType, where);
  }

  @get('/build-types/{id}')
  @response(200, {
    description: 'BuildType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(BuildType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(BuildType, {exclude: 'where'}) filter?: FilterExcludingWhere<BuildType>
  ): Promise<BuildType> {
    return this.buildTypeRepository.findById(id, filter);
  }

  @patch('/build-types/{id}')
  @response(204, {
    description: 'BuildType PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BuildType, {partial: true}),
        },
      },
    })
    buildType: BuildType,
  ): Promise<void> {
    await this.buildTypeRepository.updateById(id, buildType);
  }

  @put('/build-types/{id}')
  @response(204, {
    description: 'BuildType PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() buildType: BuildType,
  ): Promise<void> {
    await this.buildTypeRepository.replaceById(id, buildType);
  }

  @del('/build-types/{id}')
  @response(204, {
    description: 'BuildType DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.buildTypeRepository.deleteById(id);
  }
}
