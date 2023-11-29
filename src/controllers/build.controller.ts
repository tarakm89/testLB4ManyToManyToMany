import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Builds} from '../models';
import {BuildsRepository} from '../repositories';

export class BuildController {
  constructor(
    @repository(BuildsRepository)
    public buildsRepository : BuildsRepository,
  ) {}

  @post('/builds')
  @response(200, {
    description: 'Builds model instance',
    content: {'application/json': {schema: getModelSchemaRef(Builds)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Builds, {
            title: 'NewBuilds',
            exclude: ['ID'],
          }),
        },
      },
    })
    builds: Omit<Builds, 'ID'>,
  ): Promise<Builds> {
    return this.buildsRepository.create(builds);
  }

  @get('/builds/count')
  @response(200, {
    description: 'Builds model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Builds) where?: Where<Builds>,
  ): Promise<Count> {
    return this.buildsRepository.count(where);
  }

  @get('/builds')
  @response(200, {
    description: 'Array of Builds model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Builds, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Builds) filter?: Filter<Builds>,
  ): Promise<Builds[]> {
    return this.buildsRepository.find(filter);
  }

  @patch('/builds')
  @response(200, {
    description: 'Builds PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Builds, {partial: true}),
        },
      },
    })
    builds: Builds,
    @param.where(Builds) where?: Where<Builds>,
  ): Promise<Count> {
    return this.buildsRepository.updateAll(builds, where);
  }

  @get('/builds/{id}')
  @response(200, {
    description: 'Builds model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Builds, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Builds, {exclude: 'where'}) filter?: FilterExcludingWhere<Builds>
  ): Promise<Builds> {
    return this.buildsRepository.findById(id, filter);
  }

  @patch('/builds/{id}')
  @response(204, {
    description: 'Builds PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Builds, {partial: true}),
        },
      },
    })
    builds: Builds,
  ): Promise<void> {
    await this.buildsRepository.updateById(id, builds);
  }

  @put('/builds/{id}')
  @response(204, {
    description: 'Builds PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() builds: Builds,
  ): Promise<void> {
    await this.buildsRepository.replaceById(id, builds);
  }

  @del('/builds/{id}')
  @response(204, {
    description: 'Builds DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.buildsRepository.deleteById(id);
  }
}
