const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const voitures = [ { id: 1, name: "clio" },{ id: 2, name: "megane" },{ id: 3, name: "range" }];


app.post('/voitures', (req, res) => {
    const { id, name } = req.body;
  
    if (!req.body) {
        return res.status(400).json({ error: 'Veuillez fournir un ID et un nom pour la voiture.' });
      }
      voitures.push({ id, name });
      res.status(201).json({ message: 'Voiture ajoutée avec succès', voiture: { id, name } });

})

//lister les voitures 
app.get('/voitures', (req, res) => {
    res.json({ voitures });
  });

// API pour supprimer une voiture par son ID
app.delete('/voitures/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const voitureExistante = voitures.find(voiture => voiture.id === id);
    if (!voitureExistante) {
      return res.status(404).json({ error: "Voiture introuvable" });
    }
    voitures.splice(voitures.indexOf(voitureExistante), 1);
    res.json({ success: true, message: "Voiture supprimée avec succès" });
  });

  app.put('/voitures/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
  
    // Recherche de la voiture à modifier
    const voiture = voitures.find(voiture => voiture.id === id);
    if (!voiture) {
      return res.status(404).json({ error: 'Voiture non trouvée.' });
    }
  
    // Modification du nom de la voiture
    voiture.name = name;
  
    res.json({ message: 'Voiture modifiée avec succès', voiture });
  });
  


app.listen(port, () => {
    console.log('http://localhost:3000/')
  });