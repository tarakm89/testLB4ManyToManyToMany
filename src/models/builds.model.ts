import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {BuildType} from './build-type.model';
import {AsocReleaseRequestedBuildsBuild} from './asoc-release-requested-builds-build.model';

@model()
export class Builds extends Entity {
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
  build_number: string;

  @belongsTo(() => BuildType, {name: 'buildTypeOfBuild'})
  build_type_id: number;

  @hasOne(() => AsocReleaseRequestedBuildsBuild, {keyTo: 'build_id'})
  asocReleaseRequestedBuildsBuild: AsocReleaseRequestedBuildsBuild;

  constructor(data?: Partial<Builds>) {
    super(data);
  }
}

export interface BuildsRelations {
  // describe navigational properties here
}

export type BuildsWithRelations = Builds & BuildsRelations;
