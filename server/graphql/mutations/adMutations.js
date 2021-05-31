var adType = require("../types/adType");
var adModel = require("../../models/ad");
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;

module.exports = {
  addad: {
    type: adType.adType,
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      body: {
        type: new GraphQLNonNull(GraphQLString),
      },
      username: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      const uModel = new adModel(args);
      const newad = await uModel.save();
      if (!newad) {
        throw new Error("error");
      }
      return newad;
    },
  },
  updatead: {
    type: adType.adType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      body: {
        type: new GraphQLNonNull(GraphQLString),
      },
      username: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      const Updatedad = await adModel.findByIdAndUpdate(args.id, args);
      if (!Updatedad) {
        throw new Error("Error");
      }
      return Updatedad;
    },
  },
  deletead: {
    type: adType.adType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      const removedad = await adModel.findByIdAndRemove(args.id);
      if (!removedad) {
        throw new Error("error");
      }
      return removedad;
    },
  },
};
