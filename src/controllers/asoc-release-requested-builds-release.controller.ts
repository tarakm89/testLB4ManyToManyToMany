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
  Release,
} from '../models';
import {AsocReleaseRequestedBuildsRepository} from '../repositories';

export class AsocReleaseRequestedBuildsReleaseController {
  constructor(
    @repository(AsocReleaseRequestedBuildsRepository)
    public asocReleaseRequestedBuildsRepository: AsocReleaseRequestedBuildsRepository,
  ) { }

  @get('/asoc-release-requested-builds/{id}/release', {
    responses: {
      '200': {
        description: 'Release belonging to AsocReleaseRequestedBuilds',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Release),
          },
        },
      },
    },
  })
  async getRelease(
    @param.path.number('id') id: typeof AsocReleaseRequestedBuilds.prototype.ID,
  ): Promise<Release> {
    return this.asocReleaseRequestedBuildsRepository.releaseForBuildType(id);
  }
}
