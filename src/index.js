const { ApolloServer, gql } = require("apollo-server")

const { rows } = require("../database/postgres")

const typeDefs = gql `
    type User {
        id: ID!,
        username: String!,
    }

    type Query {
        hello: String!
        users: [User]!
    }

    type Mutation {
        register(username: String!): User!
    }
`

const resolvers = {
    Query: {
        hello : () => "Hello World!",
        users: async () => {
            return await rows(`select * from users`)
        }
    },
    Mutation: {
        register: (_, { username }) => ({
            id: 1,
            username: username
        })
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})





server.listen().then(({ url }) => console.log(`server started at ${url}`))