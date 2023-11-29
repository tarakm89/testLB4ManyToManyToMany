import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Release} from './release.model';
import {BuildType} from './build-type.model';

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

  constructor(data?: Partial<AsocReleaseRequestedBuilds>) {
    super(data);
  }
}

export interface AsocReleaseRequestedBuildsRelations {
  // describe navigational properties here
}

export type AsocReleaseRequestedBuildsWithRelations = AsocReleaseRequestedBuilds & AsocReleaseRequestedBuildsRelations;
