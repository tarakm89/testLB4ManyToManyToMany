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
  AsocReleaseRequestedBuilds,
} from '../models';
import {AsocReleaseRequestedBuildsBuildRepository} from '../repositories';

export class AsocReleaseRequestedBuildsBuildAsocReleaseRequestedBuildsController {
  constructor(
    @repository(AsocReleaseRequestedBuildsBuildRepository)
    public asocReleaseRequestedBuildsBuildRepository: AsocReleaseRequestedBuildsBuildRepository,
  ) { }

  @get('/asoc-release-requested-builds-builds/{id}/asoc-release-requested-builds', {
    responses: {
      '200': {
        description: 'AsocReleaseRequestedBuilds belonging to AsocReleaseRequestedBuildsBuild',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AsocReleaseRequestedBuilds),
          },
        },
      },
    },
  })
  async getAsocReleaseRequestedBuilds(
    @param.path.number('id') id: typeof AsocReleaseRequestedBuildsBuild.prototype.ID,
  ): Promise<AsocReleaseRequestedBuilds> {
    return this.asocReleaseRequestedBuildsBuildRepository.asocRelaseRequestedBuildID(id);
  }
}
