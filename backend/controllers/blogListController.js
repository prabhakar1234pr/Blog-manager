const getBlogPosts = (req, res) => {
  const mockPosts = [
    { title: 'First Post', content: 'This is my first blog post.' },
    { title: 'Second Post', content: 'This is another one!' }
  ];

  res.json({ posts: mockPosts });
};

module.exports = getBlogPosts;
  