const GraphQLSchema = require("graphql").GraphQLSchema;
const GraphQLObjectType = require("graphql").GraphQLObjectType;
const queryType = require("./queries/bookQuery").BookQuery;
const bookMutations = require("./mutations/bookMutations");

exports.BookSchema = new GraphQLSchema({
  query: queryType,
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: bookMutations,
  }),
});
