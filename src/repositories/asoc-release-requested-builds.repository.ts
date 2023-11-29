import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FilestoreDataSource} from '../datasources';
import {AsocReleaseRequestedBuilds, AsocReleaseRequestedBuildsRelations, Release, BuildType} from '../models';
import {ReleaseRepository} from './release.repository';
import {BuildTypeRepository} from './build-type.repository';

export class AsocReleaseRequestedBuildsRepository extends DefaultCrudRepository<
  AsocReleaseRequestedBuilds,
  typeof AsocReleaseRequestedBuilds.prototype.ID,
  AsocReleaseRequestedBuildsRelations
> {

  public readonly releaseForBuildType: BelongsToAccessor<Release, typeof AsocReleaseRequestedBuilds.prototype.ID>;

  public readonly buildTypeForRelease: BelongsToAccessor<BuildType, typeof AsocReleaseRequestedBuilds.prototype.ID>;

  constructor(
    @inject('datasources.filestore') dataSource: FilestoreDataSource, @repository.getter('ReleaseRepository') protected releaseRepositoryGetter: Getter<ReleaseRepository>, @repository.getter('BuildTypeRepository') protected buildTypeRepositoryGetter: Getter<BuildTypeRepository>,
  ) {
    super(AsocReleaseRequestedBuilds, dataSource);
    this.buildTypeForRelease = this.createBelongsToAccessorFor('buildTypeForRelease', buildTypeRepositoryGetter,);
    this.registerInclusionResolver('buildTypeForRelease', this.buildTypeForRelease.inclusionResolver);
    this.releaseForBuildType = this.createBelongsToAccessorFor('releaseForBuildType', releaseRepositoryGetter,);
    this.registerInclusionResolver('releaseForBuildType', this.releaseForBuildType.inclusionResolver);
  }
}
