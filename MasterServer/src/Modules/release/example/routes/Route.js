class Route{
   constructor(app, name, _appManager){
      this.appManager = _appManager;
      this.config = require('../configs/config.json');

      let Controller = require('../controllers/Controller');
      this.controller = new Controller(_appManager);

      app.get(this.getUrl(""), (req, res) => {
         this.controller.index(req, res, this.appManager)
      });
   }

   getUrl(name){
      if (name.charAt(0) == "/") name = name.substr(1);
      return this.config.module.apiEndpoint +"/" + name;
   }
}

module.exports = Route;
