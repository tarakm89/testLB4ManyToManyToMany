import {Entity, model, property, belongsTo} from '@loopback/repository';
import {AsocReleaseRequestedBuilds} from './asoc-release-requested-builds.model';
import {Builds} from './builds.model';

@model()
export class AsocReleaseRequestedBuildsBuild extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;
  @belongsTo(() => AsocReleaseRequestedBuilds, {name: 'asocRelaseRequestedBuildID'})
  asoc_release_requested_builds_id: number;

  @belongsTo(() => Builds, {name: 'asocReleaseRequestedBuildsBuildBelongTo'})
  build_id: number;

  constructor(data?: Partial<AsocReleaseRequestedBuildsBuild>) {
    super(data);
  }
}

export interface AsocReleaseRequestedBuildsBuildRelations {
  // describe navigational properties here
}

export type AsocReleaseRequestedBuildsBuildWithRelations = AsocReleaseRequestedBuildsBuild & AsocReleaseRequestedBuildsBuildRelations;
