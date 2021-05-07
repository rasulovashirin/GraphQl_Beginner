const { ApolloServer, gql } = require("apollo-server")

const { rows, row } = require("../database/postgres")

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
        register (username: String!): User!
        updateUser (id: ID!, username: String!): User!
        deleteUser (id: ID!): User!
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
        register: async (_, { username }) => {
            return await row(`insert into users (username) values ($1) returning *`, username)
        },
        updateUser: async (_, { id, username }) => {
            return await row(`update users set username = $2 where id = $1 returning *`, id ,username)
        },
        deleteUser: async (_, { id }) => {
            return await row(`delete from users where id = $1 returning *`, id)
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})





server.listen().then(({ url }) => console.log(`server started at ${url}`))