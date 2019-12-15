import { GraphQLServer } from 'graphql-yoga';
import db from './db'
import Query from './resolvers/Query'
import User from './resolvers/User'
import Mutation from './resolvers/Mutation'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        User, 
        Post,
        Comment
    },
    // gives all files on server the db file as context
    context: {
        db,
    }
})

server.start(() => {
    console.log('The server is up!')
})