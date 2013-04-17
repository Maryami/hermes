/**
 * The campus popup view for the map module.
 *
 * @class A Backbone view to handle the campuses popup.
 * @author <a href="mailto:lucien.bokouka@su.se">Lucien Bokouka</a>
 * @author <a href="mailto:joakim.lundin@su.se">Joakim Lundin</a>
 * @type {Backbone.View}
 */
var MenuPopupView = Backbone.View.extend(
    /** @lends MenuPopupView */
    {

      /**
       * @constructs
       * @param campuses A list of campuses to display.
       */
      initialize: function (options) {
        _.bindAll(this, "render", "selectCampus", "updateCampuses");

        this.campuses = options.campuses;
        this.appModel = options.appModel;
      },

      /** Registers events */
      events: {
        "click #menupopupList": "selectCampus"
      },

      /**
       * Render the campus popup view.
       */
      render: function () {
        // close any other open popup (only one popup can be open at the same time.)
        $(document).find("[data-role='popup']:not([id='menupopup'])").popup("close");

        var popup = this.$el;
        popup.popup("open", { y: 0 });
        popup.parent().css('left', 'auto');
      },

      /**
       * Triggered by a campus selection. Sets the campus in the map app & closes the popup.
       *
       * @param evt the event
       */
      selectCampus: function (evt) {
        // get the campus id from the parent <li> (format "campus-X", where X is a number)
        var campusId = $(evt.target).parents("li").get(0).id.split("campus-")[1];
        this.appModel.set('campus', this.campuses.get(campusId));

        this.$el.popup('close');
      },

      /**
       * Refreshes the campus list in the popup.
       */
      updateCampuses: function () {
        // remove everything from the list
        $("#menupopupList").find("li").remove();

        // append all campuses
        this.campuses.each(function (campus) {
          $("#menupopupList").append("<li id='campus-" + campus.get('id') + "' data-icon='false'><a href='javascript://nop'>" + campus.get('name') + "</a></li>");
        });

        $("#menupopupList").listview();
        $("#menupopupList").listview("refresh"); // jQuery mobile-ify the added elements
      }
    });