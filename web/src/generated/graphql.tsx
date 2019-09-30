import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Channel = {
   __typename?: 'Channel',
  id: Scalars['Int'],
  name: Scalars['String'],
  public: Scalars['Boolean'],
  messages: Array<Message>,
  users: Array<User>,
};

export type Message = {
   __typename?: 'Message',
  id: Scalars['Int'],
  text: Scalars['String'],
  user: User,
  channel: Channel,
};

export type Mutation = {
   __typename?: 'Mutation',
  createChannel: Scalars['Boolean'],
  createMessage: Scalars['Boolean'],
  createTeam: Scalars['Boolean'],
  createUser: User,
};


export type MutationCreateChannelArgs = {
  teamId: Scalars['Int'],
  name: Scalars['String'],
  public?: Maybe<Scalars['Boolean']>
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['Int'],
  text: Scalars['String']
};


export type MutationCreateTeamArgs = {
  name: Scalars['String']
};


export type MutationCreateUserArgs = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  getUser: User,
  allUsers: Array<User>,
};


export type QueryGetUserArgs = {
  id: Scalars['Int']
};

export type Team = {
   __typename?: 'Team',
  owner: User,
  members: Array<User>,
  channels: Array<Channel>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  username: Scalars['String'],
  email: Scalars['String'],
  teams: Array<Team>,
};
export type AllUsersQueryVariables = {};


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { allUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
  )> }
);

export const AllUsersDocument = gql`
    query AllUsers {
  allUsers {
    id
    email
  }
}
    `;

    export function useAllUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
      return ApolloReactHooks.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, baseOptions);
    }
      export function useAllUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, baseOptions);
      }
      
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersQueryResult = ApolloReactCommon.QueryResult<AllUsersQuery, AllUsersQueryVariables>;