// weather app based on driftyco ionic-weather
// https://github.com/driftyco/ionic-weather
angular.module('ionic.metApp' /*, */ )
// .directive('interval_tracker', ['$interval', 'dateFilter',
// 	function($interval, dateFilter) {
// 		return function(scope, element, attrs) {
// 			var format, stopTime;
// 			// used to update ui
// 			function updateTime() {
// 				console.log(dateFilter(new Date(), format));
// 			}

// 			scope.$watch(attrs.interval_tracker, function(value) {
// 				format = value
// 				updateTime();
// 			})
// 			stopTime = $interval(updateTime, 1000);
// 		}
// 	}
// ])
.controller('HomeCtrl', function(metApi, $scope, $timeout, $rootScope, Weather, Geo, Flickr, $ionicModal, $ionicPlatform, $ionicPopup, $interval) {

	var _this = this;

	var interval = 10 * 60000;
	$interval(function time() {
		$scope.refreshData();
		console.log("fetch info and location")
	}, interval);

	$rootScope.$on("call_test", function() {
		$scope.test();
		// $scope.$emit("pingBack", $scope.test());
	})

	$scope.test = function() {
		alert("LOL");
		return "LOL";
	}
	

	$scope.w_today = function() {
		var day = "PRESENT";
		var newDay = angular.element(document.querySelector('#day'));
		var real = angular.element(document.querySelector('#temptemp'));
		var result = angular.element(document.querySelector('#today-temp'));
		result.text(real.text());
		newDay.text(day);
		//console.log(real.text());
		//$scope.temp = $scope.currentTemp;$scope.temp = angular.element(document.querySelector('#today-temp'));
		/*ar result = angular.element(document.querySelector('#today-temp'));
		result.text($scope.temp.text());
		console.log(result.text());*/
	}

	$scope.w_tomorrow = function() {
		var day = "TOMORROW";
		var newDay = angular.element(document.querySelector('#day'));
		var result = angular.element(document.querySelector('#today-temp'));
		result.text(30);
		newDay.text(day);
		//console.log(result.text());
	}

	$scope.w_nextDay = function() {
		var day = "NEXT DAY";
		var newDay = angular.element(document.querySelector('#day'));
		var result = angular.element(document.querySelector('#today-temp'));
		result.text(31);
		newDay.text(day);
		//console.log(result.text());
	}

	$scope.activeBgImageIndex = 0;
	$scope.has_images = false;

	_this.get_uv_index = function() {
		var today_index = [];
		metApi.get_uv_index(function(data) {
			// console.log(data);
			console.log("UV Index: ");
			var today = new Date();
			var d = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
			$scope.hour_of_day = hour_of_day();
			for (var i = 0; i < data.items.length; i++) {
				var uv_date_clean = data.items[i].uv_date;
				console.log(data.items[i].uv_date);
				if (d == uv_date_clean) {
					today_index.push(data.items[i])
				}
			}
			$scope.uv_index = today_index[today_index.length - 1];
			var ii = Number($scope.uv_index.uv_value);
			var i = ii.toFixed(1);
			$scope.uv_index.uv_value = i;
			console.log($scope.uv_index);
			// uv range color values array will come here
		})
	}
	_this.get_uv_index();




	this.getCurrent = function(lat, lng) {
		// var lc = locString;
		// alert();
		// console.log($scope.lc);
		// console.log(lcc);
		Weather.getAtLocation(lat, lng).then(function(resp) {
			// alert();
			$scope.current = resp.data;
			// console.log('Got Current', $scope.current);
			$rootScope.$broadcast('scroll.refreshComplete');
			var s = timeOfDay();
			var d = my_date();
			console.log(d)
			$scope.today = d;
			// var t = new Date($scope.current.currently.time);
			var f = convertTimestamp($scope.current.currently.time); //t.toISOString();
			$scope.time = f;
			// console.log(f)
			// window.localStorage['last_resfrsh'] = f; //JSON.stringify(_settings);
			// window.localStorage['last_location'] = lc;
			// $scope.last_refresh = window.localStorage.getItem('last_refresh');
			// console.log(window.localStorage.getItem('last_resfrsh'));
			// alert(f);
			// console.log("Date: "+s)
			_this.getBackgroundImage(lat, lng, $scope.current.currently.summary + ", " + $scope.current.daily.icon + ", trinidad, " + s);
			// console.log($scope.current.currently.summary)
		}, function(error) {
			// alert('Unable to get current conditinos');
			var errorTxt = "";
			switch (error.status) {
				case 404:
					errorTxt = "No network connection";
					break;
				case 'The last location provider was disabled': // attempt to catch error of location services being disabled
					errorTxt = error.status + "<br> Try enabling Location services in Settings";
					break;
			}
			// alert(error.status);
			$scope.showAlert('Unable to get current conditions', errorTxt);
			// console.log(error);
			$rootScope.$broadcast('scroll.refreshComplete');
		});
	};
	$scope.refreshData = function() {

		// alert();
		// var c = Geo.getLocation();
		// console.log(Geo.getLocation());
		// if (c) {
		// 	var lat = c.coords.latitude;
		// 	var lng = c.coords.longitude;

		// 	Geo.reverseGeocode(lat, lng).then(function(locString) {
		// 		$scope.currentLocationString = locString;
		// 		// alert($scope.currentLocationString);
		// 	});
		// 	_this.getCurrent(lat, lng);
		// } else {
		// 	$scope.currentLocationString = "Unable to get current location:"; // + error;
		// }
		// console.log(i)
		// alert("outside")
		Geo.getLocation().then(function(position) {
			// alert("inside");
			// alert("here");
			var lc = "";
			// console.log(position.coords);
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;

			Geo.reverseGeocode(lat, lng).then(function(locString) {
				$scope.currentLocationString = locString;

			});
			_this.getCurrent(lat, lng);
		}, function(error) {

			if (error.message == 'The last location provider was disabled') {
				error.message = error.message + "<br> Try enabling Location services in Settings";
			}

			$scope.showAlert('Unable to get current location', 'Try enabling Location services in Settings');
			// console.log(error)
			$scope.currentLocationString = "Unable to get current location:" + error;
			$rootScope.$broadcast('scroll.refreshComplete');
		});
		// console.log("data refreshed");
	};

	$scope.showAlert = function(title, message) {
		var alertPopup = $ionicPopup.alert({
			title: title,
			template: message
		})
	}




	this.cycleBgImages = function() {
		$timeout(function cycle() {
			if ($scope.bgImages) {
				// console.log("in function that uses the image")
				// console.log($scope.bgImages)
				$scope.activeBgImage = $scope.bgImages[$scope.activeBgImageIndex++ % $scope.bgImages.length];
			}
		})
	}

	this.getBackgroundImage = function(lat, lng, locString) {

		var photo_store = $scope.bgImages; //window.localStorage.getItem('photo_store');
		// console.log("Has images: " + $scope.has_images);
		if ($scope.has_images) {
			// console.log('we have loaded images');
			// $scope.bgImages = window.localStorage.getItem('photo_store');
			// console.log($scope.bgImages);
			_this.cycleBgImages();

		} else {
			Flickr.search(locString, lat, lng).then(function(resp) {
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
	document.addEventListener("deviceready", function() {});



	// $scope.showSettings();

	// document.addEventListener("deviceready", function() {
	// alert();
	// var device = device.platform;
	// alert(device)
	// })
	// document.addEventListener("deviceready", onDeviceReady, false);
	// function onDeviceReady() {
	//     alert(device.platform);
	//     // console.log(device.cordova);
	// }


	// _this.getForecast = function() {
	// 	metApi.get_forecast(function(data) {
	// 		// console.log(data)
	// 		// _this.bulletins = data.items[0];
	// 	});
	// }

	// _this.getForecast();

	// $scope.doRefresh = function() {
	// 	_this.yForecast();
	// 	$scope.$broadcast('scroll.refreshComplete');
	// }



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

	function my_date() {
		var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var today = new Date();
		return [days[today.getDay()], today.getDate(), months[today.getMonth()], today.getFullYear()];
	}

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

	// function getWeatherIcons(threeDay){
	// 	var conditions = ['Tropical Storm','Hurricane','Severe Thunderstorms','Thunderstorms','Drizzle','Windy','Showers','Cloudy','Sunny','Isolated Thunderstorms','Scattered Thunderstorms','Partly Cloudy','Thundershowers','Isolated Thundershowers','Not Available'];

	// 	var icons = ['ion-ios-thunderstorm-outline','ion-ios-thunderstorm-outline','ion-ios-thunderstorm-outline','ion-umbrella','ion-shuffle','ion-ios-rainy','ion-ios-cloud','ion-ios-sunny-outline','ion-ios-thunderstorm-outline','ion-ios-thunderstorm-outline','ion-ios-partlysunny','ion-ios-thunderstorm-outline','ion-ios-thunderstorm-outline','ion-ios-help-empty'];

	// 	var pass = ['', '', ''];
	// 	var passCount = 0;

	// 	for (i = 1; i < 4; i++) {
	// 		for (t = 0; t < conditions.length; t++) {
	// 			if (threeDay[i].text == conditions[t]){
	// 				pass[passCount] = icons[conditions.indexOf(conditions[t])-1];
	// 				passCount++;
	// 				break;
	// 			};
	// 		};
	// 	}
	// 	return pass;
	// }
	$scope.showSettings = function() {
		// alert();
		if (!$scope.settingsModal) {
			// load modal from given template URL
			$ionicModal.fromTemplateUrl('settings.html', function(modal) {
				$scope.settingsModal = modal;
				$scope.settingsModal.show();
			}, {
				// animation we want for modal entrance
				// animation: 'scale-in'
				animation: 'slide-in-up'
			})
		} else {
			$scope.settingsModal.show();
		}
	}

	$scope.showHomeMenu = function() {
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

	$scope.closeModal = function(a) {
		$scope.modal.hide();
		if (a == "show_home") {
			$scope.showHomeMenu();
		}
	}

	$scope.uv_modalOpen = function() {
		$scope.modal.hide();
		if (!$scope.uv_modal) {
			// load modal from given template URL
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
		console.log($scope.modal)
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
