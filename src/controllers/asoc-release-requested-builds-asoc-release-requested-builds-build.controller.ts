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
  AsocReleaseRequestedBuilds,
  AsocReleaseRequestedBuildsBuild,
} from '../models';
import {AsocReleaseRequestedBuildsRepository} from '../repositories';

export class AsocReleaseRequestedBuildsAsocReleaseRequestedBuildsBuildController {
  constructor(
    @repository(AsocReleaseRequestedBuildsRepository) protected asocReleaseRequestedBuildsRepository: AsocReleaseRequestedBuildsRepository,
  ) { }

  @get('/asoc-release-requested-builds/{id}/asoc-release-requested-builds-build', {
    responses: {
      '200': {
        description: 'AsocReleaseRequestedBuilds has one AsocReleaseRequestedBuildsBuild',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AsocReleaseRequestedBuildsBuild>,
  ): Promise<AsocReleaseRequestedBuildsBuild> {
    return this.asocReleaseRequestedBuildsRepository.asocReleaseRequestedBuildsBuild(id).get(filter);
  }

  @post('/asoc-release-requested-builds/{id}/asoc-release-requested-builds-build', {
    responses: {
      '200': {
        description: 'AsocReleaseRequestedBuilds model instance',
        content: {'application/json': {schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AsocReleaseRequestedBuilds.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild, {
            title: 'NewAsocReleaseRequestedBuildsBuildInAsocReleaseRequestedBuilds',
            exclude: ['ID'],
            optional: ['asoc_release_requested_builds_id']
          }),
        },
      },
    }) asocReleaseRequestedBuildsBuild: Omit<AsocReleaseRequestedBuildsBuild, 'ID'>,
  ): Promise<AsocReleaseRequestedBuildsBuild> {
    return this.asocReleaseRequestedBuildsRepository.asocReleaseRequestedBuildsBuild(id).create(asocReleaseRequestedBuildsBuild);
  }

  @patch('/asoc-release-requested-builds/{id}/asoc-release-requested-builds-build', {
    responses: {
      '200': {
        description: 'AsocReleaseRequestedBuilds.AsocReleaseRequestedBuildsBuild PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild, {partial: true}),
        },
      },
    })
    asocReleaseRequestedBuildsBuild: Partial<AsocReleaseRequestedBuildsBuild>,
    @param.query.object('where', getWhereSchemaFor(AsocReleaseRequestedBuildsBuild)) where?: Where<AsocReleaseRequestedBuildsBuild>,
  ): Promise<Count> {
    return this.asocReleaseRequestedBuildsRepository.asocReleaseRequestedBuildsBuild(id).patch(asocReleaseRequestedBuildsBuild, where);
  }

  @del('/asoc-release-requested-builds/{id}/asoc-release-requested-builds-build', {
    responses: {
      '200': {
        description: 'AsocReleaseRequestedBuilds.AsocReleaseRequestedBuildsBuild DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AsocReleaseRequestedBuildsBuild)) where?: Where<AsocReleaseRequestedBuildsBuild>,
  ): Promise<Count> {
    return this.asocReleaseRequestedBuildsRepository.asocReleaseRequestedBuildsBuild(id).delete(where);
  }
}
