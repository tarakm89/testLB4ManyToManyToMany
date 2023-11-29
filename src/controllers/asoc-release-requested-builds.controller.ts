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
import {AsocReleaseRequestedBuilds} from '../models';
import {AsocReleaseRequestedBuildsRepository} from '../repositories';

export class AsocReleaseRequestedBuildsController {
  constructor(
    @repository(AsocReleaseRequestedBuildsRepository)
    public asocReleaseRequestedBuildsRepository : AsocReleaseRequestedBuildsRepository,
  ) {}

  @post('/asoc-release-requested-builds')
  @response(200, {
    description: 'AsocReleaseRequestedBuilds model instance',
    content: {'application/json': {schema: getModelSchemaRef(AsocReleaseRequestedBuilds)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuilds, {
            title: 'NewAsocReleaseRequestedBuilds',
            exclude: ['ID'],
          }),
        },
      },
    })
    asocReleaseRequestedBuilds: Omit<AsocReleaseRequestedBuilds, 'ID'>,
  ): Promise<AsocReleaseRequestedBuilds> {
    return this.asocReleaseRequestedBuildsRepository.create(asocReleaseRequestedBuilds);
  }

  @get('/asoc-release-requested-builds/count')
  @response(200, {
    description: 'AsocReleaseRequestedBuilds model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AsocReleaseRequestedBuilds) where?: Where<AsocReleaseRequestedBuilds>,
  ): Promise<Count> {
    return this.asocReleaseRequestedBuildsRepository.count(where);
  }

  @get('/asoc-release-requested-builds')
  @response(200, {
    description: 'Array of AsocReleaseRequestedBuilds model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AsocReleaseRequestedBuilds, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AsocReleaseRequestedBuilds) filter?: Filter<AsocReleaseRequestedBuilds>,
  ): Promise<AsocReleaseRequestedBuilds[]> {
    return this.asocReleaseRequestedBuildsRepository.find(filter);
  }

  @patch('/asoc-release-requested-builds')
  @response(200, {
    description: 'AsocReleaseRequestedBuilds PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuilds, {partial: true}),
        },
      },
    })
    asocReleaseRequestedBuilds: AsocReleaseRequestedBuilds,
    @param.where(AsocReleaseRequestedBuilds) where?: Where<AsocReleaseRequestedBuilds>,
  ): Promise<Count> {
    return this.asocReleaseRequestedBuildsRepository.updateAll(asocReleaseRequestedBuilds, where);
  }

  @get('/asoc-release-requested-builds/{id}')
  @response(200, {
    description: 'AsocReleaseRequestedBuilds model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AsocReleaseRequestedBuilds, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AsocReleaseRequestedBuilds, {exclude: 'where'}) filter?: FilterExcludingWhere<AsocReleaseRequestedBuilds>
  ): Promise<AsocReleaseRequestedBuilds> {
    return this.asocReleaseRequestedBuildsRepository.findById(id, filter);
  }

  @patch('/asoc-release-requested-builds/{id}')
  @response(204, {
    description: 'AsocReleaseRequestedBuilds PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuilds, {partial: true}),
        },
      },
    })
    asocReleaseRequestedBuilds: AsocReleaseRequestedBuilds,
  ): Promise<void> {
    await this.asocReleaseRequestedBuildsRepository.updateById(id, asocReleaseRequestedBuilds);
  }

  @put('/asoc-release-requested-builds/{id}')
  @response(204, {
    description: 'AsocReleaseRequestedBuilds PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() asocReleaseRequestedBuilds: AsocReleaseRequestedBuilds,
  ): Promise<void> {
    await this.asocReleaseRequestedBuildsRepository.replaceById(id, asocReleaseRequestedBuilds);
  }

  @del('/asoc-release-requested-builds/{id}')
  @response(204, {
    description: 'AsocReleaseRequestedBuilds DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.asocReleaseRequestedBuildsRepository.deleteById(id);
  }
}
