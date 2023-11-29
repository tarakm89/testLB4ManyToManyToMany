import {Entity, model, property, belongsTo} from '@loopback/repository';
import {BuildType} from './build-type.model';

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

  constructor(data?: Partial<Builds>) {
    super(data);
  }
}

export interface BuildsRelations {
  // describe navigational properties here
}

export type BuildsWithRelations = Builds & BuildsRelations;
