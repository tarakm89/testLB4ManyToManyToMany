import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {FilestoreDataSource} from '../datasources';
import {Builds, BuildsRelations, BuildType, AsocReleaseRequestedBuildsBuild} from '../models';
import {BuildTypeRepository} from './build-type.repository';
import {AsocReleaseRequestedBuildsBuildRepository} from './asoc-release-requested-builds-build.repository';

export class BuildsRepository extends DefaultCrudRepository<
  Builds,
  typeof Builds.prototype.ID,
  BuildsRelations
> {

  public readonly buildTypeOfBuild: BelongsToAccessor<BuildType, typeof Builds.prototype.ID>;

  public readonly asocReleaseRequestedBuildsBuild: HasOneRepositoryFactory<AsocReleaseRequestedBuildsBuild, typeof Builds.prototype.ID>;

  constructor(
    @inject('datasources.filestore') dataSource: FilestoreDataSource, @repository.getter('BuildTypeRepository') protected buildTypeRepositoryGetter: Getter<BuildTypeRepository>, @repository.getter('AsocReleaseRequestedBuildsBuildRepository') protected asocReleaseRequestedBuildsBuildRepositoryGetter: Getter<AsocReleaseRequestedBuildsBuildRepository>,
  ) {
    super(Builds, dataSource);
    this.asocReleaseRequestedBuildsBuild = this.createHasOneRepositoryFactoryFor('asocReleaseRequestedBuildsBuild', asocReleaseRequestedBuildsBuildRepositoryGetter);
    this.registerInclusionResolver('asocReleaseRequestedBuildsBuild', this.asocReleaseRequestedBuildsBuild.inclusionResolver);
    this.buildTypeOfBuild = this.createBelongsToAccessorFor('buildTypeOfBuild', buildTypeRepositoryGetter,);
    this.registerInclusionResolver('buildTypeOfBuild', this.buildTypeOfBuild.inclusionResolver);
  }
}
