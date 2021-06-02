var userType = require("../types/user");
var usersModel = require("../../models/Users");
var JWT_SECRET = require("../../config").JWT_SECRET;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInputObjectType = require("graphql").GraphQLInputObjectType;
const { validateRegisterInput } = require("../../utils/validators");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RegisterInput = new GraphQLInputObjectType({
  name: "RegisterInput",
  fields: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    confirmPassword: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = {
  register: {
    type: userType.userType,
    args: {
      registerInput: {
        type: RegisterInput,
      },
    },
    resolve: async (root, args) => {
      console.log(args, "register USER-----------------");
      const {
        registerInput: { password, username, confirmPassword, email },
      } = args;

      const existingUser = await usersModel.findOne({ username });

      const { errors, valid } = validateRegisterInput(
        password,
        username,
        confirmPassword,
        email
      );

      if (!valid) {
        throw new Error(`Errors ${errors}`);
      }

      console.log(existingUser, "existingUser");
      if (existingUser) {
        throw new Error("user name already exists");
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const uModel = new usersModel({
        password: hashedPassword,
        email,
        username,
        createdAt: new Date().toISOString(),
      });
      const res = await uModel.save();

      if (!res) {
        throw new Error("error");
      }

      const token = jwt.sign(
        { id: res.id, email: res.email, username: res.username },
        JWT_SECRET,
        { expiresIn: "1h" }
      );
      const userData = { ...res._doc, id: res._id, token };
      console.log(userData, "userData ------ - -- ");
      return userData;
    },
  },
};
