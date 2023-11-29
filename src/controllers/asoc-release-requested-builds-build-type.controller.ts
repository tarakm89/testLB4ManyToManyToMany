import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  AsocReleaseRequestedBuilds,
  BuildType,
} from '../models';
import {AsocReleaseRequestedBuildsRepository} from '../repositories';

export class AsocReleaseRequestedBuildsBuildTypeController {
  constructor(
    @repository(AsocReleaseRequestedBuildsRepository)
    public asocReleaseRequestedBuildsRepository: AsocReleaseRequestedBuildsRepository,
  ) { }

  @get('/asoc-release-requested-builds/{id}/build-type', {
    responses: {
      '200': {
        description: 'BuildType belonging to AsocReleaseRequestedBuilds',
        content: {
          'application/json': {
            schema: getModelSchemaRef(BuildType),
          },
        },
      },
    },
  })
  async getBuildType(
    @param.path.number('id') id: typeof AsocReleaseRequestedBuilds.prototype.ID,
  ): Promise<BuildType> {
    return this.asocReleaseRequestedBuildsRepository.buildTypeForRelease(id);
  }
}
