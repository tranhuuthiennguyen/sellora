import { getRequestId } from "../app/app-request.context";
import { Mapper } from "../ddd/mapper.interface";
import { ConflictException, DatabaseErrorException } from "../exceptions";
import {
  Paginated,
  PaginatedQueryParams,
  RepositoryPort,
} from "./repository.port";

export interface SqlRepositoryBaseProps<Entity, DbModel> {
  db: Dependencies["db"];
  tableName: string;
  mapper: Mapper<Entity, DbModel>;
  logger: any;
}

abstract class SqlRepositoryBase<
  Entity extends { id: string },
  DbModel extends Record<string, unknown>,
> implements RepositoryPort<Entity> {
  protected readonly db: Dependencies["db"];
  protected readonly tableName: string;
  protected readonly mapper: Mapper<Entity, DbModel>;
  protected readonly logger: Dependencies["logger"];

  constructor(db, tableName, mapper, logger) {
    this.db = db;
    this.tableName = tableName;
    this.mapper = mapper;
    this.logger = logger;
  }

  async insert(entity: Entity | Entity[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];
    const records = entities.map(this.mapper.toPersistence);
    try {
      await this
        .db`INSERT INTO ${this.db(this.tableName)} ${this.db(records as any[])}`;
    } catch (error: any) {
      if (error.code === "23505") {
        throw new ConflictException("Record already exists", error);
      }

      throw new DatabaseErrorException("Unknown database error", error);
    }
  }

  async findOneById(id: string): Promise<Entity | undefined> {
    const [result] = await this
      .db`SELECT * FROM ${this.db(this.tableName)} WHERE id = ${id}`;
    return result ? this.mapper.toDomain(result) : undefined;
  }

  async findAll(): Promise<Entity[]> {
    const records = await this.db`SELECT * FROM ${this.db(this.tableName)}`;
    return records.map(this.mapper.toDomain);
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
  ): Promise<Paginated<Entity>> {
    const result = await this
      .db`SELECT * FROM ${this.tableName} LIMIT ${params.limit} OFFSET ${params.offset}`;
    const entities = result.map(this.mapper.toDomain);
    return {
      data: entities,
      count: entities.length || 0,
      limit: params.limit,
      page: params.page,
    };
  }

  async delete(entityId: string): Promise<boolean> {
    this.logger.debug(
      `[${getRequestId()}] deleting entities ${entityId} from ${this.tableName}`,
    );
    const result = await this
      .db`DELETE FROM ${this.db(this.tableName)} WHERE id = ${entityId}`;
    return result.count > 0;
  }
}

export default SqlRepositoryBase;
