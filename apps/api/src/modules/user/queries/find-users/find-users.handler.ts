import { Paginated, PaginatedQueryParams } from "@/core/db/repository.port";
import { userActionCreator } from "../..";
import { UserEntity } from "../../domain/user.entity";
import UserMapper from "../../user.mapper";
import { paginatedQueryBase } from "@/core/ddd/query.base";
import { UserModel } from "../../database/user.repository";
import { joinConditions } from "@/core/db/postgres";

export type FindUsersQueryResult = Promise<Paginated<UserEntity>>;
export const findUsersQuery = userActionCreator.actionCreator<
  Partial<PaginatedQueryParams> & {
    country?: string;
    state?: string;
    city?: string;
  }
>("find-all-paginated");

class FindUsersQuery {
  private readonly db: Dependencies["db"];
  private readonly queryBus: any;
  private readonly userMapper: UserMapper;

  constructor({ db, queryBus, userMapper }) {
    this.db = db;
    this.queryBus = queryBus;
    this.userMapper = userMapper;
  }

  async handle({
    payload,
  }: ReturnType<typeof findUsersQuery>): FindUsersQueryResult {
    const query = paginatedQueryBase(payload);

    const conditions = [
      query.country && this.db`country = ${query.country}`,
      query.state && this.db`state = ${query.state}`,
      query.city && this.db`city = ${query.city}`,
    ];

    const users: { rows: UserModel[]; count: number }[] = await this.db`
      SELECT
        (SELECT COUNT(*) FROM users ${joinConditions(conditions)}) as count,
        (SELECT json_agg(t.*) FROM
          (SELECT * FROM users ${joinConditions(conditions)} LIMIT ${query.limit} OFFSET ${query.offset})
        AS t) AS rows
      `;

    return {
      data: users[0].rows?.map((u) => this.userMapper.toDomain(u)) ?? [],
      count: users[0].count,
      limit: query.limit,
      page: query.page,
    };
  }

  init() {
    this.queryBus.register(findUsersQuery.type, this.handle.bind(this));
  }
}

export default FindUsersQuery;
