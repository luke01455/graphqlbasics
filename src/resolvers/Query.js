const Query = {
    posts(parent, args, { db }, info) {
        if(!args.query) {
            return db.posts
        }
    
        return db.posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
    }) 
    },
    comments(parent, args, { db }, info){
        return db.comments
    },
    users(parent, args, { db }, info){
        if(!args.query) {
            return db.users
        }
        
        return db.users.filter((user) => {
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
}

export { Query as default }