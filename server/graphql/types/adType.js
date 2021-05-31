var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;

// Book Type
exports.adType = new GraphQLObjectType({
  name: "ad",
  fields: () => {
    return {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
      title: {
        type: GraphQLString,
      },
      body: {
        type: GraphQLString,
      },
      username: {
        type: GraphQLString,
      },
      createdAt: {
        type: GraphQLString,
      },
    };
  },
});
