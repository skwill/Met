angular.module('ionic.metApp').controller('ServicesCtrl', function(Radars, metApi, $scope, $ionicLoading, $timeout, $ionicModal, $cordovaDevice, $ionicPlatform, $cordovaPush, $ionicSlideBoxDelegate, $ionicScrollDelegate) {

	var sc = this;

	$scope.disableSwipe = function() {
	   $ionicSlideBoxDelegate.enableSlide(false);
	};


	sc.refresh_all_a = function() {

	}
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// calls aviation data
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	sc.get_o_aviation = function() {
		metApi.get_o_aviation(function(data) {
			sc.aviation_items = data.items;
			// console.log(sc.aviation_items);
		})
	}

	sc.get_aviation_radar = function() {
		// metApi.get_radar(function(data) {
		// 	console.log("here")

		// 	//sc.aviation_items = data.items;

		// 	sc.radar = data;
		// 	var image = new Image();
		// 	image.src = data.image_src;

		// 	var img_div = $('#img_holder');
		// 	img_div.html(image);
		// 	// console.log(i);
		// });
	}
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// calls for climate data
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/*sc.get_elnino = function() {
		metApi.get_elnino(function(data) {
			sc.el_infos = data.items;
			console.log("el nino");
			console.log(data.items[0]);


			sc.headings = [];
			var num = 1;
			for (var i = 0; i < 10; i++) {
				if (data.items[0].head+"1"){
					sc.headings[0] = data.items[0].head+"1";
					console.log(sc.headings[0]);
				};

				num++;
			};


		})
	}
*/
	sc.get_elninos = function() {
		metApi.get_elninos(function(data) {
			sc.el_infos = data;
			console.log("el nino");
			console.log(data);
		})
	}

	sc.get_rainandtemp = function() {
		metApi.get_rainandtemp(function(data) {
			console.log("Rain and Temp "+data.items[0].year);
			sc.rt = data.items;
		})
	}
	sc.get_drywet = function() {
		metApi.get_drywet(function(data) {
			sc.dw = data.items;
		})
	}

	sc.agrotrini = function() {
		metApi.get_agrotrini(function(data) {
			sc.atrin = data.items[0];
			//console.log("Agro Trini");
			console.log(sc.atrin);
		})

		metApi.get_agroData('area', function(area){
			//console.log("Agro Info");
			console.log(area);
			sc.area = area;
		})

		metApi.get_agroData('rainfall', function(area){
			//console.log("Rain Info");
			console.log(area);
			sc.rain = area;
		})

		metApi.get_agroData('temperature', function(area){
			//console.log("Temp Info");
			console.log(area);
			sc.temp = area;
		})

		metApi.get_agroData('summary', function(area){
			//console.log("Summary Info");
			console.log(area);
			sc.sum = area;
		})
	}

	sc.agrotbg = function() {
		metApi.get_agrotbg(function(data) {
			sc.atbg = data.items[0];
			console.log("Agro TBG");
			console.log(sc.atrin);
		})

		metApi.get_agroDataTbg('area', function(area){
			console.log("Agro Info tbg");
			console.log(area);
			sc.areatbg = area;
		})

		metApi.get_agroDataTbg('rainfall', function(area){
			console.log("Rain Info");
			console.log(area);
			sc.raintbg = area;
		})

		metApi.get_agroDataTbg('temperature', function(area){
			console.log("Temp Info");
			console.log(area);
			sc.temptbg = area;
		})

		metApi.get_agroDataTbg('summary', function(area){
			console.log("Summary Info");
			console.log(area);
			sc.sumtbg = area;
		})
	}

	$ionicModal.fromTemplateUrl('app/services/elrtinfo_item.html', {
		scope: $scope,
		animation: 'scale-in' //modal animation
	}).then(function(elrtinfo_modal) {
		$scope.elrtinfo_modal = elrtinfo_modal;
	});
	// close modal
	$scope.closeModal = function() {
		$scope.elrtinfo_modal.hide();
	};

	$scope.cinfo_open = function(id, m) {
		switch (m) {
			case 'el':
				metApi.get_elnino(function(data) {
					console.log("el nino")
					sc.d_item = data.items[0]
					console.log(sc.d_item)
				}, id)
				break;
			case 'rt':
				metApi.get_rainandtemp(function(data) {
					console.log("rain and temp")
					sc.d_item = data.items[0]
					console.log(sc.d_item)
				}, id)
				break;
			case 'dw':
				metApi.get_drywet(function(data) {
					console.log("dry wetp")
					sc.d_item = data.items[0]
					console.log(sc.d_item)
				}, id)
				break;

		}
		$scope.elrtinfo_modal.show();
	}
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// calls for marine climate data
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// calls for tourism data
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// calls agriculture climate data
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	// will find a bettwe way to do this later but for now .... this
	$scope.slideHasChanged_a = function(index) {
		sc.update_slide_a(index);
	}
	sc.update_slide_a = function(index) {
		titles = ['Satellite', 'Radar', 'Weather Report', 'Forecast'];
		$scope.sub_title = titles[index];
	}

	$scope.slideHasChanged_c = function(index) {
		sc.update_slide_c(index);
	}
	sc.update_slide_c = function(index) {
		titles = ['El Nino Update', 'Rainfall & Temp', 'Dry/Wet Outlook'];
		$scope.sub_title = titles[index];
	}

	$scope.slideHasChanged_m = function(index) {
		sc.update_slide_m(index);
	}
	sc.update_slide_m = function(index) {
		titles = [''];
		$scope.sub_title = titles[index];
	}

	$scope.slideHasChanged_t = function(index) {
		sc.update_slide_t(index);
	}
	sc.update_slide_t = function(index) {
		titles = ['3-day Natinwide', '3-day Tobago'];
		$scope.sub_title = titles[index];
	}

	$scope.slideHasChanged_ag = function(index) {
		sc.update_slide_ag(index);
	}
	sc.update_slide_ag = function(index) {
		titles = ['Trinidad', 'Tobago'];
		$scope.sub_title = titles[index];
	}

	$scope.slide = function(to) {
		// $scope.current = to;
		$ionicScrollDelegate.scrollTop();
		$ionicSlideBoxDelegate.slide(to);
		// sc.refresh_all_b();
	}

	sc.radars_150 = function() {
		sc.radars_150_list = Radars.all_of_cat(150);
		console.log('radars 150', sc.radars_150_list)
	}
	sc.radars_250 = function() {
		sc.radars_250_list = Radars.all_of_cat(250);
		console.log('radars 250', sc.radars_250_list)
	}
	sc.get_radar_400 = function() {
		alert();
	}

	sc.get_metars = function() {
		metApi.get_metar(function(data) {
			var m = data.items;
			// gets the current temp, we only care about the exact number so pull that out from the string

			// these are the ids of the metas we want for trinidad
			var ids = [
				// metar fir
				{ 'id': 1, 'icon': 'icon ion-ios-location-outline', 'el': 'met-loc', 'show': true },
				// text
				{ 'id': 2, 'icon': 'icon ion-thermometer', 'el': null, 'show': false },
				// temp
				{ 'id': 3, 'icon': 'icon ion-thermometer', 'el': 'temp', 'show': true },
				// dewpoint
				{ 'id': 4, 'icon': 'icon ion-waterdrop', 'el': 'dew', 'show': true },
				// pressure
				{ 'id': 5, 'icon': 'icon ion-ios-speedometer-outline', 'el': 'pressure', 'show': true },
				// winds
				{ 'id': 6, 'icon': 'icon ion-ios-analytics-outline', 'el': 'winds', 'show': true },
				// visibility
				{ 'id': 7, 'icon': 'icon', 'el': 'weather', 'show': false },
				// ceiling
				{ 'id': 8, 'el': 'weather', 'show': false },
				// clouds
				{ 'id': 9, 'icon': 'icon ion-ios-cloudy-outline', 'el': 'clouds', 'show': true },
				// weather
				{ 'id': 10, 'icon': 'icon ion-umbrella', 'el': 'weather', 'show': false }
			];

			sc.mdata = [];
			for (i = 0; i < m.length; i++) {
				if (m[i].station == "TTPP") {
					sc.mdata.push({
						'id': m[i].id,
						'label': m[i].label,
						'station': m[i].station,
						'value': m[i].value,
						'icon': ids[i].icon,
						'el': ids[i].el,
						'show': ids[i].show
					});
				}
			}
		})
		sc.sigmet();
	}

	sc.sigmet = function() {
		metApi.get_sigmet(function(data) {
			sc.sig = data.items;
			console.debug('sigmet', sc.sig)
		})
	}

})
	.controller('RadarDetailCtrl', function($scope, $stateParams, metApi, Radars, $http, $cordovaPush, $ionicPlatform, $rootScope, $ionicLoading, $state, $ionicBackdrop, $ionicModal, $ionicScrollDelegate, $ionicSlideBoxDelegate ) {
		var rdc = this;
		$scope.close_loading = function() {
			$ionicLoading.hide();
		}
		$scope.get_radar_detail = function() {
			$scope.zoomMin = 1;
			rdc.radar = Radars.get($stateParams.id);
			metApi.get_radar(function(data) {
				var image = new Image();
				image.src = data.image_src;
				$scope.image = data.image_src;
				// image.style.maxWidth = "100%";
				// var img_div = $('.img_holder');
				// img_div.html(image);
				// img_div.find('img').wrap('<a href="' + data.image_src + '" class="swipebox" title="' + rdc.radar.title + '"></a>')
				// console.log('radar image', data)
			}, $stateParams.id);
			rdc.radar = Radars.get($stateParams.id)

			// get text based details of radar
			// console.debug('radar item detail', Radars.get($stateParams.id));

			$('body').on('click', '.swipebox', function(e) {
				e.preventDefault();
				var photo = $(this).attr('href');
				$scope.image = photo;
				$scope.showImages(photo);
			})
		}
		$scope.reload_page = function() {
			$scope.get_radar_detail($stateParams.id);
			console.log($stateParams.id)
		}
		$scope.$on('loading:show', function() {
            $ionicLoading.show({
            	template: ' <ion-spinner></ion-spinner><br><button class="button button-light button-block" ng-click="close_loading()">Cancel</button>',
            	scope: $scope
            });
        })

		// handle image scrolling and zooming of radar
		$scope.showImages = function(index) {
			$scope.showModal('app/services/radar/radar_image_modal.html');
		}

		$scope.showModal = function(templateUrl) {
			$ionicModal.fromTemplateUrl(templateUrl, {
				scope: $scope,
				animation: 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
				$scope.modal.show();
			})
		}

		$scope.closeModal = function() {
			$scope.modal.hide();
			$scope.modal.remove();
		}

		$scope.updateSlideStatus = function(slide) {
			var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition.zoom;
			if(zoomFactor == $scope.zoomMin) {
				$ionicSlideBoxDelegate.enableSlide(true);
			}
			else {
				$ionicSlideBoxDelegate.enableSlide(false);
			}
		}
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
				'cat': 150
			}, {
				'id': 2,
				// 'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/hwind7.png',
				'img': 'app/services/radar/hwind7.png',
				'title': 'HWIND (Horizontal Wind)',
				'sub': 'Shows wind flow at a specific altitude.',
				'cat': 150
			}, {
				'id': 3,
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/max7.png',
				'title': 'MAX (Maximum)',
				'sub': 'Shows a 2 Dimensional (2D) flow for the horizontal and vertical profile of the clouds.',
				'cat': 150
			}, {
				'id': 4,
				'img': ' ',
				'title': 'PAC',
				'sub': 'No Subtitle',
				'cat': 150
			}, {
				'id': 5,
				// 'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/ppi7.png',
				'img': 'app/services/radar/ppi7.png',
				'title': 'PPI (Plan Position Indicator)',
				'sub': 'A representation of the cloud echoes in a horizontal plane.',
				'cat': 150
			}, {
				'id': 6,
				// 'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/sri7.png',
				'img': 'app/services/radar/sri7.png',
				'title': 'SRI (Surface Rainfall Intensity)',
				'sub': 'An estimate of rainfall intensity associated with different echoes.',
				'cat': 150
			}, {
				'id': 7,
				// 'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/vvp7.png',
				'img': 'app/services/radar/vvp7.png',
				'title': 'VVP (Velocity Volume Processing)',
				'sub': 'Provides an estimate of the wind profile up to a certain height.',
				'cat': 150
			},
			// - - - - - - - - - - - - - -
			// radars 250
			{
				'id': 8,
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/eht1.png',
				'title': 'ETH(Height)',
				'sub': 'Gives a representation of the height to which the top of the clouds extend.',
				'cat': 250
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
				'cat': 250
			}, {
				'id': 11,
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/max7.png',
				'title': 'MAX (Maximum)',
				'sub': 'Shows a 2 Dimensional (2D) flow for the horizontal and vertical profile of the clouds.',
				'cat': 250
			}, {
				'id': 12,
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/ppi7.png',
				'title': 'PPI (Plan Position Indicator)',
				'sub': 'A representation of the cloud echoes in a horizontal plane.',
				'cat': 250
			}, {
				'id': 13,
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/sri7.png',
				'title': 'SRI (Surface Rainfall Intensity)',
				'sub': 'An estimate of rainfall intensity associated with different echoes.',
				'cat': 250
			}, {
				'id': 14,
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/200km/vvp7.png',
				'title': 'VVP (Velocity Volume Processing)',
				'sub': 'Provides an estimate of the wind profile up to a certain height.',
				'cat': 250
			},
			// - - - - - - - - - - - - - -
			// radars 400
			{
				'id': 15,
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/400km/400ppi7.png',
				'title': 'PPI (Plan Position Indicator)',
				'sub': 'A representation of the cloud echoes in a horizontal plane.',
				'cat': 400
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
	}).controller('AWSCtrl', function(metApi, $scope, $timeout, $ionicModal, $ionicPlatform, $ionicPopup, $interval, $ionicBackdrop, $state, $route, $rootScope, $ionicLoading ) {
		var _this = this;
		// var temp = []; var press = []; var gust = []; var precip = []; var humidity = []; var wind_d = []; var wind_s = [];
		$scope.ai = [];

		$scope.mapCreated = function(map) {
    		$scope.map = map;
  		};

		$scope.centerOnMe = function () {
		    if (!$scope.map) { return; }

		    $ionicLoading.show({
		      	content: 'Getting current location...',
		      	showBackdrop: false
		    });

		    navigator.geolocation.getCurrentPosition(function (pos) {
		      	$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		      	$ionicLoading.hide();
		    }, function (error) {
		    	var alertPopup = $ionicPopup.alert({
					title: 'Unable to get location',
					template: error.message
				});
		      	// alert('Unable to get location: ' + error.message);
		    });
		  };

		$scope.closeModal = function(a) {
			$ionicPlatform.ready(function() {
				if (window.StatusBar) {
            		StatusBar.styleLightContent();
        		}
			})
			$scope.modal.hide();
		}
		// when any modal is closed, hide the back drop
		$scope.$on('modal.hidden', function() {
			$ionicBackdrop.release();
		})

		$rootScope.ace = function(city) {
			$ionicPlatform.ready(function() {
				if (window.StatusBar) {
					StatusBar.styleBlackTranslucent();
        		}
			})
			// $ionicBackdrop.retain();
			// $ionicModal.fromTemplateUrl('app/services/aws_details.html', {
			// 	scope: $scope,
			// 	animation: 'scale-in',
			// 	// animation: 'slide-in-up',
			// }).then(function(modal) {
			// 	$scope.modal = modal;
			// 	$scope.modal.show();
			// })

			$scope.title = city;


			// get aws data
			metApi.get_aws(function(data) {
    			var length = data.items.length;
    			var d = data.items;
    			for(z = 0; z < length; z++) {
    				if(d[z].item == 'Temperature') { $scope.ai[0] = d[z]; }
    				if(d[z].item == 'Pressure') { $scope.ai[1] = d[z]; }
    				if(d[z].item == 'Gust') { $scope.ai[2] = d[z]; }
    				if(d[z].item == 'Precipitation') { $scope.ai[3] = d[z]; }
    				if(d[z].item == 'Humidity') { $scope.ai[4] = d[z]; }
    				if(d[z].item == 'Wind Direction') { $scope.ai[5] = d[z]; }
    				if(d[z].item == 'Wind Speed') { $scope.ai[6] = d[z]; }
    			}
    			console.log('aws result', $scope.ai);
    			// create a popup with all information
				var content = '';
				for(c = 0; c < $scope.ai.length; c++) {
					if($scope.ai[c] != undefined) {
						content +=
						'<div class="row">' +
							'<div class="card wide">'+
				                '<div class="item item-divider">'+
				                    $scope.ai[c].item +
				                '</div>'+
				                '<div class="item item-text-wrap">'+
				                    '<p>' + $scope.ai[c].value + '</p>'+
				                '</div>'+
				            '</div>' +
						'</div>';
					}
				}

				// $timeout(function() {
					var alertPopup = $ionicPopup.alert({
						title: $scope.title,
						template: content,
						cssClass: 'aws_popup'
					});
				// }, 1000)
    		}, city)


		}
	})
	.directive('map', function($timeout, $compile, $ionicPopup, $ionicBackdrop, $ionicModal, $rootScope) {
		return {
		    restrict: 'E',
		    scope: {
		      onCreate: '&'
		    },
		    link: function ($scope, $element, $attr) {
		    	function initialize() {
			      	var cities = [
						{ city: 'Piarco', desc: 'Piarco  (BASE) AWS', lat: 10.602912, long: -61.335640 },
						{ city: 'Brasso', desc : 'Brasso Venado AWS', lat : 10.399413, long : -61.317268 },
					    { city: 'Caroni', desc : 'Caroni AWS', lat : 10.606881, long : -61.383883 },
						{ city: 'Chatham', desc: 'Chatham  AWS', lat: 10.115793, long: -61.741620 },
						{ city: 'El Reposo', desc : 'El Reposo AWS', lat : 10.589908, long : -61.114339 },
					    { city: 'Penal', desc: 'Penal AWS', lat: 10.168662, long: -61.437830 },
						{ city: 'Centeno', desc : 'Centeno AWS', lat : 10.352226, long : -61.192286 },
					];

			        var mapOptions = {
			          center: new google.maps.LatLng(10.84584, -60.594896),
			          zoom: 9,
			          mapTypeId: google.maps.MapTypeId.ROADMAP
			        };
			        var map = new google.maps.Map($element[0], mapOptions);

			        $scope.onCreate({map: map});

			        navigator.geolocation.getCurrentPosition(function(pos) {
			            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			        });

			        // Stop the side bar from dragging when mousedown/tapdown on the map
			        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
			          e.preventDefault();
			          return false;
			        });

			        $scope.markers = [];
			    	var createMarker = function(info) {
			    		var marker = new google.maps.Marker({
			    			position: new google.maps.LatLng(info.lat, info.long),
			    			map: map,
			    			animation: google.maps.Animation.DROP,
			    			title: info.city,
			    			// icon: ' '
			    		});
			    		$scope.markers.push(marker);
			    		marker.addListener('click', function() {
			    			$rootScope.ace(this.title);
						});
				    }

			    	for(i = 0; i< cities.length; i++) {
			    		createMarker(cities[i]);
			    	}

		    	}// end of init

			    if (document.readyState === "complete") {
			    	initialize();
			    } else {
			    	google.maps.event.addDomListener(window, 'load', initialize);
			    }
			}
	  	}
	});
