import {Entity, model, property, hasMany} from '@loopback/repository';
import {AsocReleaseRequestedBuilds} from './asoc-release-requested-builds.model';
import {BuildType} from './build-type.model';

@model()
export class Release extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'string',
    required: true,
  })
  ReleaseName: string;

  @hasMany(() => AsocReleaseRequestedBuilds, {keyTo: 'release_id'})
  listRequestedBuildsForRelease: AsocReleaseRequestedBuilds[];

  @hasMany(() => BuildType, {through: {model: () => AsocReleaseRequestedBuilds, keyFrom: 'release_id', keyTo: 'build_type_id'}})
  requestedBuildsForRelease: BuildType[];

  constructor(data?: Partial<Release>) {
    super(data);
  }
}

export interface ReleaseRelations {
  // describe navigational properties here
}

export type ReleaseWithRelations = Release & ReleaseRelations;
