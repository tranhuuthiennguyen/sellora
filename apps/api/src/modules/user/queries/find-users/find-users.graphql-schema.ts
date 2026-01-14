const userSchema = `
  type UserPaginatedResponse {
    page: Int!
    count: Int!
    limit: Int!
    data: [User]!
  }

  type Query {
    findUsers(limit: Int, page: Int, country: String, state: String, city: String): UserPaginatedResponse!
  }
`;

export default userSchema;
