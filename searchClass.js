const searchClasses = async (req, res) => {
    const { query } = req.query;
    try {
      const classes = await Class.find({ title: new RegExp(query, 'i') });
      res.status(200).json(classes);
    } catch (err) {
      res.status(400).json({ message: 'Error searching classes', error: err.message });
    }
  };
  
  router.get('/search', searchClasses);
  