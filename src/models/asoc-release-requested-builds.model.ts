import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Release} from './release.model';
import {BuildType} from './build-type.model';
import {AsocReleaseRequestedBuildsBuild} from './asoc-release-requested-builds-build.model';
import {Builds} from './builds.model';

@model()
export class AsocReleaseRequestedBuilds extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;
  @belongsTo(() => Release, {name: 'releaseForBuildType'})
  release_id: number;

  @belongsTo(() => BuildType, {name: 'buildTypeForRelease'})
  build_type_id: number;

  @hasOne(() => AsocReleaseRequestedBuildsBuild, {keyTo: 'asoc_release_requested_builds_id'})
  asocReleaseRequestedBuildsBuild: AsocReleaseRequestedBuildsBuild;

  @hasMany(() => Builds, {through: {model: () => AsocReleaseRequestedBuildsBuild, keyFrom: 'asoc_release_requested_builds_id', keyTo: 'build_id'}})
  ReleaseToBuildHasManyThrough: Builds[];

  constructor(data?: Partial<AsocReleaseRequestedBuilds>) {
    super(data);
  }
}

export interface AsocReleaseRequestedBuildsRelations {
  // describe navigational properties here
}

export type AsocReleaseRequestedBuildsWithRelations = AsocReleaseRequestedBuilds & AsocReleaseRequestedBuildsRelations;
