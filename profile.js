const updateProfile = async (req, res) => {
    const { username, email } = req.body;
    try {
      const user = await User.findById(req.user.id);
      if (username) user.username = username;
      if (email) user.email = email;
      await user.save();
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Error updating profile', error: err.message });
    }
  };
  
  router.put('/profile', auth, updateProfile);
  