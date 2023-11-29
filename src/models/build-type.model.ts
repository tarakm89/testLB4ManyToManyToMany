import {Entity, model, property, hasMany} from '@loopback/repository';
import {Builds} from './builds.model';
import {AsocReleaseRequestedBuilds} from './asoc-release-requested-builds.model';

@model()
export class BuildType extends Entity {
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
  BuildTypeName: string;

  @hasMany(() => Builds, {keyTo: 'build_type_id'})
  listBuildsforBuildType: Builds[];

  @hasMany(() => AsocReleaseRequestedBuilds, {keyTo: 'build_type_id'})
  listReleaseBasedOnBuildType: AsocReleaseRequestedBuilds[];

  constructor(data?: Partial<BuildType>) {
    super(data);
  }
}

export interface BuildTypeRelations {
  // describe navigational properties here
}

export type BuildTypeWithRelations = BuildType & BuildTypeRelations;
