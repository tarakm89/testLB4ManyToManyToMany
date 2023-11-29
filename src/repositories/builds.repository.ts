import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {FilestoreDataSource} from '../datasources';
import {Builds, BuildsRelations, BuildType} from '../models';
import {BuildTypeRepository} from './build-type.repository';

export class BuildsRepository extends DefaultCrudRepository<
  Builds,
  typeof Builds.prototype.ID,
  BuildsRelations
> {

  public readonly buildTypeOfBuild: BelongsToAccessor<BuildType, typeof Builds.prototype.ID>;

  constructor(
    @inject('datasources.filestore') dataSource: FilestoreDataSource, @repository.getter('BuildTypeRepository') protected buildTypeRepositoryGetter: Getter<BuildTypeRepository>,
  ) {
    super(Builds, dataSource);
    this.buildTypeOfBuild = this.createBelongsToAccessorFor('buildTypeOfBuild', buildTypeRepositoryGetter,);
    this.registerInclusionResolver('buildTypeOfBuild', this.buildTypeOfBuild.inclusionResolver);
  }
}
