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
Builds,
} from '../models';
import {AsocReleaseRequestedBuildsRepository} from '../repositories';

export class AsocReleaseRequestedBuildsBuildsController {
  constructor(
    @repository(AsocReleaseRequestedBuildsRepository) protected asocReleaseRequestedBuildsRepository: AsocReleaseRequestedBuildsRepository,
  ) { }

  @get('/asoc-release-requested-builds/{id}/builds', {
    responses: {
      '200': {
        description: 'Array of AsocReleaseRequestedBuilds has many Builds through AsocReleaseRequestedBuildsBuild',
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
    return this.asocReleaseRequestedBuildsRepository.ReleaseToBuildHasManyThrough(id).find(filter);
  }

  @post('/asoc-release-requested-builds/{id}/builds', {
    responses: {
      '200': {
        description: 'create a Builds model instance',
        content: {'application/json': {schema: getModelSchemaRef(Builds)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof AsocReleaseRequestedBuilds.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Builds, {
            title: 'NewBuildsInAsocReleaseRequestedBuilds',
            exclude: ['ID'],
          }),
        },
      },
    }) builds: Omit<Builds, 'ID'>,
  ): Promise<Builds> {
    return this.asocReleaseRequestedBuildsRepository.ReleaseToBuildHasManyThrough(id).create(builds);
  }

  @patch('/asoc-release-requested-builds/{id}/builds', {
    responses: {
      '200': {
        description: 'AsocReleaseRequestedBuilds.Builds PATCH success count',
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
    return this.asocReleaseRequestedBuildsRepository.ReleaseToBuildHasManyThrough(id).patch(builds, where);
  }

  @del('/asoc-release-requested-builds/{id}/builds', {
    responses: {
      '200': {
        description: 'AsocReleaseRequestedBuilds.Builds DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Builds)) where?: Where<Builds>,
  ): Promise<Count> {
    return this.asocReleaseRequestedBuildsRepository.ReleaseToBuildHasManyThrough(id).delete(where);
  }
}
