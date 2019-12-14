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

const comments = [{
    id: '102',
    text: 'This worked well for me. Thanks!',
    author: '3',
    post: '1'
}, {
    id: '103',
    text: 'Glad you enjoyed it!',
    author: '1',
    post: '2'
}, {
    id: '104',
    text: 'This did not work.',
    author: '3',
    post: '1'
}, {
    id: '105',
    text: 'Nevermind. I got it to work.',
    author: '1',
    post: '2'
}
]

const typeDefs = `
    type Query {
        posts(query: String): [Post]!
        users(query: String): [User]!
        comments: [Comment]!
        post: Post!
        me: User!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post]!
        comments: [Comment]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
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
        comments(parent, args, ctx, info){
            return comments
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
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
           return posts.filter((post) => {
               return post.author === parent.id
           })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.id === parent.id
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