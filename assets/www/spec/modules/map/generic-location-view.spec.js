describe('Generic location view', function () {

  describe('opening an info window', function () {
    beforeEach(function () {
      spyOn(GenericLocationView.prototype, "render");

      this.view = new GenericLocationView({
        model: new Backbone.Model()
      });

    });

    it('should open infoWindow', function () {
      this.view.infoWindow = new InfoWindowView({
        appModel: new AppModel()
      });

      spyOn(this.view.infoWindow, "open");

      this.view.openInfoWindow(0, 1, 2);

      expect(this.view.infoWindow.open).toHaveBeenCalledWith(0, 1, 2);
    });

    it('should translate info window body', function () {
      this.view.infoWindow = new InfoWindowView({ appModel: new AppModel({text: 'på svenska', textEn: 'in english'})});

      var expected = this.view.infoWindow.getRootLanguage() == 'sv' ? 'på svenska' : 'in english';
      var text = this.view.infoWindow.getLanguageKey();
      expect(this.view.infoWindow.appModel.get(text)).toEqual(expected);
    });
  });

  describe('remove', function () {
    beforeEach(function () {
      spyOn(GenericLocationView.prototype, "render");

      this.view = new GenericLocationView({
        model: new Backbone.Model(),
        infoWindow: new InfoWindowView({
          appModel: new AppModel()
        })
      });

    });

    it('should close info window on remove', function () {
      spyOn(this.view.infoWindow, "close");
      this.view.marker = {};
      this.view.marker.setMap = function (foo) {
      };

      this.view.remove();

      expect(this.view.infoWindow.close).toHaveBeenCalled();
    });

    it('should clear map for marker', function () {
      var setMapHasRun = false;

      this.view.marker = {};
      this.view.marker.setMap = function (foo) {
        setMapHasRun = true;
      };

      this.view.remove();

      expect(setMapHasRun).toBeTruthy();
    });

    it('should nullify marker', function () {
      this.view.marker = {};
      this.view.marker.setMap = function (foo) {
      };

      this.view.remove();

      expect(this.view.marker).toBeNull();
    });
  });

  describe('updateVisibility', function () {
    beforeEach(function () {
      GenericLocationView.prototype.render = function () {
      };

      this.view = new GenericLocationView({
        model: new Location(),
        infoWindow: new InfoWindowView({
          appModel: new AppModel()
        })
      });

    });

    it('should set visibility of model on marker', function () {
      this.view.marker = new google.maps.Marker();
      spyOn(this.view.marker, 'setVisible');

      this.view.model.set('visible', true);
      this.view.updateVisibility();
      expect(this.view.marker.setVisible).toHaveBeenCalledWith(true);

      this.view.model.set('visible', false);
      this.view.updateVisibility();
      expect(this.view.marker.setVisible).toHaveBeenCalledWith(false);
    });
  });

  describe('handleMarkerClick', function () {
    beforeEach(function () {
      GenericLocationView.prototype.render = function () {
      };

      this.view = new GenericLocationView({
        model: new Location(),
        infoWindow: new InfoWindowView({
          appModel: new AppModel()
        })
      });

    });

    it('should set trigger the "clicked" event on its model', function () {
      spyOn(this.view, 'openInfoWindow');

      var clicked = false;
      this.view.model.on('clicked', function () {
        clicked = true;
      });

      this.view.handleMarkerClick({latLng: ''});

      expect(clicked).toBeTruthy();
    });

    it('should call openInfoWindow', function () {
      spyOn(this.view, 'openInfoWindow');

      this.view.handleMarkerClick({latLng: ''});

      expect(this.view.openInfoWindow).toHaveBeenCalledWith(this.view.model, this.view.marker, '');
    });

    it('should set destination on infoWindow if directionAware=true', function () {
      spyOn(this.view, 'openInfoWindow');
      spyOn(this.view.infoWindow, 'setDestination');
      this.view.model.set('directionAware', true);

      this.view.handleMarkerClick({latLng: ''});

      expect(this.view.infoWindow.setDestination).toHaveBeenCalledWith('');
    });

    it('should not set destination on infoWindow if directionAware=false', function () {
      spyOn(this.view, 'openInfoWindow');
      spyOn(this.view.infoWindow, 'setDestination');
      this.view.model.set('directionAware', false);

      this.view.handleMarkerClick({latLng: ''});

      expect(this.view.infoWindow.setDestination).not.toHaveBeenCalled();
    });
  });

  describe('getCenter', function () {
    beforeEach(function () {
      GenericLocationView.prototype.render = function () {
      };
    });

    it('should return correct results for point', function () {
      this.view = new GenericLocationView({
        model: new Location({ coords: [
          [10, 10]
        ] })
      });

      expect(this.view.getCenter().lat()).toEqual(10);
      expect(this.view.getCenter().lng()).toEqual(10);
    });

    it('should return correct results for line', function () {
      this.view = new GenericLocationView({
        model: new Location({ coords: [
          [10, 10],
          [20, 20]
        ] })
      });

      expect(this.view.getCenter().lat()).toEqual(15);
      expect(this.view.getCenter().lng()).toEqual(15);
    });

    it('should return correct results for polygon', function () {
      this.view = new GenericLocationView({
        model: new Location({ coords: [
          [10, 10],
          [20, 20],
          [10, 20],
          [20, 10]
        ] })
      });

      expect(this.view.getCenter().lat()).toEqual(15);
      expect(this.view.getCenter().lng()).toEqual(15);
    });

    it('should return -1 for no GPoints', function () {
      this.view = new GenericLocationView({
        model: new Location({ coords: [] })
      });

      expect(this.view.getCenter()).toEqual(-1);
    });
  });
});
