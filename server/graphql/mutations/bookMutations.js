var bookType = require("../types/bookType");
var bookModel = require("../../models/book");
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;

module.exports = {
  addbook: {
    type: bookType.bookType,
    args: {
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
      author: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      const uModel = new bookModel(args);
      const newBook = await uModel.save();
      if (!newBook) {
        throw new Error("error");
      }
      return newBook;
    },
  },
  updatebook: {
    type: bookType.bookType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
      },
      author: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      const UpdatedBook = await bookModel.findByIdAndUpdate(args.id, args);
      if (!UpdatedBook) {
        throw new Error("Error");
      }
      return UpdatedBook;
    },
  },
  deletebook: {
    type: bookType.bookType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve: async (root, args) => {
      const removedBook = await bookModel.findByIdAndRemove(args.id);
      if (!removedBook) {
        throw new Error("error");
      }
      return removedBook;
    },
  },
};
