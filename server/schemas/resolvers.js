const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getSingleUser: async (parent, { user = null, params }) => {
      const foundUser = await User.findOne({
        $or: [
          { _id: user ? user._id : params.id },
          { username: params.username },
        ],
      });

      if (!foundUser) {
        throw new Error("Cannot find a user with this id!");
      }

      return foundUser;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);

      if (!user) {
        throw new Error("Something is wrong!");
      }
      const token = signToken(user);
      return { token, user };
    },
    //Need to figure out how to handle args for this one
    login: async (parent, { username, email, password }) => {
      const user = await User.findOne({
        $or: [{ username: body.username }, { email: body.email }],
      });
      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error("Wrong password!");
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { user, body }) => {
      console.log(user);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteBook: async (parent, { user, params }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: params.bookId } } },
        { new: true }
      );
      if (!updatedUser) {
        throw new Error("Couldn't find user with this id!");
      }
      return updatedUser;
    },
  },
};
