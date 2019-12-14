import { GraphQLServer } from 'graphql-yoga';
// Type definitions

// demo user data
const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const posts = [{
     id: '1',
     title: 'GraphQL 101',
     body: ' hi there im james ',
     published: true,
     author: '1'
}, {
    id: '2',
    title: 'GraphQL 201',
    body: 'hey ghyyyus',
    published: false,
    author: '1'
}, {
    id: '3',
    title: 'Prgramming music',
    body: '',
    published: false,
    author: '2'
}
    
]

const typeDefs = `
    type Query {
        posts(query: String): [Post]!
        users(query: String): [User]!
        post: Post!
        me: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`

// Resolvers
const resolvers = {
    Query: {
        posts(parent, args, ctx, info) {
            if(!args.query) {
                return posts
            }
        
            return posts.filter((post) => {
            const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
            const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
            return isTitleMatch || isBodyMatch
        })
            
        },
        users(parent, args, ctx, info){
            if(!args.query) {
                return users
            }
            
            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
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
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
           return posts.filter((post) => {
               return post.author === parent.id
           })
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