const greetUser = (req, res) => {
  const name = req.query.name?.trim();
  if (name) {
    return res.json({ greeting: `Hello, ${name}!` });
  } else {
    return res.json({ error: 'Name not provided.' });
  }
};

module.exports = greetUser;
  