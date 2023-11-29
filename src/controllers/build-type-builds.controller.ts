import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  BuildType,
  Builds,
} from '../models';
import {BuildTypeRepository} from '../repositories';

export class BuildTypeBuildsController {
  constructor(
    @repository(BuildTypeRepository) protected buildTypeRepository: BuildTypeRepository,
  ) { }

  @get('/build-types/{id}/builds', {
    responses: {
      '200': {
        description: 'Array of BuildType has many Builds',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Builds)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Builds>,
  ): Promise<Builds[]> {
    return this.buildTypeRepository.listBuildsforBuildType(id).find(filter);
  }

  @post('/build-types/{id}/builds', {
    responses: {
      '200': {
        description: 'BuildType model instance',
        content: {'application/json': {schema: getModelSchemaRef(Builds)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof BuildType.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Builds, {
            title: 'NewBuildsInBuildType',
            exclude: ['ID'],
            optional: ['build_type_id']
          }),
        },
      },
    }) builds: Omit<Builds, 'ID'>,
  ): Promise<Builds> {
    return this.buildTypeRepository.listBuildsforBuildType(id).create(builds);
  }

  @patch('/build-types/{id}/builds', {
    responses: {
      '200': {
        description: 'BuildType.Builds PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Builds, {partial: true}),
        },
      },
    })
    builds: Partial<Builds>,
    @param.query.object('where', getWhereSchemaFor(Builds)) where?: Where<Builds>,
  ): Promise<Count> {
    return this.buildTypeRepository.listBuildsforBuildType(id).patch(builds, where);
  }

  @del('/build-types/{id}/builds', {
    responses: {
      '200': {
        description: 'BuildType.Builds DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Builds)) where?: Where<Builds>,
  ): Promise<Count> {
    return this.buildTypeRepository.listBuildsforBuildType(id).delete(where);
  }
}
