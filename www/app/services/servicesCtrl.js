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

	}
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// calls for climate data
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	sc.get_elninos = function() {
		metApi.get_elninos(function(data) {
			sc.el_infos = data[0];
			// console.log("el nino");
			// console.log(data);
		})
		// get option files
		metApi.get_option_files(function(data) {
			sc.ii = [$scope.image1 = 'data: ;base64,' + data['elnino0'].data, $scope.image2 = 'data: ;base64,' + data['elnino1'].data, $scope.image3 = 'data: ;base64,' + data['elnino2'].data];
			img_builder(sc.ii, '.nino_i', 'El Nino');
		}, '/file/search?category=elnino')
	}

	$('body').on('click', '.swipebox', function(e) {
		e.preventDefault();
		var img = $(this).attr('href')
		$scope.showImages(img);
	})

	$scope.showImages = function(index) {
		$scope.showModal('app/services/radar/radar_image_modal.html');
		$timeout(function() {
			var image = new Image();
			image.src = index;
			var img_div = $('.modal_img');
			img_div.html(image);
		}, 300)
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
		console.debug('modal', $scope.modal)
		$scope.modal.hide();
		// $scope.modal.remove();
	}

	$scope.updateSlideStatus = function(slide) {
		var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition.zoom;
		if (zoomFactor == $scope.zoomMin) {
			$ionicSlideBoxDelegate.enableSlide(true);
		} else {
			$ionicSlideBoxDelegate.enableSlide(false);
		}
	}

	sc.get_rainandtemp = function() {
		metApi.get_rainandtemp(function(data) {
			sc.key_list = data.items[0].para1.split('\r\n');
			sc.ir_list = data.items[0].para12.split('\r\n');
			for (x = 0; x < sc.key_list.length; x++) {
				sc.key_list[x].trim();
			}
			for (x = 0; x < sc.ir_list.length; x++) {
				sc.ir_list[x].trim();
			}

			sc.rt = data.items[0];
		})
		// get option files
		metApi.get_option_files(function(data) {
			sc.rti = [$scope.image4 = 'data: ;base64,' + data['rainandtemp0'].data, $scope.image5 = 'data: ;base64,' + data['rainandtemp1'].data];
			img_builder(sc.rti, '.rt_i', 'Rainfall - Temp');
		}, '/file/search?category=rainandtemp')
	}
	sc.get_drywet = function() {
		metApi.get_drywet(function(data) {
			sc.dw = data.items[0];
		})
		// get option files
		metApi.get_option_files(function(data) {
			sc.dwi = [$scope.image6 = 'data: ;base64,' + data['dryandwetspell0'].data];
			img_builder(sc.dwi, '.dw_i', 'Dry/Wet Outlook');
		}, '/file/search?category=dryandwetspell')
	}

	// build image elements for climate page
	function img_builder(img_arr, elem, title) {
		for (x = 0; x < img_arr.length; x++) {
			var image = new Image();
			image.src = img_arr[x];
			image.style.maxWidth = "100%";
			var img_div = $(elem + (x + 1));
			img_div.html(image);
			img_div.find('img').wrap('<a href="' + img_arr[x] + '" class="swipebox" title="' + title + '"></a>')

		}
	}

	sc.agrotrini = function() {
		metApi.get_agrotrini(function(data) {
			sc.atrin = data.items[0];
		})

		// get option files
		metApi.get_option_files(function(data) {
			$scope.image_agro_trin = ['data: ;base64,' + data['agrotrini0'].data];
			img_builder($scope.image_agro_trin, '.trin_i', 'Trinidad Agromet');
		}, '/file/search?category=agrotrini')

		metApi.get_agroData('summary', function(area) {
			sc.sum = area;
		})
	}

	sc.agrotbg = function() {
		metApi.get_agrotbg(function(data) {
			sc.atbg = data.items[0];
		})
		metApi.get_option_files(function(data) {
			$scope.image_agro_bago = ['data: ;base64,' + data['agrotobago0'].data];
			img_builder($scope.image_agro_bago, '.bago_i', 'Tobago Agromet');

		}, '/file/search?category=agrotobago')

		metApi.get_agroDataTbg('summary', function(area) {
			sc.sumtbg = area;
		})
	}

	$ionicModal.fromTemplateUrl('app/services/elrtinfo_item.html', {
		scope: $scope,
		animation: 'scale-in' //modal animation
	}).then(function(elrtinfo_modal) {
		$scope.elrtinfo_modal = elrtinfo_modal;
	});

	$scope.cinfo_open = function(id, m) {
		switch (m) {
			case 'el':
				metApi.get_elnino(function(data) {
					sc.d_item = data.items[0]
				}, id)
				break;
			case 'rt':
				metApi.get_rainandtemp(function(data) {
					sc.d_item = data.items[0]
				}, id)
				break;
			case 'dw':
				metApi.get_drywet(function(data) {
					sc.d_item = data.items[0]
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
		$ionicScrollDelegate.scrollTop();
		$ionicSlideBoxDelegate.slide(to);
	}

	sc.radars_150 = function() {
		sc.radars_150_list = Radars.all_of_cat(150);
	}
	sc.radars_250 = function() {
		sc.radars_250_list = Radars.all_of_cat(250);
	}
	sc.get_radar_400 = function() {
		// alert();
	}

	sc.get_metars = function() {
		metApi.get_metar(function(data) {
			var m = data.items;
			// gets the current temp, we only care about the exact number so pull that out from the string
			// these are the ids of the metas we want for trinidad
			var ids = [
				// metar fir
				{
					'id': 1,
					'icon': 'icon ion-ios-location-outline',
					'el': 'met-loc',
					'show': true
				},
				// text
				{
					'id': 2,
					'icon': 'icon ion-thermometer',
					'el': null,
					'show': false
				},
				// temp
				{
					'id': 3,
					'icon': 'icon ion-thermometer',
					'el': 'temp',
					'show': true
				},
				// dewpoint
				{
					'id': 4,
					'icon': 'icon ion-waterdrop',
					'el': 'dew',
					'show': true
				},
				// pressure
				{
					'id': 5,
					'icon': 'icon ion-ios-speedometer-outline',
					'el': 'pressure',
					'show': true
				},
				// winds
				{
					'id': 6,
					'icon': 'icon ion-ios-analytics-outline',
					'el': 'winds',
					'show': true
				},
				// visibility
				{
					'id': 7,
					'icon': 'icon',
					'el': 'weather',
					'show': false
				},
				// ceiling
				{
					'id': 8,
					'el': 'weather',
					'show': false
				},
				// clouds
				{
					'id': 9,
					'icon': 'icon ion-ios-cloudy-outline',
					'el': 'clouds',
					'show': true
				},
				// weather
				{
					'id': 10,
					'icon': 'icon ion-umbrella',
					'el': 'weather',
					'show': false
				}
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
		})
	}

})
	.controller('RadarDetailCtrl', function($scope, $stateParams, metApi, Radars, $http, $cordovaPush, $ionicPlatform, $rootScope, $ionicLoading, $state, $ionicBackdrop, $ionicModal, $ionicScrollDelegate, $ionicSlideBoxDelegate, $timeout) {
		var rdc = this;
		$scope.close_loading = function() {
			$ionicLoading.hide();
		}
		$scope.get_radar_detail = function() {
			$scope.zoomMin = 1;
			rdc.radar = Radars.get($stateParams.id);
			metApi.get_radar(function(data) {
				var image = new Image();
				image.src = data.data;
				$scope.image = data.data;
				image.style.maxWidth = "100%";
				var img_div = $('.img_holder');
				img_div.html(image);
				img_div.find('img').wrap('<a href="' + $scope.image + '" class="swipebox2" title="' + rdc.radar.title + '"></a>')
			}, rdc.radar.code);
			rdc.radar = Radars.get($stateParams.id);

			$('body').on('click', '.swipebox2', function(e) {
				e.preventDefault();
				$scope.showImages();
			})
		}

		$scope.reload_page = function() {
			$scope.get_radar_detail($stateParams.id);
		}

		$scope.$on('loading:show', function() {
			$ionicLoading.show({
				template: ' <ion-spinner class="light"></ion-spinner><br><button class="button button-light button-block" ng-click="close_loading()">Cancel</button>',
				scope: $scope
			});
		})

		// handle image scrolling and zooming of radar
		$scope.showImages = function(index) {
			$scope.showModal('app/services/radar/radar_image_modal.html');
			$timeout(function() {
				var image = new Image();
				image.src = $scope.image;
				var img_div = $('.modal_img');
				img_div.html(image);
			}, 300)
		}

		$scope.showModal = function(templateUrl) {
			// $ionicBackdrop.retain();
			// console.debug('modals on page', $('.modal-backdrop').length);
			if ($('.modal-backdrop').length > 0) {
				$('.modal-backdrop:not(:last)').remove();
			}

			if (!$scope.modal) {
				$ionicModal.fromTemplateUrl(templateUrl, function(modal) {
					$scope.modal = modal;
					$scope.modal.show();
				}, {
					scope: $scope,
					animation: 'slide-in-up'
				})
			} else {
				$scope.modal.show();
			}
			// console.debug('scope modal in show functino', $scope.modal);
			// $ionicModal.fromTemplateUrl(templateUrl, {
			// 	scope: $scope,
			// 	animation: 'slide-in-up'
			// }).then(function(modal) {
			// 	$scope.modal = modal;
			// 	$scope.modal.show();
			// })
		}

		$scope.closeModal = function() {
			$scope.modal.hide().then(function() {
				$('.modal-backdrop').remove();
				$scope.modal = null;
			})
			// $scope.modal.remove()
			// 	.then(function() {
			// 		$scope.modal = null;
			// 	});
			// $scope.modal.remove();
		}
		$scope.$on('$stateChangeStart', function() {
			// if ($scope.modal) {
			// console.debug('state change start');
			$scope.modal.remove();
			// }
		});

		$scope.updateSlideStatus = function(slide) {
			var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition.zoom;
			if (zoomFactor == $scope.zoomMin) {
				$ionicSlideBoxDelegate.enableSlide(true);
			} else {
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
			'title': 'ETH(Height)',
			'sub': 'Gives a representation of the height to which the top of the clouds extend.',
			'cat': 250,
			'code': '250eth'
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
			'sub': null,
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
}).controller('AWSCtrl', function(metApi, $scope, $timeout, $ionicModal, $ionicPlatform, $ionicPopup, $interval, $ionicBackdrop, $state, $route, $rootScope, $ionicLoading) {
	var _this = this;
	$scope.ai = [];

	$scope.mapCreated = function(map) {
		$scope.map = map;
	};

	$scope.centerOnMe = function() {
		if (!$scope.map) {
			return;
		}

		$ionicLoading.show({
			content: 'Getting current location...',
			showBackdrop: false
		});

		navigator.geolocation.getCurrentPosition(function(pos) {
			$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			$ionicLoading.hide();
		}, function(error) {
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
			for (z = 0; z < length; z++) {
				if (d[z].item == 'Temperature') {
					$scope.ai[0] = d[z];
				}
				if (d[z].item == 'Pressure') {
					$scope.ai[1] = d[z];
				}
				if (d[z].item == 'Gust') {
					$scope.ai[2] = d[z];
				}
				if (d[z].item == 'Precipitation') {
					$scope.ai[3] = d[z];
				}
				if (d[z].item == 'Humidity') {
					$scope.ai[4] = d[z];
				}
				if (d[z].item == 'Wind Direction') {
					$scope.ai[5] = d[z];
				}
				if (d[z].item == 'Wind Speed') {
					$scope.ai[6] = d[z];
				}
			}
			// console.log('aws result', $scope.ai);
			// create a popup with all information
			var content = '';
			for (c = 0; c < $scope.ai.length; c++) {
				// content = 'No data';
				if ($scope.ai[c] != undefined) {
					content +=
						'<div class="row">' +
						'<div class="card wide">' +
						'<div class="item item-divider">' +
						$scope.ai[c].item +
						'</div>' +
						'<div class="item item-text-wrap">' +
						'<p>' + $scope.ai[c].value + '</p>' +
						'</div>' +
						'</div>' +
						'</div>';
				}
			}

			// $timeout(function() {
			var alertPopup = $ionicPopup.alert({
				title: $scope.title,
				template: (content ? content : '<p class="text-center">No data</p>'),
				cssClass: 'aws_popup',
				okText: 'Close'
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
			link: function($scope, $element, $attr) {
				function initialize() {
					var cities = [{
						city: 'Piarco',
						desc: 'Piarco  (BASE) AWS',
						lat: 10.602912,
						long: -61.335640
					}, {
						city: 'Brasso',
						desc: 'Brasso Venado AWS',
						lat: 10.399413,
						long: -61.317268
					}, {
						city: 'Caroni',
						desc: 'Caroni AWS',
						lat: 10.606881,
						long: -61.383883
					}, {
						city: 'Chatham',
						desc: 'Chatham  AWS',
						lat: 10.115793,
						long: -61.741620
					}, {
						city: 'El Reposo',
						desc: 'El Reposo AWS',
						lat: 10.589908,
						long: -61.114339
					}, {
						city: 'Penal',
						desc: 'Penal AWS',
						lat: 10.168662,
						long: -61.437830
					}, {
						city: 'Centeno',
						desc: 'Centeno AWS',
						lat: 10.352226,
						long: -61.192286
					}, ];

					var mapOptions = {
						center: new google.maps.LatLng(10.84584, -60.594896),
						zoom: 9,
						mapTypeId: google.maps.MapTypeId.ROADMAP
					};
					var map = new google.maps.Map($element[0], mapOptions);

					$scope.onCreate({
						map: map
					});

					navigator.geolocation.getCurrentPosition(function(pos) {
						map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
					});

					// Stop the side bar from dragging when mousedown/tapdown on the map
					google.maps.event.addDomListener($element[0], 'mousedown', function(e) {
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

					for (i = 0; i < cities.length; i++) {
						createMarker(cities[i]);
					}

				} // end of init

				if (document.readyState === "complete") {
					initialize();
				} else {
					google.maps.event.addDomListener(window, 'load', initialize);
				}
			}
		}
	});
