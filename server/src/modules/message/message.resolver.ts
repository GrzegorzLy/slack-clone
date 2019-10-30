export default {
  Mutation: {
    createMessage: async (_: any, args: any, { models, user }: any) => {
      try {
        await models.Message.create({
          ...args,
          userId: user.id,
        });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
