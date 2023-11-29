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
import {AsocReleaseRequestedBuildsBuild} from '../models';
import {AsocReleaseRequestedBuildsBuildRepository} from '../repositories';

export class AsocReleaseRequestedBuildsBuildController {
  constructor(
    @repository(AsocReleaseRequestedBuildsBuildRepository)
    public asocReleaseRequestedBuildsBuildRepository : AsocReleaseRequestedBuildsBuildRepository,
  ) {}

  @post('/asoc-release-requested-builds-builds')
  @response(200, {
    description: 'AsocReleaseRequestedBuildsBuild model instance',
    content: {'application/json': {schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild, {
            title: 'NewAsocReleaseRequestedBuildsBuild',
            exclude: ['ID'],
          }),
        },
      },
    })
    asocReleaseRequestedBuildsBuild: Omit<AsocReleaseRequestedBuildsBuild, 'ID'>,
  ): Promise<AsocReleaseRequestedBuildsBuild> {
    return this.asocReleaseRequestedBuildsBuildRepository.create(asocReleaseRequestedBuildsBuild);
  }

  @get('/asoc-release-requested-builds-builds/count')
  @response(200, {
    description: 'AsocReleaseRequestedBuildsBuild model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AsocReleaseRequestedBuildsBuild) where?: Where<AsocReleaseRequestedBuildsBuild>,
  ): Promise<Count> {
    return this.asocReleaseRequestedBuildsBuildRepository.count(where);
  }

  @get('/asoc-release-requested-builds-builds')
  @response(200, {
    description: 'Array of AsocReleaseRequestedBuildsBuild model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AsocReleaseRequestedBuildsBuild, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AsocReleaseRequestedBuildsBuild) filter?: Filter<AsocReleaseRequestedBuildsBuild>,
  ): Promise<AsocReleaseRequestedBuildsBuild[]> {
    return this.asocReleaseRequestedBuildsBuildRepository.find(filter);
  }

  @patch('/asoc-release-requested-builds-builds')
  @response(200, {
    description: 'AsocReleaseRequestedBuildsBuild PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild, {partial: true}),
        },
      },
    })
    asocReleaseRequestedBuildsBuild: AsocReleaseRequestedBuildsBuild,
    @param.where(AsocReleaseRequestedBuildsBuild) where?: Where<AsocReleaseRequestedBuildsBuild>,
  ): Promise<Count> {
    return this.asocReleaseRequestedBuildsBuildRepository.updateAll(asocReleaseRequestedBuildsBuild, where);
  }

  @get('/asoc-release-requested-builds-builds/{id}')
  @response(200, {
    description: 'AsocReleaseRequestedBuildsBuild model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AsocReleaseRequestedBuildsBuild, {exclude: 'where'}) filter?: FilterExcludingWhere<AsocReleaseRequestedBuildsBuild>
  ): Promise<AsocReleaseRequestedBuildsBuild> {
    return this.asocReleaseRequestedBuildsBuildRepository.findById(id, filter);
  }

  @patch('/asoc-release-requested-builds-builds/{id}')
  @response(204, {
    description: 'AsocReleaseRequestedBuildsBuild PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild, {partial: true}),
        },
      },
    })
    asocReleaseRequestedBuildsBuild: AsocReleaseRequestedBuildsBuild,
  ): Promise<void> {
    await this.asocReleaseRequestedBuildsBuildRepository.updateById(id, asocReleaseRequestedBuildsBuild);
  }

  @put('/asoc-release-requested-builds-builds/{id}')
  @response(204, {
    description: 'AsocReleaseRequestedBuildsBuild PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() asocReleaseRequestedBuildsBuild: AsocReleaseRequestedBuildsBuild,
  ): Promise<void> {
    await this.asocReleaseRequestedBuildsBuildRepository.replaceById(id, asocReleaseRequestedBuildsBuild);
  }

  @del('/asoc-release-requested-builds-builds/{id}')
  @response(204, {
    description: 'AsocReleaseRequestedBuildsBuild DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.asocReleaseRequestedBuildsBuildRepository.deleteById(id);
  }
}
