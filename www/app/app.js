angular.module("metApp", ["ionic"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  //this is the home route
  $stateProvider

    .state('app', {
      abstract: true,
      url: "/app",
      templateUrl: "app/layout/menu-layout.html"
    })

    .state('app.home', {
      url: '/home',
      views: {
        //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
        'mainContent': {
          templateUrl: "app/home/home.html"
        }
      }
    })

    .state('app.bullettins', {
      url: '/bullettins',
      views: {
        //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
        'mainContent': {
          templateUrl: "app/bullettins/bullettins.html"
        }
      }
    })

    .state('app.warnings', {
      url: '/warnings',
      views: {
        //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
        'mainContent': {
          templateUrl: "app/warnings/warnings.html"
        }
      }
    })

    .state('app.services', {
      url: '/services',
      views: {
        //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
        'mainContent': {
          templateUrl: "app/services/services.html"
        }
      }
    });   
    
    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});