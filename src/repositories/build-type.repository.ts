import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {FilestoreDataSource} from '../datasources';
import {BuildType, BuildTypeRelations, Builds, AsocReleaseRequestedBuilds} from '../models';
import {BuildsRepository} from './builds.repository';
import {AsocReleaseRequestedBuildsRepository} from './asoc-release-requested-builds.repository';

export class BuildTypeRepository extends DefaultCrudRepository<
  BuildType,
  typeof BuildType.prototype.ID,
  BuildTypeRelations
> {

  public readonly listBuildsforBuildType: HasManyRepositoryFactory<Builds, typeof BuildType.prototype.ID>;

  public readonly listReleaseBasedOnBuildType: HasManyRepositoryFactory<AsocReleaseRequestedBuilds, typeof BuildType.prototype.ID>;

  constructor(
    @inject('datasources.filestore') dataSource: FilestoreDataSource, @repository.getter('BuildsRepository') protected buildsRepositoryGetter: Getter<BuildsRepository>, @repository.getter('AsocReleaseRequestedBuildsRepository') protected asocReleaseRequestedBuildsRepositoryGetter: Getter<AsocReleaseRequestedBuildsRepository>,
  ) {
    super(BuildType, dataSource);
    this.listReleaseBasedOnBuildType = this.createHasManyRepositoryFactoryFor('listReleaseBasedOnBuildType', asocReleaseRequestedBuildsRepositoryGetter,);
    this.registerInclusionResolver('listReleaseBasedOnBuildType', this.listReleaseBasedOnBuildType.inclusionResolver);
    this.listBuildsforBuildType = this.createHasManyRepositoryFactoryFor('listBuildsforBuildType', buildsRepositoryGetter,);
    this.registerInclusionResolver('listBuildsforBuildType', this.listBuildsforBuildType.inclusionResolver);
  }
}
