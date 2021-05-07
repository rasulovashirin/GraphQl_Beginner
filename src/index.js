const { ApolloServer, gql } = require("apollo-server")

const typeDefs = gql `
    type Query {
        hello: String!
    }

    type User {
        id: String!,
        username: String!,
    }

    type Mutation {
        register(username: String!): User!
    }
`

const resolvers = {
    Query: {
        hello : () => "Hello World!"
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