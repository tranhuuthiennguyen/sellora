export const userBaseSchema = `
  email: String!
  country: String!
`;

const userSchema = `
  type User {
    id: ID!
    ${userBaseSchema}
  }
`;

export default userSchema;
