// all my services and factories
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

.factory('Geo', ['$q',
  function($q) {
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
        // return true;
        // var q = $q.defer();
        // navigator.geolocation.getCurrentPosition(function(position) {
        //   q.resolve(position);
        // }, function(error) {
        //   q.reject(error);
        // });

        // return q.promise;
      }
    };
  }
])

.factory('Flickr', ['$q', '$resource', 'FLICKR_API_KEY',
  function($q, $resource, FLICKR_API_KEY) {
    var baseUrl = 'https://api.flickr.com/services/rest/'

    var flickrSearch = $resource(baseUrl, {
      method: 'flickr.photos.search',
      user_id: '124768355@N05',
      tag_mode: 'all',
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
  }
])

.factory('$localstorage', ['$window',
  function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }
])

.factory('Weather', forecastioWeather)
  .factory('metTT', function() {
    var list = [
      // metar for
      {
        'id': 1,
        'icon': 'icon ion-ios-location-outline',
        'el': 'met-loc',
        'show': false,
        'txt': null,
      },
      // text
      {
        'id': 2,
        'icon': 'icon ion-thermometer',
        'el': null,
        'show': false,
        'txt': null,
      },
      // temp
      {
        'id': 3,
        'icon': 'icon ion-thermometer',
        'el': 'temp',
        'show': true,
        'txt': null,
      },
      // dewpoint
      {
        'id': 4,
        'icon': 'icon ion-waterdrop',
        'el': 'dew',
        'show': true,
        'txt': null,
      },
      // pressure
      {
        'id': 5,
        'icon': 'icon ion-ios-speedometer-outline',
        'el': 'pressure',
        'show': true,
        'txt': null,
      },
      // winds
      {
        'id': 6,
        'icon': 'icon ion-ios-analytics-outline',
        'el': 'winds',
        'show': true,
        'txt': null,
      },
      // visibility
      {
        'id': 7,
        'icon': 'icon',
        'el': 'weather',
        'show': false,
        'txt': null,
      },
      // ceiling
      {
        'id': 8,
        'icon': 'icon',
        'el': 'weather',
        'show': false,
        'txt': null,
      },
      // clouds
      {
        'id': 9,
        'icon': 'icon ion-ios-cloudy-outline big-cloud',
        'el': 'clouds',
        'show': true,
        'txt': null,
      },
      // weather
      {
        'id': 10,
        'icon': 'icon ion-umbrella',
        'el': 'weather',
        'show': false
      }
    ];

    return {
      all: function() {
        return list;
      }
    };
  })

.factory('metTB', function() {
  var list = [
    // metar for
    {
      'id': 9,
      'icon': 'icon ion-ios-location-outline',
      'el': 'met-loc',
      'show': false,
      'txt': null,
    },
    // text
    {
      'id': 10,
      'icon': 'icon ',
      'el': null,
      'show': false,
      'txt': null,
    },
    // temperature
    {
      'id': 11,
      'icon': 'icon ion-thermometer',
      'el': 'temp',
      'show': true,
      'txt': null,
    },
    // dewpoint
    {
      'id': 12,
      'icon': 'icon ion-waterdrop',
      'el': 'dew',
      'show': true,
      'txt': null,
    },
    // pressure
    {
      'id': 13,
      'icon': 'icon ion-ios-speedometer-outline',
      'el': 'pressure',
      'show': true,
      'txt': null,
    },
    // winds
    {
      'id': 14,
      'icon': 'icon ion-ios-analytics-outline',
      'el': 'winds',
      'show': true,
      'txt': null,
    },
    // visibility
    {
      'id': 15,
      'icon': 'icon ion-thermometer',
      'el': null,
      'show': false,
      'txt': null,
    },
    // ceiling
    {
      'id': 16,
      'icon': 'icon ',
      'el': null,
      'show': false,
      'txt': null,
    },
    // clouds
    {
      'id': 17,
      'icon': 'icon ion-ios-cloudy-outline big-cloud',
      'el': 'clouds',
      'show': true,
      'txt': null,
    }
    // weather
    // { 'id': 17, 'icon': 'icon ion-ios-cloudy-outline', 'el': 'clouds', 'show': true, 'txt': null, }
  ];


  return {
    all: function() {
      return list;
    }
  };
})
  .factory('metCodes', function() {
    var list = [{
      'code': 'FEW',
      'desc': 'Clear'
    }, {
      'code': 'SCT',
      'desc': 'Partly Cloudy'
    }, {
      'code': 'BKN',
      'desc': 'Mostly Cloudy'
    }, {
      'code': 'OVC',
      'desc': 'Overcast'
    }, {
      'code': '-RA',
      'desc': 'Light Rain'
    }, {
      'code': '-SHRA',
      'desc': 'Light Showers'
    }, {
      'code': 'RA',
      'desc': 'Moderate Rain'
    }, {
      'code': 'SHRA',
      'desc': 'Moderate Showers'
    }, {
      'code': '+RA',
      'desc': 'Heavy Rain'
    }, {
      'code': '+SHRA',
      'desc': 'Heavy Showers'
    }, {
      'code': 'TS',
      'desc': 'Thunder'
    }, {
      'code': '-TSRA',
      'desc': 'Light Thundershowers'
    }, {
      'code': 'TSRA',
      'desc': 'Moderate Thundershowers'
    }, {
      'code': '+THRA',
      'desc': 'Heavy Thundershowers'
    }, {
      'code': 'FC',
      'desc': 'Funnel Cloud'
    }, {
      'code': 'BR',
      'desc': 'Mist'
    }, {
      'code': 'FG',
      'desc': 'Fog'
    }, {
      'code': 'FU',
      'desc': 'Smoke'
    }, {
      'code': 'HZ',
      'desc': 'Haze'
    }, {
      'code': 'SQ',
      'desc': 'Squall'
    }, {
      'code': 'VCSH',
      'desc': 'Rain in various areas'
    }, {
      'code': 'CAVOK',
      'desc': 'Fair'
    }];


    return {
      all: function() {
        return list;
      }
    };
  })
  .factory('Radars', function() {
    var radar_list = [{
        'id': 0,
        'img': ' ',
        'title': 'Radar Loop',
        'sub': 'Loops all radar scans.',
        'cat': null
      }, {
        'id': 1,
        // 'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/eht7.png',
        'img': 'app/services/radar/eht7.png',
        'title': 'EHT (Echo Height Top)',
        'sub': 'Gives a representation of the height to which the top of the clouds extend.',
        'cat': 150,
        'code': '150eht'
      }, {
        'id': 2,
        // 'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/hwind7.png',
        'img': 'app/services/radar/hwind7.png',
        'title': 'HWIND (Horizontal Wind)',
        'sub': 'Shows wind flow at a specific altitude.',
        'cat': 150,
        'code': '150hwind'
      }, {
        'id': 3,
        'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/max7.png',
        'title': 'MAX (Maximum)',
        'sub': 'Shows a 2 Dimensional (2D) flow for the horizontal and vertical profile of the clouds.',
        'cat': 150,
        'code': '150max'
      },
      /*{
      'id': 4,
      'img': ' ',
      'title': 'PAC',
      'sub': 'No Subtitle',
      'cat': 150,
      'code': '150pac'
    },*/
      {
        'id': 5,
        // 'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/ppi7.png',
        'img': 'app/services/radar/ppi7.png',
        'title': 'PPI (Plan Position Indicator)',
        'sub': 'A representation of the cloud echoes in a horizontal plane.',
        'cat': 150,
        'code': '150ppi'
      }, {
        'id': 6,
        // 'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/sri7.png',
        'img': 'app/services/radar/sri7.png',
        'title': 'SRI (Surface Rainfall Intensity)',
        'sub': 'An estimate of rainfall intensity associated with different echoes.',
        'cat': 150,
        'code': '150sri'
      }, {
        'id': 7,
        // 'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/vvp7.png',
        'img': 'app/services/radar/vvp7.png',
        'title': 'VVP (Velocity Volume Processing)',
        'sub': 'Provides an estimate of the wind profile up to a certain height.',
        'cat': 150,
        'code': '150vvp'
      },
      // - - - - - - - - - - - - - -
      // radars 250
      {
        'id': 8,
        'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/eht1.png',
        'title': 'EHT(Echo Height Top)',
        'sub': 'Gives a representation of the height to which the top of the clouds extend.',
        'cat': 250,
        'code': '250eht'
      }, {
        'id': 9,
        'img': '',
        'title': '',
        'sub': '',
        'cat': 0
      }, {
        'id': 10,
        'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/hwind7.png',
        'title': 'HWIND (Horizontal Wind)',
        'sub': 'Shows wind flow at a specific altitude.',
        'cat': 250,
        'code': '250hwind'
      }, {
        'id': 11,
        'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/max7.png',
        'title': 'MAX (Maximum)',
        'sub': 'Shows a 2 Dimensional (2D) flow for the horizontal and vertical profile of the clouds.',
        'cat': 250,
        'code': '250max'
      }, {
        'id': 12,
        'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/ppi7.png',
        'title': 'PPI (Plan Position Indicator)',
        'sub': 'A representation of the cloud echoes in a horizontal plane.',
        'cat': 250,
        'code': '250ppi'
      }, {
        'id': 13,
        'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/sri7.png',
        'title': 'SRI (Surface Rainfall Intensity)',
        'sub': 'An estimate of rainfall intensity associated with different echoes.',
        'cat': 250,
        'code': '250sri'
      }, {
        'id': 14,
        'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/vvp7.png',
        'title': 'VVP (Velocity Volume Processing)',
        'sub': 'Provides an estimate of the wind profile up to a certain height.',
        'cat': 250,
        'code': '250vvp'
      },
      // - - - - - - - - - - - - - -
      // radars 400
      {
        'id': 15,
        'img': 'http://190.58.130.190/web/aviation/RadarPages2014/400km/400ppi7.png',
        'title': 'PPI (Plan Position Indicator)',
        'sub': 'A representation of the cloud echoes in a horizontal plane.',
        'cat': 400,
        'code': '400ppi'
      },
      // - - - - - - - - - - - - - -
      // radars 400
      {
        'id': 16,
        'img': null,
        'title': 'Satellite',
        'sub': 'whose orbit is circular and lies above the Equator of the Earth.',
        'cat': null,
        'code': 'geo'
      },

    ]

    return {
      all_of_cat: function(cat_filter) {
        var cat_list = [];
        for (var i = 0; i < radar_list.length; i++) {
          if (radar_list[i].cat === parseInt(cat_filter)) {
            cat_list.push(radar_list[i]);
          }
        }
        return cat_list;
      },
      get: function(radar_id) {
        for (var i = 0; i < radar_list.length; i++) {
          if (radar_list[i].id === parseInt(radar_id)) {
            return radar_list[i];
          }
        }
        return null;
      }
    };
  })
