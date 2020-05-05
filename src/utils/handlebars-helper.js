app.engine('handlebars', handlebars({
    defaultLayout: 'main', 
    helpers: {
      toJSON : function(object) {
        return JSON.stringify(object);
      }
    }
  }))