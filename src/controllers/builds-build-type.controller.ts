import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Builds,
  BuildType,
} from '../models';
import {BuildsRepository} from '../repositories';

export class BuildsBuildTypeController {
  constructor(
    @repository(BuildsRepository)
    public buildsRepository: BuildsRepository,
  ) { }

  @get('/builds/{id}/build-type', {
    responses: {
      '200': {
        description: 'BuildType belonging to Builds',
        content: {
          'application/json': {
            schema: getModelSchemaRef(BuildType),
          },
        },
      },
    },
  })
  async getBuildType(
    @param.path.number('id') id: typeof Builds.prototype.ID,
  ): Promise<BuildType> {
    return this.buildsRepository.buildTypeOfBuild(id);
  }
}
