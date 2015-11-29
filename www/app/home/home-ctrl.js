// weather app based on driftyco ionic-weather
// https://github.com/driftyco/ionic-weather
angular.module('ionic.metApp')
	.controller('HomeCtrl', function(metApi, $scope, $timeout, $rootScope, Weather, Geo, Flickr, $ionicModal, $ionicPlatform, $ionicPopup, $interval, $ionicBackdrop) {
		var _this = this;
		$scope.activeBgImageIndex = 0;
		$scope.has_images = false; // bool: tells us if we have images in cache or not
		//  - - - - - - - - - - - - - - -  -
		// interval block: how ofter the app will refresh it's data \\
		var interval = 10 * 60000;
		$interval(function time() {
			$scope.refreshData();
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

		// gets the uv_index form out met factory
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
				$scope.hour_of_day = hour_of_day();
				// drop all uv_info not for today
				for (var i = 0; i < data.items.length; i++) {
					var uv_date_clean = data.items[i].uv_date;
					if (d == uv_date_clean) {
						today_index.push(data.items[i]);
					}
				}
				console.log('uv values for today', today_index);
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
					var ci = i == 0 || i == 1 ? 0 : i == 11 || i > 11 ? (11 - 1) : i - 1;
					$scope.uv_color = uv_c[ci];

					$scope.$watch('uv_color', function() {
						var el = document.getElementById('uv-index');
						el.className = el.className + " " + $scope.uv_color;
						console.log('uv color value', $scope.uv_color, ci, i);
						console.log("watch on uv_value updated")
					})
				}

			})
		}
		_this.get_uv_index();

		// $scope.w_today = function() {
		// 	var day = "PRESENT";
		// 	var newDay = angular.element(document.querySelector('#day'));
		// 	var real = angular.element(document.querySelector('#temptemp'));
		// 	var result = angular.element(document.querySelector('#today-temp'));
		// 	result.text(real.text());
		// 	newDay.text(day);
		// }

		// $scope.w_tomorrow = function() {
		// 	var day = "TOMORROW";
		// 	var newDay = angular.element(document.querySelector('#day'));
		// 	var result = angular.element(document.querySelector('#today-temp'));
		// 	result.text(30);
		// 	newDay.text(day);
		// }

		// $scope.w_nextDay = function() {
		// 	var day = "NEXT DAY";
		// 	var newDay = angular.element(document.querySelector('#day'));
		// 	var result = angular.element(document.querySelector('#today-temp'));
		// 	result.text(31);
		// 	newDay.text(day);
		// }

		_this.metars = function() {
			metApi.get_metar(function(data) {
				var m = data.items;
				// gets the current temp, we only care about the exact number so pull that out from the string
				$scope.current_temp = m[2].value.substring(0, 3);
				// these are the ids of the metas we want for trinidad
				var ids = [{
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
				}, {
					'id': 9, // weather
					'icon': 'icon ion-umbrella',
					'el': 'weather'
				}]; //[2, 3, 4, 5, 8, 9];

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
				// _this.temp = m[2];
				// _this.dew = m[3];
				// _this.pressure = m[4];
				// _this.wind = m[5];
				// _this.wind = m[8];
				// _this.weather = m[9];
				console.log("metars temp")
				console.log(_this.mdata)

				// other metar data for the slide up will come here
				// console.log(data)
			})
		}

		// 3 dat forecast data
		_this.forecast = function(t) { // can be input of the country we load data for
			metApi.get_o_tv(function(data) {
				console.log("outlook tv")
				var i = data.items[0];
				$scope.summary_text = i.textArea1;
				console.log(data)

				// 3- day forecast
				// days as text
				$scope.t = day_string(0);
				$scope.tm = day_string(1);
				$scope.nd = day_string(2);
				// will need to find a way to switch between trin and bago here
				_this.th = i.maxTrin24look;
				_this.tl = i.minTrin24look;
				_this.tmh = i.maxTrin48look;
				_this.tml = i.minTrin48look;
				// console.log(_this.tml)
				// vm.ndh = i.
				// vm.ndl - i.
				// console.log($scope.nd)
			})
		}

		// get current location based on device latitude and longitude, this feeds off google map api
		_this.getCurrent = function(lat, lng) {
			Weather.getAtLocation(lat, lng).then(function(resp) {
				$scope.current = resp.data;




				// console.log("current")
				// console.log(resp.data)
				$rootScope.$broadcast('scroll.refreshComplete');
				var s = timeOfDay(); // time of day, eg: morning, night
				$scope.today = my_date();; // today is
				// $scope.time = convertTimestamp($scope.current.currently.time); //t.toISOString();
				// fetch a background image from flickr based on out location, time and current weather conditinos
				_this.getBackgroundImage($scope.current.daily.icon + ", trinidad");
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

		$scope.change_country = function() {

		}

		// our home controller freresh method, in charge of updating ion-* content on the forecast page, will trigger other function to update
		$scope.refreshData = function() {
			Geo.getLocation().then(function(position) {
				var lc = "";
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				// google map service will give us a location string based on our current location (or nearest detected location)
				Geo.reverseGeocode(lat, lng).then(function(locString) {
					$scope.currentLocationString = locString;
					// console.log(locString);
				});
				_this.getCurrent(lat, lng);

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
			// get matars data
			_this.metars();
			// forecast
			_this.forecast();
			// update uv
			_this.get_uv_index();
		};

		// show alert: can show any type of alert, its a very generic function
		$scope.showAlert = function(title, message) {
			var alertPopup = $ionicPopup.alert({
				title: title,
				template: message
			})
		}

		// gives us a random background after a refresh
		_this.cycleBgImages = function() {
			$timeout(function cycle() {
				if ($scope.bgImages) {
					$scope.activeBgImage = $scope.bgImages[$scope.activeBgImageIndex++ % $scope.bgImages.length];
				}
			})

			$scope.country = $scope.currentLocationString.indexOf('Tobago') > -1 ? 'Tobago' : 'Trinidad';

			console.log($scope.country);

		}

		// gets images from flickr, consimes flicker api, with s failed attempt to cache images in local storage
		this.getBackgroundImage = function(locString) {

			var photo_store = $scope.bgImages;
			// console.log("Has images: " + $scope.has_images);
			if ($scope.has_images) {
				// console.log('we have loaded images');
				// $scope.bgImages = window.localStorage.getItem('photo_store');
				// console.log($scope.bgImages);
				_this.cycleBgImages();

			} else {
				Flickr.search(locString).then(function(resp) {
					var photos = resp.photos;
					var images = [];
					// console.log("Photos");
					// console.log(resp);
					if (photos.photo.length) {
						$scope.bgImages = photos.photo;
						// console.log($scope.bgImages);
						// var photo_store = window.localStorage.getItem('photo_store');
						// if (photo_store) {

						// } else {

						for (i = 0; i < 20; i++) {
							images.push({
								i: $scope.bgImages[i]
							});
						}
						// images = {
						// 	'0': 1
						// }
						// images = angular.extend({}, images, images);
						// }

						// console.log('photo store empty');
						// window.localStorage['photo_store'] = images; //JSON.stringify(images);
						// }
						// console.log(images);
						_this.cycleBgImages();
						$scope.has_images = true;
					}
				}, function(error) {
					console.log('Unable to get Flickr images', error);
				})
			}

		}

		$scope.refreshData();


		// this is supposed to give us today's forecast
		// _this.getForecast = function() {
		// 	metApi.get_forecast(function(data) {
		// 		console.log(data)
		// 		// _this.bulletins = data.items[0];
		// 	});
		// }
		// _this.getForecast();

		// helper functins
		// they help format dates and stuff

		// get us the time of day as a string
		function timeOfDay() {
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
		function hour_of_day() {
			var d = new Date();
			var t = d.getHours();
			if (t >= 0 && t < 12) {
				t = (t == 0 ? '12' : t) + 'am';
			}
			if (t > 12) {
				t = (t - 12) + 'pm';
			}

			return t;
		}

		// a full date in array
		function my_date() {
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			var today = new Date();
			return [days[today.getDay()], today.getDate(), months[today.getMonth()], today.getFullYear()];
		}

		// return a string of any day from the current day
		// @ add_days will be the number of days to add to today
		function day_string(add_days) {
			var today = new Date();
			var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
			return days[today.getDay() + add_days];
		}

		// convert a unix timestamp to a full date
		function convertTimestamp(UNIX_timestamp) {
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

		// show out met services menu as a partial modal
		$scope.showHomeMenu = function() {
			$ionicBackdrop.retain();
			if (!$scope.home_menu_modal) {
				// load modal from given template URL
				$ionicModal.fromTemplateUrl('app/home/home_menu.html', function(hm_modal) {
					$scope.home_menu_modal = hm_modal;
					$scope.home_menu_modal.show();
				}, {
					// animation we want for modal entrance
					// animation: 'scale-in'
					animation: 'slide-in-up'
				})
			} else {
				$scope.home_menu_modal.show();
			}
		}

		// close any modal found in the scope
		// also special case: if modal is a child of met services menu then open parent
		$scope.closeModal = function(a) {
			$scope.modal.hide();
			if (a == "show_home") {
				$scope.showHomeMenu();
			}
		}

		$scope.$on('modal.hidden', function() {
			$ionicBackdrop.release();
		})

		// open uv modal from met services menu
		$scope.uv_modalOpen = function() {
			$ionicBackdrop.retain();
			$scope.modal.hide();
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
				// $ionicBackdrop.retain()
			}
		}
	})

.controller('SettingsCtrl', function($scope, Settings) {
	$scope.setings = Settings.getSettings();

	// watch for settings changes and save them if necessary
	$scope.$watch('settings', function(v) {
		Settings.save();
	}, true);

	$scope.closeSettings = function() {
		$scope.modal.hide();
		Settings.save();
	}

	$scope.changeCurrentTemp = function(type) {
		Settings.set('tempUnits', type);
		Settings.save(type)
	}
})
