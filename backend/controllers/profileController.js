const getUserProfile = (req, res) => {
  return res.json({
    Profile: {
      name: 'Alice',
      role: 'Student',
    }
  });
};

module.exports = getUserProfile;
