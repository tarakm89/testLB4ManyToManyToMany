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
Release,
AsocReleaseRequestedBuilds,
BuildType,
} from '../models';
import {ReleaseRepository} from '../repositories';

export class ReleaseBuildTypeController {
  constructor(
    @repository(ReleaseRepository) protected releaseRepository: ReleaseRepository,
  ) { }

  @get('/releases/{id}/build-types', {
    responses: {
      '200': {
        description: 'Array of Release has many BuildType through AsocReleaseRequestedBuilds',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(BuildType)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<BuildType>,
  ): Promise<BuildType[]> {
    return this.releaseRepository.requestedBuildsForRelease(id).find(filter);
  }

  @post('/releases/{id}/build-types', {
    responses: {
      '200': {
        description: 'create a BuildType model instance',
        content: {'application/json': {schema: getModelSchemaRef(BuildType)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Release.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BuildType, {
            title: 'NewBuildTypeInRelease',
            exclude: ['ID'],
          }),
        },
      },
    }) buildType: Omit<BuildType, 'ID'>,
  ): Promise<BuildType> {
    return this.releaseRepository.requestedBuildsForRelease(id).create(buildType);
  }

  @patch('/releases/{id}/build-types', {
    responses: {
      '200': {
        description: 'Release.BuildType PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(BuildType, {partial: true}),
        },
      },
    })
    buildType: Partial<BuildType>,
    @param.query.object('where', getWhereSchemaFor(BuildType)) where?: Where<BuildType>,
  ): Promise<Count> {
    return this.releaseRepository.requestedBuildsForRelease(id).patch(buildType, where);
  }

  @del('/releases/{id}/build-types', {
    responses: {
      '200': {
        description: 'Release.BuildType DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(BuildType)) where?: Where<BuildType>,
  ): Promise<Count> {
    return this.releaseRepository.requestedBuildsForRelease(id).delete(where);
  }
}
