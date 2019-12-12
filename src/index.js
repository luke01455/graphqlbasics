import { GraphQLServer } from 'graphql-yoga';
// Type definitions
const typeDefs = `
    type Query {
        greeting(name: String, position: String!): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        post: Post!
        me: User!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        add(parent, args, ctx, info) {
            if(args.numbers.length === 0) {
                return 0
            }

            return args.numbers.reduce((acc, curr) => {
                return acc + curr
            })
        },
        grades(parent, args, ctx, info){
            return[99, 80, 93]
        },
        greeting(parent, args, ctx, info) {
            if (args.name && args.position) {
                return `Hello, ${args.name}! you are my favourite ${args.position}`
            } else {
                return 'Hello!'
            }
            
        },
        me() {
            return {
                id: '3443',
                name: 'Mike',
                email: 'Mike@gmail.com'
            }
        },
        post() {
            return {
                id: '12234',
                title: 'Hello world',
                body: 'message to the world',
                published: true
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})