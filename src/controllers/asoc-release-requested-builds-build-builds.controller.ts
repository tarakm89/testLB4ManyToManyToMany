import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AsocReleaseRequestedBuildsBuild,
  Builds,
} from '../models';
import {AsocReleaseRequestedBuildsBuildRepository} from '../repositories';

export class AsocReleaseRequestedBuildsBuildBuildsController {
  constructor(
    @repository(AsocReleaseRequestedBuildsBuildRepository)
    public asocReleaseRequestedBuildsBuildRepository: AsocReleaseRequestedBuildsBuildRepository,
  ) { }

  @get('/asoc-release-requested-builds-builds/{id}/builds', {
    responses: {
      '200': {
        description: 'Builds belonging to AsocReleaseRequestedBuildsBuild',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Builds),
          },
        },
      },
    },
  })
  async getBuilds(
    @param.path.number('id') id: typeof AsocReleaseRequestedBuildsBuild.prototype.ID,
  ): Promise<Builds> {
    return this.asocReleaseRequestedBuildsBuildRepository.asocReleaseRequestedBuildsBuildBelongTo(id);
  }
}
