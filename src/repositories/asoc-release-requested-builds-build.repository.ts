import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FilestoreDataSource} from '../datasources';
import {AsocReleaseRequestedBuildsBuild, AsocReleaseRequestedBuildsBuildRelations, AsocReleaseRequestedBuilds, Builds} from '../models';
import {AsocReleaseRequestedBuildsRepository} from './asoc-release-requested-builds.repository';
import {BuildsRepository} from './builds.repository';

export class AsocReleaseRequestedBuildsBuildRepository extends DefaultCrudRepository<
  AsocReleaseRequestedBuildsBuild,
  typeof AsocReleaseRequestedBuildsBuild.prototype.ID,
  AsocReleaseRequestedBuildsBuildRelations
> {

  public readonly asocRelaseRequestedBuildID: BelongsToAccessor<AsocReleaseRequestedBuilds, typeof AsocReleaseRequestedBuildsBuild.prototype.ID>;

  public readonly asocReleaseRequestedBuildsBuildBelongTo: BelongsToAccessor<Builds, typeof AsocReleaseRequestedBuildsBuild.prototype.ID>;

  constructor(
    @inject('datasources.filestore') dataSource: FilestoreDataSource, @repository.getter('AsocReleaseRequestedBuildsRepository') protected asocReleaseRequestedBuildsRepositoryGetter: Getter<AsocReleaseRequestedBuildsRepository>, @repository.getter('BuildsRepository') protected buildsRepositoryGetter: Getter<BuildsRepository>,
  ) {
    super(AsocReleaseRequestedBuildsBuild, dataSource);
    this.asocReleaseRequestedBuildsBuildBelongTo = this.createBelongsToAccessorFor('asocReleaseRequestedBuildsBuildBelongTo', buildsRepositoryGetter,);
    this.registerInclusionResolver('asocReleaseRequestedBuildsBuildBelongTo', this.asocReleaseRequestedBuildsBuildBelongTo.inclusionResolver);
    this.asocRelaseRequestedBuildID = this.createBelongsToAccessorFor('asocRelaseRequestedBuildID', asocReleaseRequestedBuildsRepositoryGetter,);
    this.registerInclusionResolver('asocRelaseRequestedBuildID', this.asocRelaseRequestedBuildID.inclusionResolver);
  }
}
