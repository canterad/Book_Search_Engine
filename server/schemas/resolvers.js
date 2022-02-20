const { AuthenticationError } = require('apollo-server-express');

// import user model
const { User, bookSchema } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // getMe: The context.user._id value is used to find the user.
    // If not found an AuthenticationError is thrown.
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them.
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getMe: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
 
  Mutation: {
  ////////////////////////////////////////////////////////////////////////////////////////////
  // createUser:
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  ////////////////////////////////////////////////////////////////////////////////////////////
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    ////////////////////////////////////////////////////////////////////////////////////////  
    // login:
    // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
    // {body} is destructured req.body  
    ////////////////////////////////////////////////////////////////////////////////////////
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
    
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // saveBook:
    // Save a book to a user's savedBooks field by adding it to the set (to prevent duplicates)
    // user comes from context.user._id value created in the auth middleware function
    ///////////////////////////////////////////////////////////////////////////////////////////////    
    saveBook: async (parent, { book }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { savedBooks: book },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },

    /////////////////////////////////////////////////////////////////////////////////////
    // deleteBook:
    // For the user - remove a book from savedBooks based on the bookID value pass in.
    ////////////////////////////////////////////////////////////////////////////////////
    deleteBook: async (parent, { bookID }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: bookID } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
