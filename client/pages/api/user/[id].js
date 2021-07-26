const users = [
    {
        id: 1,
        name: 'Andrew',
        surname: 'Andreev',
        followers: Array(123),
        following: Array(15),
        comments: Array(27),
        image: 'https://source.unsplash.com/random',
        monthes: ['APR 20', 'MAY 20', 'OCT 20', 'MRT 21'],
        posts: [{
            id: 10,
            title: 'Lorem Ipsum is simply dummy',
            subtitle: 'Lorem Ipsum is simply dummy, Lorem Ipsum is simply dummy',
            content: `fasfsafsa`,
            image: 'https://source.unsplash.com/random',
        },{
            id: 10,
            title: 'Lorem Ipsum is simply dummy',
            subtitle: 'Lorem Ipsum is simply dummy, Lorem Ipsum is simply dummy',
            content: `fasfsafsa`,
            image: 'https://source.unsplash.com/random',
        },{
            id: 10,
            title: 'Lorem Ipsum is simply dummy',
            subtitle: 'Lorem Ipsum is simply dummy, Lorem Ipsum is simply dummy',
            content: `fasfsafsa`,
            image: 'https://source.unsplash.com/random',
        },{
            id: 10,
            title: 'Lorem Ipsum is simply dummy',
            subtitle: 'Lorem Ipsum is simply dummy, Lorem Ipsum is simply dummy',
            content: `fasfsafsa`,
            image: 'https://source.unsplash.com/random',
        },{
            id: 10,
            title: 'Lorem Ipsum is simply dummy',
            subtitle: 'Lorem Ipsum is simply dummy, Lorem Ipsum is simply dummy',
            content: `fasfsafsa`,
            image: 'https://source.unsplash.com/random',
        },{
            id: 10,
            title: 'Lorem Ipsum is simply dummy',
            subtitle: 'Lorem Ipsum is simply dummy, Lorem Ipsum is simply dummy',
            content: `fasfsafsa`,
            image: 'https://source.unsplash.com/random',
        },],
        bestPost: {
            id: 10,
            title: 'Lorem Ipsum is simply dummy',
            subtitle: 'Lorem Ipsum is simply dummy, Lorem Ipsum is simply dummy',
            content: `fasfsafsa`,
            image: 'https://source.unsplash.com/random',
        },
        mostCommentedPost: {
            id: 10,
            title: 'Lorem Ipsum is simply dummy',
            subtitle: 'Lorem Ipsum is simply dummy, Lorem Ipsum is simply dummy',
            content: `fasfsafsa`,
            image: 'https://source.unsplash.com/random',
        },
        newestPost: {
            id: 10,
            title: 'Lorem Ipsum is simply dummy',
            subtitle: 'Lorem Ipsum is simply dummy, Lorem Ipsum is simply dummy',
            content: `fasfsafsa`,
            image: 'https://source.unsplash.com/random',
        }
    }
]


export default function userHandler(req, res) {
    console.log(req.query.id)
    const filtered = users.filter((user) => user.id != req.query.id);

    if (filtered.length > 0) {
        res.status(200).json(filtered[0]);
    } else {
        res.status(404).json({ message: `User not found` });
    }
}