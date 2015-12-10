angular.module('ionic.metApp').controller('ServicesCtrl', function(Radars, metApi, $scope, $ionicLoading, $timeout, $ionicModal, $cordovaDevice, $ionicPlatform, $cordovaPush, $ionicSlideBoxDelegate) {

	var sc = this;

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
	sc.get_elnino = function() {
		metApi.get_elnino(function(data) {
			sc.el_info = data.items;
			console.log("el nino");
			console.log(data.items[0]);

			var headings = [data.items[0].head1, data.items[0].head2, data.items[0].head3,data.items[0].head4,data.items[0].head5, data.items[0].head6, data.items[0].head7, data.items[0].head8, data.items[0].head9,data.items[0].head10];

			sc.paragraphs = [data.items[0].para1, data.items[0].para2,, data.items[0].para3, data.items[0].para4, data.items[0].para12, data.items[0].para22,, data.items[0].para32, data.items[0].para42, data.items[0].para13, data.items[0].para23, data.items[0].para33, data.items[0].para43, data.items[0].para14, data.items[0].para24, data.items[0].para34, data.items[0].para44, data.items[0].para15, data.items[0].para25, data.items[0].para35, data.items[0].para45, data.items[0].para16, data.items[0].para26, data.items[0].para36, data.items[0].para46, data.items[0].para17, data.items[0].para27, data.items[0].para37, data.items[0].para47, data.items[0].para18,, data.items[0].para28, data.items[0].para38, data.items[0].para48, data.items[0].para19, data.items[0].para29, data.items[0].para39, data.items[0].para49, data.items[0].para20, data.items[0].para30, data.items[0].para40, data.items[0].para1, data.items[0].para50,]

			sc.real_headings = [];
			

			for(var i=0; i<10; i++){
				if (headings[i]) {
					sc.real_headings[i] = (headings[i]);					
				};				
			};


			//var count = 0;

			// for(var a=0; a<sc.real_headings.length; a++){

			// 	for (var p=count; p<4; count++) {
			// 		sc.real_para[p] = paragraphs[p];
			// 	};				 
			// 	console.log(sc.real_headings[a]);		
			// };

			// for(var e=0; e<sc.real_para.length; e++){

							 
			// 	console.log(sc.real_para[e]);		
			// };



			//bla = data.items[0].head1;

			/*sc.headings = [];
			var num = 1;
			for (var i = 0; i < 10; i++) {
				if (data.items[0].head+"1"){
					sc.headings[0] = data.items[0].head+"1";
					console.log(sc.headings[0]);
				};

				num++;
			};
*/
			
		})
	}
	sc.get_rainandtemp = function() {
		metApi.get_rainandtemp(function(data) {
			sc.rt = data.items;
			/*console.log("rain and temp")
			console.log(data)*/
		})
	}
	sc.get_drywet = function() {
		metApi.get_drywet(function(data) {
			sc.dw = data.items;
			/*console.log("dry wet")
			console.log(data)*/
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
			var ids = [{
				'id': 1, // metar fir
				'icon': 'icon ion-ios-location-outline',
				'el': 'met-loc',
				'show': true
			}, {
				'id': 2, // text
				'icon': 'icon ion-thermometer',
				'el': null,
				'show': false
			}, {
				'id': 3, // temp
				'icon': 'icon ion-thermometer',
				'el': 'temp',
				'show': true
			}, {
				'id': 4, // dewpoint
				'icon': 'icon ion-waterdrop',
				'el': 'dew',
				'show': true
			}, {
				'id': 5, // pressure
				'icon': 'icon ion-ios-speedometer-outline',
				'el': 'pressure',
				'show': true
			}, {
				'id': 6, // winds
				'icon': 'icon ion-ios-analytics-outline',
				'el': 'winds',
				'show': true
			}, {
				'id': 7, // visibility
				'icon': 'icon',
				'el': 'weather',
				'show': false
			}, {
				'id': 8, // ceiling
				'el': 'weather',
				'show': false
			}, {
				'id': 9, // clouds
				'icon': 'icon ion-ios-cloudy-outline',
				'el': 'clouds',
				'show': true
			}, {
				'id': 10, // weather
				'icon': 'icon ion-umbrella',
				'el': 'weather',
				'show': false
			}];

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
	.controller('RadarDetailCtrl', function($scope, $stateParams, metApi, Radars) {
		// $scope.radar = radar_list.get($stateParams.chatId);
		var rdc = this;
		$scope.get_radar_detail = function() {
			console.log("here")
			rdc.radar = Radars.get($stateParams.id);
			metApi.get_radar(function(data) {

				//sc.aviation_items = data.items;

				// rdc.radar = data;
				var image = new Image();
				image.src = data.image_src;
				image.style.maxWidth = "100%";

				var img_div = $('.img_holder');
				img_div.html(image);
				img_div.find('img').wrap('<a href="' + data.image_src + '" class="swipebox" title="' + rdc.radar.title + '"></a>')

				// $('.scroll-content.ionic-scroll.has-header, .bar.no-border.blue').addClass('blur_small')
				console.log('radar image', data)
				// console.log(i);
			}, $stateParams.id);
			rdc.radar = Radars.get($stateParams.id)

			// get text based details of radar
			console.debug('radar item detail', Radars.get($stateParams.id))
		}
		$scope.reload_page = function() {
			// alert();
			$state.go($state.current, {}, {
				reload: true
			});
		}
		// $scope.get_radar_detail();
		// console.log($stateParams.id)
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
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/eht7.png',
				'title': 'EHT (Echo Height Top)',
				'sub': 'Gives a representation of the height to which the top of the clouds extend.',
				'cat': 150
			}, {
				'id': 2,
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/hwind7.png',
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
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/ppi7.png',
				'title': 'PPI (Plan Position Indicator)',
				'sub': 'A representation of the cloud echoes in a horizontal plane.',
				'cat': 150
			}, {
				'id': 6,
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/sri7.png',
				'title': 'SRI (Surface Rainfall Intensity)',
				'sub': 'An estimate of rainfall intensity associated with different echoes.',
				'cat': 150
			}, {
				'id': 7,
				'img': 'http://190.58.130.190/web/aviation/RadarPages2014/150km/vvp7.png',
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
	});
