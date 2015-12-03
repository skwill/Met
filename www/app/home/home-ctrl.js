// weather app based on driftyco ionic-weather
// https://github.com/driftyco/ionic-weather
angular.module('ionic.metApp')
	.controller('HomeCtrl', function(metApi, $scope, $timeout, $rootScope, Weather, Geo, Flickr, $ionicModal, $ionicPlatform, $ionicPopup, $interval, $ionicBackdrop, $state) {
		var _this = this;
		$scope.activeBgImageIndex = 0;
		// $scope.country = '';
		$scope.isFlipped = false;
		//  - - - - - - - - - - - - - - -  -
		// interval block: how ofter the app will refresh it's data \\
		var interval = 10 * 60000;
		$interval(function time() {
			// $scope.refreshData();
			console.log("fetch info and location")
		}, interval);

		$rootScope.$on("call_test", function() {
			$scope.test();
			// $scope.$emit("pingBack", $scope.test());
		})
		// this ,ethod will be called from a parent controller in the app.js file
		$scope.test = function() {
			return "LOL";
		}
		// end if interval block

		//  - - - - - - - - - - - - - - - - - - -
		// MET API functions: all function look to met factory for consuming data

		$scope.set_due_point = function(idx, arr) {
			var p = arr[idx].value;
			// console.log('dew point', p);
			var pat = /([0-9\.]+)%/g;
			// if tobago then switch to tobago dewpoint
			return (r = pat.exec(p))[0];
		}

		// show alert: can show any type of alert, its a very generic function
		$scope.showAlert = function(title, message) {
			var alertPopup = $ionicPopup.alert({
				title: title,
				template: message
			})
		}

		$scope.flip = function(country) {
			$scope.isFlipped = !$scope.isFlipped;
			console.debug($scope)
			if (country == "Trinidad") {
				$rootScope.ref_trin();
			} else {
				$rootScope.ref_bago();
			}
		}

		// close any modal found in the scope
		// also special case: if modal is a child of met services menu then open parent
		$scope.closeModal = function(a) {
			$scope.modal.hide();
		}

		$scope.$on('modal.hidden', function() {
			$ionicBackdrop.release();
		})

		// open uv info modal
		$scope.uv_modalOpen = function() {
			$ionicBackdrop.retain();
			if (!$scope.uv_modal) {
				$ionicModal.fromTemplateUrl('app/home/uv_modal.html', function(uv_modal) {
					$scope.uv_modal = uv_modal;
					$scope.uv_modal.show();
				}, {
					// animation we want for modal entrance
					// animation: 'scale-in'
					animation: 'slide-in-up'
				})
			} else {
				$scope.uv_modal.show();
			}
		}


		// helper functins
		// they help format dates and stuff
		// get us the time of day as a string
		$scope.timeOfDay = function() {
			var date = new Date();
			var time = date.getHours();
			var s = "";

			if (time >= 6 && time < 12) {
				s = "morning";
			} else if (time >= 12 && time < 18) {
				s = "mid day";
			} else if (time >= 18) {
				s = "night";
			};

			return s;
		}

		// get us the hour of day: primarily for displaying the uv index hour
		$scope.hourOfDay = function() {
			var d = new Date();
			var t = d.getHours();
			if (t >= 0 && t <= 12) {
				t = (t == 0 ? '12' : t) + 'am';
			}
			if (t > 12) {
				t = (t - 12) + 'pm';
			}
			return t;
		}

		// a full date in array
		$scope.my_date = function() {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			var today = new Date();
			return [days[today.getDay()], today.getDate(), months[today.getMonth()], today.getFullYear()];
		}

		// return a string of any day from the current day
		// @ add_days will be the number of days to add to today
		$scope.day_string = function(add_days) {
			var today = new Date();
			var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			return days[today.getDay() + add_days];
		}

		// convert a unix timestamp to a full date
		$scope.convertTimestamp = function(UNIX_timestamp) {
			var a = new Date(UNIX_timestamp * 1000);
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var year = a.getFullYear();
			var month = months[a.getMonth()];
			var date = a.getDate();
			var hour = a.getHours();
			var min = a.getMinutes();
			var sec = a.getSeconds();
			var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
			return time;
		}

		function is_word_in_string(string, word) {
			return new RegExp('\\b' + word + '\\b', 'i').test(string);
		}
	})
	.directive('dayIcon', function($timeout) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/home/svg/icon-sunny.html',
			link: function($scope, $element, $attr) {}
		}
	})
	.controller('TrinCtrl', function(metApi, $scope, $timeout, $rootScope, Weather, Geo, Flickr, $ionicModal, $ionicPlatform, $ionicPopup, $interval, $ionicBackdrop, $state) {
		var _this = this;

		$rootScope.ref_trin = function() {
			_this.refreshData();
		}

		_this.refreshData = function() {
			Geo.getLocation().then(function(position) {
				var lc = "";
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				// google map service will give us a location string based on our current location (or nearest detected location)
				Geo.reverseGeocode(lat, lng).then(function(locString) {
					$scope.currentLocationString = locString;
					$scope.country = $scope.currentLocationString.indexOf('Tobago') > -1 ? 'Tobago' : 'Trinidad';
					_this.getCurrent(lat, lng);
					_this.get_uv_index();
					_this.metars_trin();
					_this.trin_3day();
				});
			}, function(error) {
				// in some cases something may go wrong
				// most times locatio service for android may be turned off
				if (error.message == 'The last location provider was disabled') {
					error.message = error.message + "<br> Try enabling Location services in Settings";
				}
				$scope.showAlert('Unable to get current location', 'Try enabling Location services in Settings');
				$scope.currentLocationString = "Unable to get current location:" + error;
				$rootScope.$broadcast('scroll.refreshComplete');
			});

		};

		_this.getCurrent = function(lat, lng) {
			Weather.getAtLocation(lat, lng).then(function(resp) {
				$scope.current = resp.data;
				$rootScope.$broadcast('scroll.refreshComplete');
				var s = $scope.timeOfDay(); // time of day, eg: morning, night
				$scope.today = $scope.my_date();; // today is
				// $scope.time = convertTimestamp($scope.current.currently.time); //t.toISOString();
				// fetch a background image from flickr based on out location, time and current weather conditinos
				console.log('currently', $scope.current)
				_this.getBackgroundImage($scope.current.currently.summary + ", Trinidad");
			}, function(error) {
				var errorTxt = "";
				switch (error.status) {
					case 404:
						errorTxt = "No network connection";
						break;
					case 'The last location provider was disabled': // attempt to catch error of location services being disabled
						errorTxt = error.status + "<br> Try enabling Location services in Settings";
						break;
				}
				$scope.showAlert('Unable to get current conditions', errorTxt);
				$rootScope.$broadcast('scroll.refreshComplete');
			});
		};

		// gives us a random background after a refresh
		_this.cycleBgImages = function() {
			$timeout(function cycle() {
				if ($scope.bgImages) {
					$scope.activeBgImage = $scope.bgImages[$scope.activeBgImageIndex++ % $scope.bgImages.length + 3];
				}
			})
		}

		// gets images from flickr, consimes flicker api, with s failed attempt to cache images in local storage
		this.getBackgroundImage = function(locString) {
			Flickr.search(locString).then(function(resp) {
				var photos = resp.photos;
				$scope.bgImages = photos.photo;
				_this.cycleBgImages();
			}, function(error) {
				console.log('Unable to get Flickr images', error);
			})
		}

		_this.get_uv_index = function() {
			var today_index = [];
			// these indexes represent uv values. but instead of using the value directly we use a color in place of the index to represent the value
			// the index will match to a color class to represent the uv_index value on the summary page
			var uv_c = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11'];
			metApi.get_uv_index(function(data) {
				// console.log(data);
				console.log("UV Index: ");
				var today = new Date();
				var d = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
				$scope.hour_of_day = $scope.hourOfDay();
				// drop all uv_info not for today
				for (var i = 0; i < data.items.length; i++) {
					var uv_date_clean = data.items[i].uv_date.trim();
					if (d == uv_date_clean) {
						today_index.push(data.items[i]);
					}
				}
				if (today_index.length) {
					$scope.uv_index = today_index[today_index.length - 1];
					var ii = Number($scope.uv_index.uv_value);
					var i = ii.toFixed(0);
					$scope.uv_index.uv_value = i; // our scope uv variable
					console.log($scope.uv_index);

					// find uv index color
					// uv range color values array will come here
					// ii = 2;
					// ensure the uv value matches the correct color class
					// i = 10;
					var ci = i == 0 || i == 1 ? 0 : i == 11 || i > 11 ? (11 - 1) : i - 1;
					$scope.uv_color = uv_c[ci];

					$scope.$watch('uv_color', function() {
						var el = document.getElementById('uv-index');
						el.className = el.className + " " + $scope.uv_color;
						console.log('uv color value', $scope.uv_color, ci, i);
						console.log("watch on uv_value updated");
					})
				} else {
					// just some placeholder data for when the uv index has not been updated yet
					var ti = [{
						'uv_value': 0
					}]
					var el = document.getElementById('uv-index');
					$scope.uv_index = ti[0];
					el.className = el.className + " c1";
				}
			})
		}

		_this.metars_trin = function() {
			metApi.get_metar(function(data) {
				var m = data.items;
				// gets the current temp, we only care about the exact number so pull that out from the string
				$scope.current_temp_trin = m[2].value.substring(0, 3);
				$scope.dew_point_trin = $scope.set_due_point(3, m);
				// these are the ids of the metas we want for trinidad
				var ids = [{
						'id': 0, // metar fir
						'icon': 'icon ion-ios-location-outline',
						'el': 'met-loc'
					}, {
						'id': 2, // temperature
						'icon': 'icon ion-thermometer',
						'el': 'temp'
					}, {
						'id': 3, // dewpoint
						'icon': 'icon ion-waterdrop',
						'el': 'dew'
					}, {
						'id': 4, // pressure
						'icon': 'icon ion-ios-speedometer-outline',
						'el': 'pressure'
					}, {
						'id': 5, // winds
						'icon': 'icon ion-ios-analytics-outline',
						'el': 'winds'
					}, {
						'id': 8, // clouds
						'icon': 'icon ion-ios-cloudy-outline',
						'el': 'clouds'
					}
					/*, {
					'id': 9, // weather
					'icon': 'icon ion-umbrella',
					'el': 'weather'
				}*/
				];

				$scope.summary_text_trin = m[1].value.indexOf('NOSIG') > -1 ? 'Clear ' + $scope.timeOfDay() : '';

				_this.mdata = [];
				for (i = 0; i < ids.length; i++) {
					_this.mdata.push({
						'id': m[ids[i].id].id,
						'label': m[ids[i].id].label,
						'station': m[ids[i].id].station,
						'value': m[ids[i].id].value,
						'icon': ids[i].icon,
						'el': ids[i].el,
					});
				}
			})
		}

		$scope.showMetarsTrin = function() {
			$ionicBackdrop.retain();
			if (!$scope.mettrin_modal) {
				// load modal from given template URL
				$ionicModal.fromTemplateUrl('app/home/metars-trin.html', function(mt_modal) {
					$scope.mettrin_modal = mt_modal;
					$scope.mettrin_modal.show();
				}, {
					// animation we want for modal entrance
					// animation: 'scale-in'
					animation: 'slide-in-up'
				})
			} else {
				$scope.mettrin_modal.show();
			}
		}
		_this.trin_3day = function(t) { // can be input of the country we load data for
			metApi.get_o_tv(function(data) {
				var i = data.items[0];
				// 3- day forecast
				// days as text
				$scope.t = $scope.day_string(0);
				$scope.tm = $scope.day_string(1);
				$scope.nd = $scope.day_string(2);
				// will need to find a way to switch between trin and bago here
				_this.max24 = i.maxTrin24look;
				_this.min24 = i.minTrin24look;
				_this.max48 = i.maxTrin48look;
				_this.min48 = i.minTrin48look;
			})

			// get forecast
			metApi.get_forecast(function(data) {
				var f = data.items[0];
				$scope.fcast = f.imageTrin;
			})
		}

		_this.refreshData();

	})
	.controller('BagoCtrl', function(metApi, $scope, $timeout, $rootScope, Weather, Geo, Flickr, $ionicModal, $ionicPlatform, $ionicPopup, $interval, $ionicBackdrop, $state) {
		var _this = this;

		// refresh when we flip screen
		$rootScope.ref_bago = function() {
			_this.refreshData();
		}

		_this.refreshData = function() {
			Geo.getLocation().then(function(position) {
				var lc = "";
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				// google map service will give us a location string based on our current location (or nearest detected location)
				Geo.reverseGeocode(lat, lng).then(function(locString) {
					$scope.currentLocationString = locString;
					// $scope.country = $scope.currentLocationString.indexOf('Tobago') > -1 ? 'Tobago' : 'Trinidad';
					_this.getCurrent(lat, lng);
					// _this.get_uv_index();
					_this.metars_bago();
					_this.bago_3day();
					_this.set_time_bubble();
				});
			}, function(error) {
				// in some cases something may go wrong
				// most times locatio service for android may be turned off
				if (error.message == 'The last location provider was disabled') {
					error.message = error.message + "<br> Try enabling Location services in Settings";
				}
				$scope.showAlert('Unable to get current location', 'Try enabling Location services in Settings');
				$scope.currentLocationString = "Unable to get current location:" + error;
				$rootScope.$broadcast('scroll.refreshComplete');
			});

		};

		_this.getCurrent = function(lat, lng) {
			Weather.getAtLocation(lat, lng).then(function(resp) {
				$scope.current = resp.data;
				$rootScope.$broadcast('scroll.refreshComplete');
				var s = $scope.timeOfDay(); // time of day, eg: morning, night
				$scope.today = $scope.my_date();; // today is
				// $scope.time = convertTimestamp($scope.current.currently.time); //t.toISOString();
				// fetch a background image from flickr based on out location, time and current weather conditinos
				console.log('currently', $scope.current)
				_this.getBackgroundImage($scope.current.currently.summary + ", Tobago");
			}, function(error) {
				var errorTxt = "";
				switch (error.status) {
					case 404:
						errorTxt = "No network connection";
						break;
					case 'The last location provider was disabled': // attempt to catch error of location services being disabled
						errorTxt = error.status + "<br> Try enabling Location services in Settings";
						break;
				}
				$scope.showAlert('Unable to get current conditions', errorTxt);
				$rootScope.$broadcast('scroll.refreshComplete');
			});
		};

		// gives us a random background after a refresh
		_this.cycleBgImages = function() {
			$timeout(function cycle() {
				if ($scope.bgImages) {
					$scope.activeBgImage = $scope.bgImages[$scope.activeBgImageIndex++ % $scope.bgImages.length];
				}
			})
		}

		// gets images from flickr, consimes flicker api, with s failed attempt to cache images in local storage
		this.getBackgroundImage = function(locString) {
			Flickr.search(locString).then(function(resp) {
				var photos = resp.photos;
				$scope.bgImages = photos.photo;
				_this.cycleBgImages();
			}, function(error) {
				console.log('Unable to get Flickr images', error);
			})
		}

		_this.metars_bago = function() {
			metApi.get_metar(function(data) {
				var m = data.items;
				$scope.current_temp = m[11].value.substring(0, 3);
				$scope.dew_point = $scope.set_due_point(12, m);
				$scope.summary_text = m[10].value.indexOf('NOSIG') > -1 ? 'Clear ' + $scope.timeOfDay() : m[19].value;
				// ids of metars for tobago
				var ids = [{
					'id': 10, // metar for
					'icon': 'icon ion-ios-location-outline',
					'el': 'met-loc'
				}, {
					'id': 11, // temperature
					'icon': 'icon ion-thermometer',
					'el': 'temp'
				}, {
					'id': 12, // dewpoint
					'icon': 'icon ion-waterdrop',
					'el': 'dew'
				}, {
					'id': 13, // pressure
					'icon': 'icon ion-ios-speedometer-outline',
					'el': 'pressure'
				}, {
					'id': 14, // winds
					'icon': 'icon ion-ios-analytics-outline',
					'el': 'winds'
				}, {
					'id': 17, // clouds
					'icon': 'icon ion-ios-cloudy-outline',
					'el': 'clouds'
				}, {
					'id': 19, // weather
					'icon': 'icon ion-umbrella',
					'el': 'weather'
				}];

				_this.mdatab = null;
				_this.mdatab = [];
				for (i = 0; i < ids.length; i++) {
					_this.mdatab.push({
						'id': m[ids[i].id].id,
						'label': m[ids[i].id].label,
						'station': m[ids[i].id].station,
						'value': m[ids[i].id].value,
						'icon': ids[i].icon,
						'el': ids[i].el,
					});
				}
			})
		}

		_this.set_time_bubble = function() {
			// these indexes represent uv values. but instead of using the value directly we use a color in place of the index to represent the value
			// the index will match to a color class to represent the uv_index value on the summary page
			var today = new Date();
			var d = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
			$scope.hour_of_day = $scope.hourOfDay();
		}

		$scope.showMetarsBago = function() {
			$ionicBackdrop.retain();
			if (!$scope.metbago_modal) {
				// load modal from given template URL
				$ionicModal.fromTemplateUrl('app/home/metars-bago.html', function(mb_modal) {
					$scope.metbago_modal = mb_modal;
					$scope.metbago_modal.show();
				}, {
					// animation we want for modal entrance
					// animation: 'scale-in'
					animation: 'slide-in-up'
				})
			} else {
				$scope.metbago_modal.show();
			}
		}

		_this.bago_3day = function(t) { // can be input of the country we load data for
			metApi.get_o_tv(function(data) {
				var i = data.items[0];
				// 3- day forecast
				// days as text
				// need to find a bettwe way to do this as it will fail at the end of the week
				$scope.t = $scope.day_string(0);
				$scope.tm = $scope.day_string(1);
				$scope.nd = $scope.day_string(2);
				_this.max24 = i.maxTbo24look;
				_this.min24 = i.minTbo24look;
				_this.max48 = i.maxTob48look;
				_this.min48 = i.minTob48look;
			})

			// get forecast
			metApi.get_forecast(function(data) {
				var f = data.items[0];
				$scope.fcast = f.imagebago;
			})
		}

		_this.refreshData();

	})
