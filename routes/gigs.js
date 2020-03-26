const express = require('express');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');
const Gig = require('../models/Gig');
const router = express.Router();

// Get gig list
router.get('/', (req, res) =>
  Gig.findAll()
    .then(gigs => {
      res.json(gigs).status(200);
    })
    .catch(err => console.log(err))
);

// Search for gigs
router.get('/search', (req, res) => {
  const { term } = req.query;
  Gig.findAll({ where: { technologies: { [Op.like]: `%${term}%` } } })
    .then(gigs => {
      res.json(gigs).status(200);
    })
    .catch(err => console.log(err));
});

// Add a gig
router.post(
  '/add',
  [
    check('title')
      .notEmpty()
      .withMessage('Please enter a "Title"'),
    check('technologies')
      .notEmpty()
      .withMessage('Please enter "Technologies"'),
    check('budget')
      .notEmpty()
      .withMessage('Please enter a "Budget"'),
    check('description')
      .notEmpty()
      .withMessage('Please enter a "Description"'),
    check('contact_email')
      .notEmpty()
      .withMessage('Please enter a "Contact email"'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // If there are validation errors...
    if (!errors.isEmpty()) {
      // Iterate through the errors and get the error messages.
      const errorMessages = errors.array().map(error => error.msg);
      res.status(400).json({ errors: errorMessages });
    } else {
      // remove extra space in 'technologies'
      const { technologies } = await req.body;
      req.body.technologies = technologies.toLowerCase().replace(/,\s*/g, ',');
      // Insert into table
      Gig.create(req.body)
        .then(() => res.status(201).end())
        .catch(err => console.log(err));
    }
  }
);

module.exports = router;
