import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {FilestoreDataSource} from '../datasources';
import {AsocReleaseRequestedBuilds, AsocReleaseRequestedBuildsRelations, Release, BuildType, AsocReleaseRequestedBuildsBuild, Builds} from '../models';
import {ReleaseRepository} from './release.repository';
import {BuildTypeRepository} from './build-type.repository';
import {AsocReleaseRequestedBuildsBuildRepository} from './asoc-release-requested-builds-build.repository';
import {BuildsRepository} from './builds.repository';

export class AsocReleaseRequestedBuildsRepository extends DefaultCrudRepository<
  AsocReleaseRequestedBuilds,
  typeof AsocReleaseRequestedBuilds.prototype.ID,
  AsocReleaseRequestedBuildsRelations
> {

  public readonly releaseForBuildType: BelongsToAccessor<Release, typeof AsocReleaseRequestedBuilds.prototype.ID>;

  public readonly buildTypeForRelease: BelongsToAccessor<BuildType, typeof AsocReleaseRequestedBuilds.prototype.ID>;

  public readonly asocReleaseRequestedBuildsBuild: HasOneRepositoryFactory<AsocReleaseRequestedBuildsBuild, typeof AsocReleaseRequestedBuilds.prototype.ID>;

  public readonly ReleaseToBuildHasManyThrough: HasManyThroughRepositoryFactory<Builds, typeof Builds.prototype.ID,
          AsocReleaseRequestedBuildsBuild,
          typeof AsocReleaseRequestedBuilds.prototype.ID
        >;

  constructor(
    @inject('datasources.filestore') dataSource: FilestoreDataSource, @repository.getter('ReleaseRepository') protected releaseRepositoryGetter: Getter<ReleaseRepository>, @repository.getter('BuildTypeRepository') protected buildTypeRepositoryGetter: Getter<BuildTypeRepository>, @repository.getter('AsocReleaseRequestedBuildsBuildRepository') protected asocReleaseRequestedBuildsBuildRepositoryGetter: Getter<AsocReleaseRequestedBuildsBuildRepository>, @repository.getter('BuildsRepository') protected buildsRepositoryGetter: Getter<BuildsRepository>,
  ) {
    super(AsocReleaseRequestedBuilds, dataSource);
    this.ReleaseToBuildHasManyThrough = this.createHasManyThroughRepositoryFactoryFor('ReleaseToBuildHasManyThrough', buildsRepositoryGetter, asocReleaseRequestedBuildsBuildRepositoryGetter,);
    this.registerInclusionResolver('ReleaseToBuildHasManyThrough', this.ReleaseToBuildHasManyThrough.inclusionResolver);
    this.asocReleaseRequestedBuildsBuild = this.createHasOneRepositoryFactoryFor('asocReleaseRequestedBuildsBuild', asocReleaseRequestedBuildsBuildRepositoryGetter);
    this.registerInclusionResolver('asocReleaseRequestedBuildsBuild', this.asocReleaseRequestedBuildsBuild.inclusionResolver);
    this.buildTypeForRelease = this.createBelongsToAccessorFor('buildTypeForRelease', buildTypeRepositoryGetter,);
    this.registerInclusionResolver('buildTypeForRelease', this.buildTypeForRelease.inclusionResolver);
    this.releaseForBuildType = this.createBelongsToAccessorFor('releaseForBuildType', releaseRepositoryGetter,);
    this.registerInclusionResolver('releaseForBuildType', this.releaseForBuildType.inclusionResolver);
  }
}
