beforeEach(function () {

  this.fixtures = {

    Locations: {
      valid: [
        {
          id: 1,
          name: 'first',
          campus: 'Frescati',
          type: 'parking',
          shape: "line",
          text: "Foobar",
          coords: [
            [59.00, 18.00]
          ],
          directionAware: false
        },
        {
          id: 2,
          name: '2nd',
          campus: 'Frescati',
          type: 'parking',
          shape: "line",
          text: "Foobar",
          coords: [
            [59.00, 18.00]
          ],
          directionAware: false
        },
        {
          id: 3,
          name: 'third',
          campus: 'Frescati',
          type: 'auditorium',
          buildingId: 5,
          shape: "line",
          text: "Foobar",
          coords: [
            [59.00, 18.00]
          ],
          directionAware: false,
          handicapAdapted: true
        },
        {
          id: 4,
          name: '4th',
          campus: 'Kista',
          type: 'parking',
          shape: "line",
          text: "Foobar",
          coords: [
            [59.00, 18.00]
          ],
          directionAware: false
        },
        {
          id: 5,
          name: "Aula magna",
          type: "building",
          coords: [
            [59.00, 18.00]
          ],
          directionAware: false
        },
        {
          id: 6,
          name: "Aula magna entré",
          type: "entrance",
          buildingId: 5,
          coords: [
            [59.00, 18.00]
          ],
          directionAware: false
        }
      ]
    },

    Persons: {
      valid: [
        {
          "id": "test1",
          "uid": "test1",
          "displayName": "Test1 Räksmörgås",
          "mail": "test1@su.se",
          "telephoneNumber": 'foobar',
          "sn": "Räksmörgås",
          "cn": "Test1 Räksmörgås",
          "givenName": "Test1",
          "eduPersonPrincipalName": "test1@su.se"
        },
        {
          "id": "test4",
          "uid": "test4",
          "displayName": "Fernandol Torresson",
          "mail": "test444@fraita.su.se",
          "telephoneNumber": "+55543335950",
          "sn": "Torresson",
          "cn": "Fernandol Torresson",
          "givenName": "Fernandol",
          "eduPersonPrincipalName": "test4@su.se"
        }
      ]
    },

    Campuses: {
      valid: [
        {
          id: 0,
          name: 'Frescati',
          coords: [59.363317, 18.0592],
          zoom: 15
        },
        {
          id: 1,
          name: 'Kista',
          coords: [59, 18],
          zoom: 16
        }
      ]
    },

    FilterItems: {
      valid: {
        locations: [
          {
            id: 1,
            name: 'Axel'
          },
          {
            id: 2,
            name: 'xzy'
          },
          {
            id: 3,
            name: 'Bar Axel'
          },
          {
            id: 4,
            name: 'Baxa'
          }
        ]
      }
    }
  };
});
