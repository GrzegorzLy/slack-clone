export default {
  Mutation: {
    createChannel: async (_: any, args: any, { models }: any) => {
      try {
        await models.Channel.create(args);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
