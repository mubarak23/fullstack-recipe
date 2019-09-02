const express = require('express');
const bodyParser = require('body-parser');
const Recipe = require('./models/receipe');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.get('/api/recipes', (req, res) =>{
        Recipe.find().then((recipes) =>{
            res.status(200).json({
                recipes
            })
        }).catch((error) =>{
            res.status(400).json({
                error
            });  
        });
  });

  app.post('/api/recipes', (req, res) =>{
      const recipes = new Recipe({
          title: req.body.title,
          ingredients: req.body.ingredients,
          instructions: req.bosy.instructions,
          difficulty: req.body.difficulty,
          time: req.body.time
      });
      recipes.save().then(() =>{
          res.status(201).json({
              message: 'Recipe Entery Created'
          })
      }).catch((error) =>{
          res.status(400).json({
              error
          });
      });
  });

  app.get('/api/recipes/:id', (req, res) =>{
      Recipe.findOne({
          _id: req.params.id
      }).then((recipes) =>{
          res.status(200).json(recipes)
      }).catch((error) =>{
          res.status(400).json({
              error
          });
      });
  });

  app.put('/api/recipes/:id', (req, res) =>{
    const recipes = new Recipe({
        _id: req.params.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.bosy.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });
    Recipe.updateOne({ _id: req.params.id}, recipes).then(
        () =>{
            res.status(201).json({
                message: 'Recipe Details updated Successfully'
            })
        }
    ).catch((error) =>{
        res.status(401).json({
            error
        });
    });
  });

