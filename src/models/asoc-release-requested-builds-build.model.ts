import {Entity, model, property} from '@loopback/repository';

@model()
export class AsocReleaseRequestedBuildsBuild extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  ID?: number;

  @property({
    type: 'number',
    required: true,
  })
  asoc_release_requested_builds_id: number;

  @property({
    type: 'number',
    required: true,
  })
  build_id: number;


  constructor(data?: Partial<AsocReleaseRequestedBuildsBuild>) {
    super(data);
  }
}

export interface AsocReleaseRequestedBuildsBuildRelations {
  // describe navigational properties here
}

export type AsocReleaseRequestedBuildsBuildWithRelations = AsocReleaseRequestedBuildsBuild & AsocReleaseRequestedBuildsBuildRelations;
