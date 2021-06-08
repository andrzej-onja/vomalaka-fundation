var adType = require("../types/adType");
var adModel = require("../../models/ad");
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
const checkAuth = require("../../utils/check-auth");

module.exports = {
  createAd: {
    type: adType.adType,
    args: {
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      body: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args, context) => {
      // console.log(root, "root ");
      // console.log(context, "context ");
      const user = checkAuth(context);
      console.log(user, "user");
      const { title, body, username } = args;

      // const uModel = new adModel(args);
      const uModel = new adModel({
        title,
        body,
        username: user.username,
        user: user.id,
        createdAt: new Date().toISOString(),
      });

      const newAd = await uModel.save();
      if (!newAd) {
        throw new Error("error");
      }
      return newAd;
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
      const UpdatedAd = await adModel.findByIdAndUpdate(args.id, args);
      if (!UpdatedAd) {
        throw new Error("Error");
      }
      return UpdatedAd;
    },
  },
  deletead: {
    type: adType.adType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args, context) => {
      console.log(args, "args");
      const user = checkAuth(context);

      const adToRemove = await adModel.findByIdAndRemove(args.id);
      try {
        if (user.username === adToRemove.username) {
          await adToRemove.delete();
          return "ad deleted successfully";
        } else {
          throw new Error("action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }

      // if (!removedAd) {
      //   throw new Error("error");
      // }
      // return removedAd;
    },
  },
};
