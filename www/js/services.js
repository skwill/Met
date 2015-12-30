var forecastioWeather = ['$q', '$resource', '$http', 'FORECASTIO_KEY',
  function($q, $resource, $http, FORECASTIO_KEY) {
    var url = 'https://api.forecast.io/forecast/' + FORECASTIO_KEY + '/';

    var weatherResource = $resource(url, {
      callback: 'JSON_CALLBACK',
    }, {
      get: {
        method: 'JSONP'
      }
    });

    return {
      getAtLocation: function(lat, lng) {
        return $http.jsonp(url + lat + ',' + lng + '?callback=JSON_CALLBACK');
      },
      getForecast: function(locationString) {},
      getHourly: function(locationString) {}
    }
  }
];


angular.module('ionic.metApp.services', ['ngResource'])

.factory('Geo', function($q) {
  return {
    reverseGeocode: function(lat, lng) {
      // 11.225296, -60.680401 // tobago
      // alert("geo")
      var q = $q.defer();

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        // 'latLng': new google.maps.LatLng('11.281333', '-60.566032')
        'latLng': new google.maps.LatLng(lat, lng)
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // console.log(lat, lng);
          if (results.length > 1) {
            var r = results[1];
            var a, types;
            var parts = [];
            var foundLocality = false;
            var foundState = false;
            var foundCountry = false;
            for (var i = 0; i < r.address_components.length; i++) {
              a = r.address_components[i];
              types = a.types;
              for (var j = 0; j < types.length; j++) {
                if (!foundLocality && types[j] == 'locality') {
                  foundLocality = true;
                  parts.push(a.long_name);
                }
                if (!foundState && types[j] == 'administrative_area_level_1') {
                  foundState = true;
                  parts.push(a.short_name);
                }
              }
            }
            q.resolve(parts.join(', '));
          }
        } else {
          q.reject(results);
        }
      })

      return q.promise;
    },
    getLocation: function() {
      var q = $q.defer();
      navigator.geolocation.getCurrentPosition(function(position) {
        q.resolve(position);
      }, function(error) {
        q.reject(error);
      });

      return q.promise;
    }
  };
})

.factory('Flickr', function($q, $resource, FLICKR_API_KEY) {
  var baseUrl = 'https://api.flickr.com/services/rest/'

  var flickrSearch = $resource(baseUrl, {
    method: 'flickr.photos.search',
    user_id: '124768355@N05',
    // group_id: '2893668@N24',
    safe_search: 1,
    jsoncallback: 'JSON_CALLBACK',
    api_key: FLICKR_API_KEY,
    format: 'json'
  }, {
    get: {
      method: 'JSONP'
    }
  });

  return {
    search: function(tags, lat, lng) {
      var q = $q.defer();
      console.log('Searching flickr for tags', tags);
      flickrSearch.get({
        tags: tags,
        lat: lat,
        lng: lng
      }, function(val) {
        q.resolve(val);
      }, function(httpResponse) {
        q.reject(httpResponse);
      });

      return q.promise;
    }
  };
})

.factory('Weather', forecastioWeather);
