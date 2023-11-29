import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FilestoreDataSource} from '../datasources';
import {AsocReleaseRequestedBuildsBuild, AsocReleaseRequestedBuildsBuildRelations} from '../models';

export class AsocReleaseRequestedBuildsBuildRepository extends DefaultCrudRepository<
  AsocReleaseRequestedBuildsBuild,
  typeof AsocReleaseRequestedBuildsBuild.prototype.ID,
  AsocReleaseRequestedBuildsBuildRelations
> {
  constructor(
    @inject('datasources.filestore') dataSource: FilestoreDataSource,
  ) {
    super(AsocReleaseRequestedBuildsBuild, dataSource);
  }
}
