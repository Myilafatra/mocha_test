
module.exports = (app) => {
  const pers = require('../controller/controller');

  app.post('/personne', pers.create);

  app.get('/personne', pers.findAll);

  app.put('/personne/:_Id', pers.update);

  app.delete('/personne/:_Id', pers.delete);
}