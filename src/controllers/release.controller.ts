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
import {Release} from '../models';
import {ReleaseRepository} from '../repositories';

export class ReleaseController {
  constructor(
    @repository(ReleaseRepository)
    public releaseRepository : ReleaseRepository,
  ) {}

  @post('/releases')
  @response(200, {
    description: 'Release model instance',
    content: {'application/json': {schema: getModelSchemaRef(Release)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Release, {
            title: 'NewRelease',
            exclude: ['ID'],
          }),
        },
      },
    })
    release: Omit<Release, 'ID'>,
  ): Promise<Release> {
    return this.releaseRepository.create(release);
  }

  @get('/releases/count')
  @response(200, {
    description: 'Release model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Release) where?: Where<Release>,
  ): Promise<Count> {
    return this.releaseRepository.count(where);
  }

  @get('/releases')
  @response(200, {
    description: 'Array of Release model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Release, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Release) filter?: Filter<Release>,
  ): Promise<Release[]> {
    return this.releaseRepository.find(filter);
  }

  @patch('/releases')
  @response(200, {
    description: 'Release PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Release, {partial: true}),
        },
      },
    })
    release: Release,
    @param.where(Release) where?: Where<Release>,
  ): Promise<Count> {
    return this.releaseRepository.updateAll(release, where);
  }

  @get('/releases/{id}')
  @response(200, {
    description: 'Release model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Release, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Release, {exclude: 'where'}) filter?: FilterExcludingWhere<Release>
  ): Promise<Release> {
    return this.releaseRepository.findById(id, filter);
  }

  @patch('/releases/{id}')
  @response(204, {
    description: 'Release PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Release, {partial: true}),
        },
      },
    })
    release: Release,
  ): Promise<void> {
    await this.releaseRepository.updateById(id, release);
  }

  @put('/releases/{id}')
  @response(204, {
    description: 'Release PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() release: Release,
  ): Promise<void> {
    await this.releaseRepository.replaceById(id, release);
  }

  @del('/releases/{id}')
  @response(204, {
    description: 'Release DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.releaseRepository.deleteById(id);
  }
}
