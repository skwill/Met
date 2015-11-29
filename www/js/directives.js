angular.module('ionic.metApp.directives', [])



.constant('WEATHER_ICONS', {
  'partlycloudy': 'ion-ios-partlysunny-outline',
  'mostlycloudy': 'ion-ios-partlysunny-outline',
  'cloudy': 'ion-ios-cloudy-outline',
  'rain': 'ion-ios-rainy-outline',
  'tstorms': 'ion-ios-thunderstorm-outline',
  'sunny': 'ion-ios-sunny-outline',
  'clear-day': 'ion-ios-sunny-outline',
  'nt_clear': 'ion-ios-moon-outline',
  'clear-night': 'ion-ios-moon-outline'
})

.directive('weatherIcon', function(WEATHER_ICONS) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      icon: '='
    },
    template: '<i class="icon" ng-class="weatherIcon"></i>',
    link: function($scope) {
      // console.log($scope)
      $scope.$watch('icon', function(v) {
        if (!v) {
          return;
        }

        var icon = v;

        if (icon in WEATHER_ICONS) {
          $scope.weatherIcon = WEATHER_ICONS[icon];
        } else {
          $scope.weatherIcon = WEATHER_ICONS['cloudy'];
        }
        // console.log(icon)
      });
    }
  }
})

.directive('currentIcon', function(WEATHER_ICONS) {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      icon: '='
    },
    template: '<i class="icon" ng-class="currentIcon"></i>',
    link: function($scope) {
      $scope.$watch('icon', function(v) {
        if (!v) {
          return;
        }
        var icon = v;
        if (icon in WEATHER_ICONS) {
          $scope.currentIcon = WEATHER_ICONS[icon];
        } else {
          $scope.currentIcon = WEATHER_ICONS['cloudy'];
        }
      });
    }
  }
})

.directive('currentTime', function($timeout, $filter) {
  return {
    restrict: 'E',
    replace: true,
    template: '<span class="current-time">{{currentTime}}</span>',
    scope: {
      localtz: '=',
    },
    link: function($scope, $element, $attr) {
      $timeout(function checkTime() {
        if ($scope.localtz) {
          $scope.currentTime = $filter('date')(+(new Date), 'h:mm') + $scope.localtz;
        }
        $timeout(checkTime, 500);
      });
    }
  }
})

.directive('currentWeather', function($timeout, $rootScope, Settings) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/home/current-weather.html',
    controller: 'HomeCtrl',
    scope: true,
    compile: function(element, attr) {
      return function($scope, $element, $attr) {

        $rootScope.$on('settings.changed', function(settings) {
          var units = Settings.get('tempUnits');
          // alert();
          // console.log($scope)
          if ($scope.current) {
            // console.log($scope.current.currently)
            var forecast = $scope.current.daily.data[0];
            var current = $scope.current.currently;

            if (units == 'f') {
              // console.log('f')
              $scope.highTemp = forecast.temperatureMax;
              $scope.lowTemp = forecast.temperatureMin;
              $scope.currentTemp = Math.floor(current.temperature);
            } else {
              // console.log('c')
              $scope.highTemp = forecast.temperatureMax;
              $scope.lowTemp = forecast.temperatureMin;
              $scope.currentTemp = Math.floor((current.temperature - 32) * .5556);
            }
          }
        });

        $scope.$watch('current', function(current) {
          var units = Settings.get('tempUnits');

          if (current) {
            // console.log(current)
            if (units == 'f') {
              $scope.currentTemp = Math.floor(current.currently.temperature);
            } else {
              $scope.currentTemp = Math.floor((current.currently.temperature - 32) * .5556);
            }
            if (units == 'f') {
              $scope.highTemp = Math.floor(current.daily.data[0].temperatureMax);
              $scope.lowTemp = Math.floor(current.daily.data[0].temperatureMin);
            } else {
              $scope.highTemp = Math.floor(current.daily.data[0].temperatureMax);
              $scope.lowTemp = Math.floor(current.daily.data[0].temperatureMin);
            }
          }
        });
        // console.log($scope);
        // Delay so we are in the DOM and can calculate sizes
        $timeout(function() {
          var windowHeight = window.innerHeight;
          var thisHeight = $element[0].offsetHeight;
          var headerHeight = document.querySelector('#header').offsetHeight;
          // $element[0].style.paddingTop = (windowHeight - (thisHeight) + 10) + 'px';
          $element[0].style.paddingTop = (windowHeight - thisHeight) / 4 + 'px';
          // console.log((windowHeight - thisHeight) / 2)
          angular.element(document.querySelector('.content')).css('-webkit-overflow-scrolling', 'auto');
          $timeout(function() {
            angular.element(document.querySelector('.content')).css('-webkit-overflow-scrolling', 'touch');
          }, 50);
        });
      }
    }
  }
})

.directive('forecast', function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'app/home/forecast.html',
    link: function($scope, $element, $attr) {}
  }
})

.directive('fiveThirty', function($timeout) {
  return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/forecast/five-thirty.html',
      link: function($scope, $element, $attr) {}
    } 
})

.directive('tenThree', function($timeout) {
  return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/forecast/ten-three.html',
      link: function($scope, $element, $attr) {}
    } 
})

.directive('fiveThirtyp', function($timeout) {
  return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/forecast/five-thirtyp.html',
      link: function($scope, $element, $attr) {}
    } 
})
/*
.directive('fiveThirtyP', function($timeout) {
  return {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/forecast/five-thirtyp.html',
      link: function($scope, $element, $attr) {}
    } 
})*/

.directive('weatherBox', function($timeout) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: {
      title: '@'
    },
    template: '<div class="weather-box"><h4 class="title">{{title}}</h4><div ng-transclude></div></div>',
    link: function($scope, $element, $attr) {}
  }
})

.directive('scrollEffects', function() {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      var amt, st, header;
      var bg = document.querySelector('.bg-image');
      var ff = document.getElementById('ff');
      $element.bind('scroll', function(e) {
        if (!header) {
          header = document.getElementById('header');
        }
        st = e.detail.scrollTop;
        if (st >= 0) {
          header.style.webkitTransform = 'translate3d(0, 0, 0)';
        } else if (st < 0) {
          header.style.webkitTransform = 'translate3d(0, ' + -st + 'px, 0)';
        }
        amt = Math.min(0.6, st / 1000);
        var b_amount = 10;
        var blur = "-webkit-filter: blur(" + Math.abs(amt * b_amount) + "px);" +
          "-moz-filter: blur(" + amt * b_amount + "px);" +
          "-o-filter: blur(" + amt * b_amount + "px);" +
          "-ms-filter: blur(" + amt * b_amount + "px);" +
          "filter: url('data:image/svg+xml;utf9,<svg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'><filter%20id='blur'><feGaussianBlur%20stdDeviation='60'%20/></filter></svg>#blur');" +
          "filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='" + amt * b_amount + "');" +
          "clip: rect(520px 573px 516px 351px);" // /*transition: all 0.1s ease-in-out;*/';
          // ff.setAttribute("style", blur);
          // header.setAttribute("style", "-webkit-filter: blur("+amt*10+"px); -moz-filter: blur("+amt*10+"px); -o-filter: blur("+amt*10+"px); -ms-filter: blur("+amt*10+"px); filter: url('data:image/svg+xml;utf9,<svg%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'><filter%20id='blur'><feGaussianBlur%20stdDeviation='60'%20/></filter></svg>#blur'); filter:progid:DXImageTransform.Microsoft.Blur(PixelRadius='"+amt*10+"'); clip: rect(520px 573px 516px 351px); /*transition: all 0.1s ease-in-out;*/");
          // console.log(ff)

        ionic.requestAnimationFrame(function() {
          // console.log(amt)
          header.style.opacty = 1 - amt;
          if (bg) {
            bg.style.opacity = 1 - amt;
            // bg.setAttribute("style", "-webkit-filter: blur("+amt*2+"px)")
          }
        });
      });
    }
  }
})

.directive('backgroundCycler', function($compile, $animate) {
  var animate = function($scope, $element, newImageUrl) {
    var child = $element.children()[0];

    var scope = $scope.$new();
    scope.url = newImageUrl;
    var img = $compile('<background-image></background-image>')(scope);

    $animate.enter(img, $element, null, function() {
      console.log('Inserted');
    });
    if (child) {
      $animate.leave(angular.element(child), function() {
        console.log('Removed');
      });
    }
  };

  return {
    restrict: 'E',
    link: function($scope, $element, $attr) {
      $scope.$watch('activeBgImage', function(v) {
        if (!v) {
          return;
        }
        console.log('Active bg image changed', v);
        var item = v;
        var url = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_z.jpg";
        animate($scope, $element, url);
      });
    }
  }
})

.directive('backgroundImage', function($compile, $animate) {
  return {
    restrict: 'E',
    template: '<div class="bg-image"><div class="background-vignette"></div></div>',
    replace: true,
    scope: true,
    link: function($scope, $element, $attr) {
      if ($scope.url) {
        $element[0].style.backgroundImage = 'url(' + $scope.url + ')';
      }
    }
  }
});