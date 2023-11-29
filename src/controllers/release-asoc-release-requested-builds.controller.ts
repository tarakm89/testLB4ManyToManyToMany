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
} from '../models';
import {ReleaseRepository} from '../repositories';

export class ReleaseAsocReleaseRequestedBuildsController {
  constructor(
    @repository(ReleaseRepository) protected releaseRepository: ReleaseRepository,
  ) { }

  @get('/releases/{id}/asoc-release-requested-builds', {
    responses: {
      '200': {
        description: 'Array of Release has many AsocReleaseRequestedBuilds',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(AsocReleaseRequestedBuilds)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<AsocReleaseRequestedBuilds>,
  ): Promise<AsocReleaseRequestedBuilds[]> {
    return this.releaseRepository.listRequestedBuildsForRelease(id).find(filter);
  }

  @post('/releases/{id}/asoc-release-requested-builds', {
    responses: {
      '200': {
        description: 'Release model instance',
        content: {'application/json': {schema: getModelSchemaRef(AsocReleaseRequestedBuilds)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Release.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuilds, {
            title: 'NewAsocReleaseRequestedBuildsInRelease',
            exclude: ['ID'],
            optional: ['release_id']
          }),
        },
      },
    }) asocReleaseRequestedBuilds: Omit<AsocReleaseRequestedBuilds, 'ID'>,
  ): Promise<AsocReleaseRequestedBuilds> {
    return this.releaseRepository.listRequestedBuildsForRelease(id).create(asocReleaseRequestedBuilds);
  }

  @patch('/releases/{id}/asoc-release-requested-builds', {
    responses: {
      '200': {
        description: 'Release.AsocReleaseRequestedBuilds PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuilds, {partial: true}),
        },
      },
    })
    asocReleaseRequestedBuilds: Partial<AsocReleaseRequestedBuilds>,
    @param.query.object('where', getWhereSchemaFor(AsocReleaseRequestedBuilds)) where?: Where<AsocReleaseRequestedBuilds>,
  ): Promise<Count> {
    return this.releaseRepository.listRequestedBuildsForRelease(id).patch(asocReleaseRequestedBuilds, where);
  }

  @del('/releases/{id}/asoc-release-requested-builds', {
    responses: {
      '200': {
        description: 'Release.AsocReleaseRequestedBuilds DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AsocReleaseRequestedBuilds)) where?: Where<AsocReleaseRequestedBuilds>,
  ): Promise<Count> {
    return this.releaseRepository.listRequestedBuildsForRelease(id).delete(where);
  }
}
