var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var AdModel = require("../../models/ad");
var adType = require("../types/adType").adType;

// Query
exports.AdQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => {
    return {
      ads: {
        type: new GraphQLList(adType),
        resolve: async () => {
          const ads = await AdModel.find();
          if (!ads) {
            throw new Error("error while fetching data");
          }
          return ads;
        },
      },
    };
  },
});
