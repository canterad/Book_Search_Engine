const { AuthenticationError } = require('apollo-server-express');

// import user model
const { User, bookSchema } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // get a single user by either their id or their username
    getSingleUser: async (parent, { ID }) => {
      return User.findOne({ _id: ID });
    },
  },
 
  Mutation: {
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body  
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('No user with this email found!');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect password!');
    }

    const token = signToken(user);
    return { token, user };
  },
    
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function    
    saveBook: async (parent, { ID, bookSchema }) => {
      return User.findOneAndUpdate(
        {_id: ID },
        {
          $addToSet: { savedBooks: bookSchema },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    // remove a book from `savedBooks`
    deleteBook: async (parent, { ID, bookSchema }) => {
      return User.findOneAndUpdate(
        { _id: ID },
        { $pull: { savedBooks: bookSchema } },
        { new: true }
      );
    },    
  },
};

module.exports = resolvers;
