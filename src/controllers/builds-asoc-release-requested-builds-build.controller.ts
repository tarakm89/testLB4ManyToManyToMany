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
  Builds,
  AsocReleaseRequestedBuildsBuild,
} from '../models';
import {BuildsRepository} from '../repositories';

export class BuildsAsocReleaseRequestedBuildsBuildController {
  constructor(
    @repository(BuildsRepository) protected buildsRepository: BuildsRepository,
  ) { }

  @get('/builds/{id}/asoc-release-requested-builds-build', {
    responses: {
      '200': {
        description: 'Builds has one AsocReleaseRequestedBuildsBuild',
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
    return this.buildsRepository.asocReleaseRequestedBuildsBuild(id).get(filter);
  }

  @post('/builds/{id}/asoc-release-requested-builds-build', {
    responses: {
      '200': {
        description: 'Builds model instance',
        content: {'application/json': {schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Builds.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuildsBuild, {
            title: 'NewAsocReleaseRequestedBuildsBuildInBuilds',
            exclude: ['ID'],
            optional: ['build_id']
          }),
        },
      },
    }) asocReleaseRequestedBuildsBuild: Omit<AsocReleaseRequestedBuildsBuild, 'ID'>,
  ): Promise<AsocReleaseRequestedBuildsBuild> {
    return this.buildsRepository.asocReleaseRequestedBuildsBuild(id).create(asocReleaseRequestedBuildsBuild);
  }

  @patch('/builds/{id}/asoc-release-requested-builds-build', {
    responses: {
      '200': {
        description: 'Builds.AsocReleaseRequestedBuildsBuild PATCH success count',
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
    return this.buildsRepository.asocReleaseRequestedBuildsBuild(id).patch(asocReleaseRequestedBuildsBuild, where);
  }

  @del('/builds/{id}/asoc-release-requested-builds-build', {
    responses: {
      '200': {
        description: 'Builds.AsocReleaseRequestedBuildsBuild DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AsocReleaseRequestedBuildsBuild)) where?: Where<AsocReleaseRequestedBuildsBuild>,
  ): Promise<Count> {
    return this.buildsRepository.asocReleaseRequestedBuildsBuild(id).delete(where);
  }
}
