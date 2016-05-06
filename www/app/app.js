angular.module("ionic.metApp", ['ionic', 'ionic.service.core', 'ionic.metApp.services', 'ionic.metApp.directives',
    'ngCordova', 'ngResource', 'ngIOS9UIWebViewPatch', 'ionic.ion.imageCacheFactory', 'ngRoute' /*, 'angular-svg-round-progress', 'ionic-cache-src'*/
])

// .constant('WUNDERGROUND_API_KEY', '1cc2d3de40fa5af0')
.constant('FORECASTIO_KEY', '4cd3c5673825a361eb5ce108103ee84a')
    .constant('FLICKR_API_KEY', '504fd7414f6275eb5b657ddbfba80a2c')
    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

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
            // Enable native scrolls for Android platform only,
            // as you see, we're disabling jsScrolling to achieve this.
            if (ionic.Platform.isAndroid()) {
                $ionicConfigProvider.scrolling.jsScrolling(false);
            }
            // $ionicConfigProvider.scrolling.jsScrolling(false);

            //app routes
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

            .state('app.bago', {
                url: '/home/bago',
                views: {
                    'mainContent': {
                        templateUrl: 'app/home/bago.html'
                    }
                }
            })

            .state('app.bullettins', {
                url: '/bullettins/:id',
                cache: false,
                views: {
                    'mainContent': {
                        templateUrl: "app/bullettins/bullettins.html"
                    }
                }
            })

            .state('app.warnings', {
                url: '/warnings/:id',
                cache: false,
                views: {
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
                    'mainContent': {
                        templateUrl: "app/services/services.html"
                    }
                }
            })

            .state('app.services.home', {
                url: "/services/home",
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/service_main.html"
                    }
                }
            })

            .state('app.services.radars', {
                url: "/radars",
                // abstract: true,
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/aviation.html"
                    }
                }
            })

            .state('app.services.radar_loop', {
                url: "/radar_loop",
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/radar/radar_loop.html"
                    }
                }
            })

            .state('app.services.radar_150', {
                url: "/radar_150",
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/radar/radar_150.html"
                    }
                }
            })

            .state('app.services.radar-detail', {
                url: "/radar_detail/:id",
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/radar/radar-detail.html",
                        controller: 'RadarDetailCtrl as rdc',
                    }
                }
            })

            .state('app.services.radar_250', {
                url: "/radar_250",
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/radar/radar_250.html"
                    }
                }
            })

            .state('app.services.radar_400', {
                url: "/radar_400",
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/radar/radar_400.html",
                    }
                }
            })

            .state('app.services.climate', {
                url: "/climate",
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/climate.html"
                    }
                }
            })

            .state('app.forecast', {
                url: '/forecast',
                views: {

                    'mainContent': {
                        templateUrl: "app/forecast/forecast.html"
                    }
                }
            })

            .state('app.forecast_home', {
                url: '/forecast_home',
                views: {

                    'mainContent': {
                        templateUrl: "app/forecast/forecast-home.html"
                    }
                }
            })

            .state('app.metars_trin', {
                url: '/metars',
                views: {
                    'mainContent': {
                        templateUrl: 'app/home/metars-trin.html'
                    }
                }
            })

            .state('app.metars_bago', {
                url: '/metars',
                views: {
                    'mainContent': {
                        templateUrl: 'app/home/metars-bago.html'
                    }
                }
            })


            .state('app.uv_index', {
                url: '/home/uv_index',
                views: {

                    'mainContent': {
                        templateUrl: "app/home/uv_index.html"
                    }
                }
            })

            .state('app.bulletinsev', {
                url: '/bulletinsev',
                views: {
                    'mainContent': {
                        templateUrl: "app/bullettins/severe.html"
                    }
                }
            })

            .state('app.services.marine', {
                url: "/marine",
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/marine.html"
                    }
                }
            })

            .state('app.services.winds', {
                url: "/winds",
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/winds.html"
                    }
                }
            })


            .state('app.services.aws', {
                url: "/aws",
                views: {
                    'servicesContent': {
                        templateUrl: "app/services/aws.html"
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
                url: "/contact",
                views: {
                    'mainContent': {
                        templateUrl: "app/contact.html"
                    }
                }
            })


            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/home');
        }
    ])
    .run(['$cordovaBadge', '$http', '$cordovaPush', '$ionicPlatform', '$rootScope', '$ionicLoading', '$ImageCacheFactory', '$cordovaDialogs', '$state', 'metApi', '$timeout', '$ionicSideMenuDelegate',
        function($cordovaBadge, $http, $cordovaPush, $ionicPlatform, $rootScope, $ionicLoading, $ImageCacheFactory, $cordovaDialogs, $state, metApi, $timeout, $ionicSideMenuDelegate) {
            $rootScope.$ionicSideMenuDelegate = $ionicSideMenuDelegate;
            // metApi.get_tokens(function(data) {
            // console.debug('all device tokens', data)
            // console.debug('met subscribe response', data);
            // metApi.unsubscribe(function(data) {
            //     console.log('all tokens cleared');
            // })
            // });
            // preload images from flickr api
            $ImageCacheFactory.Cache([
                // 'http://farm1.static.flickr.com/644/23688702732_26414ac119_z.jpg',
                // 'http://farm6.static.flickr.com/5780/23714706741_972799109b_z.jpg',
                // 'http://farm6.static.flickr.com/5770/23408797994_05f0932a8d_z.jpg',
                // 'http://farm6.static.flickr.com/5827/23410243873_3e22a903d1_z.jpg',
            ]).then(function() {}, function(failed) {});

            $rootScope.$on('loading:show', function() {
                $ionicLoading.show({
                    template: ' <ion-spinner class="light"></ion-spinner>'
                });
            })
            $rootScope.$on('loading:hide', function() {
                $ionicLoading.hide();
            })
            $ionicPlatform.ready(function() {

                $timeout(function() {
                    navigator.splashscreen.hide();
                }, 300);


                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                // if (window.cordova && window.cordova.plugins.Keyboard) {
                //     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                // }

                // ionicPlatform.fullscreen();
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    // StatusBar.styleDefault();
                    StatusBar.styleLightContent();
                    // StatusBar.hide();
                    // ionic.Platform.fullScreen();
                    // StatusBar.styleBlackTranslucent();
                }
                // navigator.splashscreen.hide();
            });

            // ionic push notification set up
            console.log('here, start of push');
            $ionicPlatform.ready(function() {
                Ionic.io();
                var push = new Ionic.Push({
                    canShowAlert: true, //Can pushes show an alert on your screen?
                    canSetBadge: true, //Can pushes update app icon badges?
                    canPlaySound: true, //Can notifications play a sound?
                    canRunActionsOnWake: true, //Can run actions outside the app,
                    'onNotification': function(notification) {
                        $cordovaBadge.hasPermission().then(function(yes) {
                            $cordovaBadge.increase(1);
                        }, function(no) {});

                        handleAndroid(notification);

                    },
                    'pluginConfig': {
                        'ios': {
                            'badge': true,
                            'sound': true,
                        },
                        'android': {
                            'iconColor': '#0000FF'
                        }
                    }
                });

                // ionic platform v2 changes
                // var details = {
                //     'email': 'example@example.com',
                //     'password': 'secretpassword'
                // };

                // Ionic.Auth.signup(details).then(signupSuccess, signupFailure);

                // var options = {
                //     'remember': true
                // };
                // Ionic.Auth.login('basic', options, details).then(authSuccess, authFailure);

                // var user = Ionic.User.current();

                // if (user.isAuthenticated()) {
                //     // the user is already signed in
                // } else {
                //     // we need to show a login or sign up form
                // }

                // - - - - - 

                // push.unregister();
                var user = Ionic.User.current();
                // user.fresh = true;

                if (!user.id) {
                    user.id = Ionic.User.anonymousId();
                }

                user.set('name', ionic.Platform.device().model);
                console.log('device name', ionic.Platform.device())
                user.set('bio', ionic.Platform.device().manufacturer + ', ' + ionic.Platform.device().platform + ', ' + ionic.Platform.device().uuid + ', ' + ionic.Platform.device().version);
                user.save();

                var callback = function(data) {
                    console.log(' - push register -')
                    push.addTokenToUser(user);
                    console.debug(' - token - ', data);
                    // save user token to database
                    if (data.token != undefined) {
                        metApi.subscribe_token(function(data) {
                            console.debug('met subscribe response', data);
                        }, data.token);
                    }
                    $rootScope.token = data.token;
                    user.save();
                };

                push.register(callback);



            })

            function handleAndroid(notification) {
                // console.log('android');

                $cordovaDialogs.confirm(notification.text, 'TT Met Office')
                    .then(function(buttonIndex) {
                        var btn = buttonIndex;
                        if (btn == 1) {
                            var p = 0;
                            if (notification.payload.slide == "Information" || notification.payload.slide == "WATCH") {
                                p = 0;
                            }
                            if (notification.payload.slide == "Severe Weather" || notification.payload.slide == "WARNING") {
                                p = 1;
                            }
                            if (notification.payload.slide == "Flood") {
                                p = 2;
                            }
                            if (notification.payload.slide == "Rough Sea") {
                                p = 3;
                            }
                            $state.go('app.' + notification.payload.state, {
                                id: p
                            });
                            $cordovaBadge.hasPermission().then(function(yes) {
                                $cordovaBadge.decrease(1);
                            }, function(no) {});

                        }
                        // alert('noti closed')
                    });
            }

            function handleiOS(notification) {
                // alert();
                // console.log('iOS');
            }

        }
    ]);