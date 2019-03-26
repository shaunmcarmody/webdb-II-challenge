const router = require('express').Router();
const knex = require('knex');
const sqlite3 = require('sqlite3');

const db = knex({
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3',
  },
  debug: true
})

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  db('zoos')
    .insert(req.body)
    .then(() => {
      res.status(201).json({ message: 'Zoo added successfully' });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where('id', id)
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'Zoo not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where('id', id)
    .del()
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'Zoo deleted' });
      } else {
        res.status(404).json({ message: 'Zoo not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where('id', id)
    .update(req.body)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'Zoo updated' });
      } else {
        res.status(404).json({ message: 'Zoo not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

module.exports = router;