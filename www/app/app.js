// weather app based on driftyco ionic-weather
// https://github.com/driftyco/ionic-weather
angular.module("ionic.metApp", ['ionic', 'ionic.service.core', 'ionic.metApp.services', 'ionic.metApp.directives',
    'ngCordova', 'ngResource', 'ion-affix', 'ngIOS9UIWebViewPatch', 'ionic.ion.imageCacheFactory', 'ngRoute'/*, 'angular-svg-round-progress', 'ionic-cache-src'*/])

.constant('WUNDERGROUND_API_KEY', '1cc2d3de40fa5af0')
    .constant('FORECASTIO_KEY', '4cd3c5673825a361eb5ce108103ee84a')
    .constant('FLICKR_API_KEY', '504fd7414f6275eb5b657ddbfba80a2c')
    .filter('int', function() {
        return function(v) {
            return parseInt(v) || '';
        };
    })


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $httpProvider.interceptors.push(function($rootScope) {
        return {
            request: function(config) {
                $rootScope.$broadcast('loading:show')
                return config;
            },
            response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response
            }
        }
    });
    // ionic configs
    $ionicConfigProvider.tabs.position('bottom');
    // $ionicConfigProvider.views.maxCache(0);s
    // $ionicConfigProvider.scrolling.jsScrolling(false);

    //this is the home route
    $stateProvider
        .state('app', {
            abstract: true,
            url: "/app",
            templateUrl: "app/layout/menu-layout.html"
        })

    .state('app.home', {
        url: '/home',
        // cache: false,
        views: {
            //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
            'mainContent': {
                templateUrl: "app/home/home.html"
            }
        }
    })

    .state('app.bullettins', {
        url: '/bullettins',
        cache: false,
        // abstract: true,
        views: {
            //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
            'mainContent': {
                templateUrl: "app/bullettins/bullettins.html"
            }
        }
    })

    .state('app.warnings', {
        url: '/warnings',
        cache: false,
        views: {
            //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
            'mainContent': {
                templateUrl: "app/warnings/warnings.html"
            }
        }
    })
        .state('app.about', {
            url: '/about',
            views: {
                'mainContent': {
                    templateUrl: 'app/about/about.html'
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
    })

    .state('app.services.home', {
        //abstract: true,
        url: "/services/home",
        views: {
            //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
            'servicesContent': {
                templateUrl: "app/services/service_main.html"
            }
        }

    })


    .state('app.services.aviation', {
        //abstract: true,
        url: "/aviation",
        views: {
            'servicesContent': {
                templateUrl: "app/services/aviation.html"
            }
        }
    })

    .state('app.services.radar_loop', {
        //abstract: true,
        url: "/radar_loop",
        views: {
            'servicesContent': {
                templateUrl: "app/services/radar/radar_loop.html"
            }
        }
    })
        .state('app.services.radar_150', {
            //abstract: true,
            url: "/radar_150",
            views: {
                'servicesContent': {
                    templateUrl: "app/services/radar/radar_150.html"
                }
            }
        })
        .state('app.services.radar-detail', {
            //abstract: true,
            url: "/radar_detail/:id",
            views: {
                'servicesContent': {
                    templateUrl: "app/services/radar/radar-detail.html",
                    controller: 'RadarDetailCtrl as rdc',
                }
            }
        })
        .state('app.services.radar_250', {
            //abstract: true,
            url: "/radar_250",
            views: {
                'servicesContent': {
                    templateUrl: "app/services/radar/radar_250.html"
                }
            }
        })
        .state('app.services.radar_400', {
            //abstract: true,
            url: "/radar_400",
            views: {
                'servicesContent': {
                    templateUrl: "app/services/radar/radar_400.html",
                    // controller: 'RadarDetailCtrl as rdc',
                }
            }
        })

    // app.services.aviation.radar.250">

    .state('app.services.climate', {
        //abstract: true,
        url: "/climate",
        views: {
            'servicesContent': {
                templateUrl: "app/services/climate.html"
            }
        }
    })

    .state('app.forecast', {
        url: '/forecast',
        cache: false,
        // abstract: true,
        views: {
            //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
            'mainContent': {
                templateUrl: "app/forecast/forecast.html"
            }
        }
    })
        .state('app.uv_index', {
            url: '/home/uv_index',
            // abstract: true,
            views: {
                //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
                'mainContent': {
                    templateUrl: "app/home/uv_index.html"
                }
            }
        })

    .state('app.bulletinsev', {
        url: '/bulletinsev',
        views: {
            //this is a nested view. It is shown in the Ion-Nav-View in the menu-layout.html
            'mainContent': {
                templateUrl: "app/bullettins/severe.html"

            }
        }
    })

    .state('app.services.marine', {
        //abstract: true,
        url: "/marine",
        views: {
            'servicesContent': {
                templateUrl: "app/services/marine.html"
            }
        }
    })
    .state('app.services.winds', {
        //abstract: true,
        url: "/winds",
        views: {
            'servicesContent': {
                templateUrl: "app/services/winds.html"
            }
        }
    })
    .state('app.services.aws', {
        //abstract: true,
        url: "/aws",
        views: {
            'servicesContent': {
                templateUrl: "app/services/aws.html"
            }
        }
    })
        .state('app.services.tourism', {
            //abstract: true,
            url: "/tourism",
            views: {
                'servicesContent': {
                    templateUrl: "app/services/tourism.html"
                }
            }

        })

    .state('app.services.agriculture', {
        //abstract: true,
        url: "/agriculture",
        views: {
            'servicesContent': {
                templateUrl: "app/services/agriculture.html"
            }
        }

    })

    .state('app.contact', {
        //abstract: true,
        url: "/contact",
        views: {
            'mainContent': {
                templateUrl: "app/contact.html"
            }
        }

    })
        .state('app.settings', {
            //abstract: true,
            url: "/settings",
            views: {
                'mainContent': {
                    templateUrl: "app/settings.html"
                }
            }
        })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
})
    .run(function($http, $cordovaPush, $ionicPlatform, $rootScope, $ionicLoading, $ImageCacheFactory) {
        // preload images from flickr api
        $ImageCacheFactory.Cache([
            'http://farm1.static.flickr.com/644/23688702732_26414ac119_z.jpg',
            'http://farm6.static.flickr.com/5780/23714706741_972799109b_z.jpg'
        ]).then(function() {
            console.log('all images loaded')
        }, function(failed) {
            console.log('error loading images')
        });

        $rootScope.$on('loading:show', function() {
            $ionicLoading.show({
                template: ' <ion-spinner></ion-spinner>'
            });
        })
        $rootScope.$on('loading:hide', function() {
            $ionicLoading.hide();
        })
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            // ionicPlatform.fullscreen();
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                // StatusBar.styleDefault();
                StatusBar.styleLightContent();
                // StatusBar.hide();
                // ionic.Platform.fullScreen();
                // StatusBar.styleBlackTranslucent();
            }

        });

        // ionic push notification set up
        $ionicPlatform.ready(function() {
            var push = new Ionic.Push({
                "debug": true
            });

            push.register(function(token) {
                console.log("Device token: ", token.token)
            })
        })

        $(document).ready(function() {
            /* Basic Gallery */
            $('.swipebox').swipebox();
        })
        // document.addEventListener('deviceready', function() {
        //     // Enable to debug issues.
        //     // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

        //     var notificationOpenedCallback = function(jsonData) {
        //         console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
        //     };

        //     window.plugins.OneSignal.init("2454221a-a18a-4b68-8034-65039635829f", {
        //             googleProjectNumber: "158386410361"
        //         },
        //         notificationOpenedCallback);

        //     // Show an alert box if a notification comes in when the user is in your app.
        //     window.plugins.OneSignal.enableInAppAlertNotification(true);
        // }, false);

    });
