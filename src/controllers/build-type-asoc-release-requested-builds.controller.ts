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
  AsocReleaseRequestedBuilds,
} from '../models';
import {BuildTypeRepository} from '../repositories';

export class BuildTypeAsocReleaseRequestedBuildsController {
  constructor(
    @repository(BuildTypeRepository) protected buildTypeRepository: BuildTypeRepository,
  ) { }

  @get('/build-types/{id}/asoc-release-requested-builds', {
    responses: {
      '200': {
        description: 'Array of BuildType has many AsocReleaseRequestedBuilds',
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
    return this.buildTypeRepository.listReleaseBasedOnBuildType(id).find(filter);
  }

  @post('/build-types/{id}/asoc-release-requested-builds', {
    responses: {
      '200': {
        description: 'BuildType model instance',
        content: {'application/json': {schema: getModelSchemaRef(AsocReleaseRequestedBuilds)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof BuildType.prototype.ID,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AsocReleaseRequestedBuilds, {
            title: 'NewAsocReleaseRequestedBuildsInBuildType',
            exclude: ['ID'],
            optional: ['build_type_id']
          }),
        },
      },
    }) asocReleaseRequestedBuilds: Omit<AsocReleaseRequestedBuilds, 'ID'>,
  ): Promise<AsocReleaseRequestedBuilds> {
    return this.buildTypeRepository.listReleaseBasedOnBuildType(id).create(asocReleaseRequestedBuilds);
  }

  @patch('/build-types/{id}/asoc-release-requested-builds', {
    responses: {
      '200': {
        description: 'BuildType.AsocReleaseRequestedBuilds PATCH success count',
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
    return this.buildTypeRepository.listReleaseBasedOnBuildType(id).patch(asocReleaseRequestedBuilds, where);
  }

  @del('/build-types/{id}/asoc-release-requested-builds', {
    responses: {
      '200': {
        description: 'BuildType.AsocReleaseRequestedBuilds DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(AsocReleaseRequestedBuilds)) where?: Where<AsocReleaseRequestedBuilds>,
  ): Promise<Count> {
    return this.buildTypeRepository.listReleaseBasedOnBuildType(id).delete(where);
  }
}
