

  (function() {
    var placesAutocomplete = places({
      appId: 'pl3DI04079UW',
      apiKey: '817e90488f00bc4f963dc4fb6f3d95c5',
      container: document.querySelector('#city'),
      templates: {
        value: function(suggestion) {
          return suggestion.name;
        }
      }
    }).configure({
      type: 'city',
      aroundLatLngViaIP: false,
    });
  })();


