import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {FilestoreDataSource} from '../datasources';
import {Release, ReleaseRelations, AsocReleaseRequestedBuilds, BuildType} from '../models';
import {AsocReleaseRequestedBuildsRepository} from './asoc-release-requested-builds.repository';
import {BuildTypeRepository} from './build-type.repository';

export class ReleaseRepository extends DefaultCrudRepository<
  Release,
  typeof Release.prototype.ID,
  ReleaseRelations
> {

  public readonly listRequestedBuildsForRelease: HasManyRepositoryFactory<AsocReleaseRequestedBuilds, typeof Release.prototype.ID>;

  public readonly requestedBuildsForRelease: HasManyThroughRepositoryFactory<BuildType, typeof BuildType.prototype.ID,
          AsocReleaseRequestedBuilds,
          typeof Release.prototype.ID
        >;

  constructor(
    @inject('datasources.filestore') dataSource: FilestoreDataSource, @repository.getter('AsocReleaseRequestedBuildsRepository') protected asocReleaseRequestedBuildsRepositoryGetter: Getter<AsocReleaseRequestedBuildsRepository>, @repository.getter('BuildTypeRepository') protected buildTypeRepositoryGetter: Getter<BuildTypeRepository>,
  ) {
    super(Release, dataSource);
    this.requestedBuildsForRelease = this.createHasManyThroughRepositoryFactoryFor('requestedBuildsForRelease', buildTypeRepositoryGetter, asocReleaseRequestedBuildsRepositoryGetter,);
    this.registerInclusionResolver('requestedBuildsForRelease', this.requestedBuildsForRelease.inclusionResolver);
    this.listRequestedBuildsForRelease = this.createHasManyRepositoryFactoryFor('listRequestedBuildsForRelease', asocReleaseRequestedBuildsRepositoryGetter,);
    this.registerInclusionResolver('listRequestedBuildsForRelease', this.listRequestedBuildsForRelease.inclusionResolver);
  }
}
