var MapRouter = Backbone.Router.extend({
  routes: {
    "computerLabs" : "computerLabs",
    "auditoriums": "auditoriums",
    "buildings": "buildings",
    "*actions": "defaultRoute"
  },

  defaultRoute: function (actions) {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel()
    });
    appView.render();

    $('#page-map').trigger("pagecreate");
  },

  computerLabs: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({ types: ["computerLabs"] }),
      title: "Datorsalar"
    });
    appView.render();
    appView.updateLocations();
  },

  auditoriums: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({ types: ["auditorium"] }),
      title: "Hör- & skrivsalar"
    });
    appView.render();
    appView.updateLocations();
  },

  buildings: function () {
    var appView = new AppView({
      el: $('#page-map'),
      model: new AppModel({
        menu: true,
        types: ["building"]
      }),
      title: "Hus"
    });
    appView.render();
    appView.updateLocations();
  }
});
