export default {
  Query: {
    getUser: (_, { id }, { models }) => models.User.findOne({ where: { id } }),
    allUsers: (_, __, { models }) => models.User.findAll(),
  },
  Mutation: {
    createUser: (_, args, { models }) => models.User.create(args),
  },
};
