// weather app based on driftyco ionic-weather
// https://github.com/driftyco/ionic-weather
angular.module('ionic.metApp'/*, */)

	.controller('HomeCtrl', function(metApi, $scope, $timeout, $rootScope, Weather, Geo, Flickr, $ionicModal, $ionicPlatform) {
		var _this = this;

		$ionicPlatform.ready(function() {
			// hide status bar
			if(window.StatusBar) {
				StatusBar.hide();
			}
		});
		$scope.activeBgImageIndex = 0;

		$scope.showSettings = function() {
			// alert();
			if(!$scope.settingsModal) {
				// load modal from given template URL
				$ionicModal.fromTemplateUrl('settings.html', function(modal) {
					$scope.settingsModal = modal;
					$scope.settingsModal.show();
				}, {
					// animation we want for modal entrance
					animation: 'slide-in-up'
				})
			}
			else {
				$scope.settingsModal.show();
			}
		}

		this.getCurrent = function(lat, lng, locString) {
			// alert();
			Weather.getAtLocation(lat, lng).then(function(resp) {
				$scope.current = resp.data;
				console.log('Got Current', $scope.current);
				$rootScope.$broadcast('scroll.refreshComplete');
				var s = timeOfDay();
				// var t = new Date($scope.current.currently.time);
				var f = convertTimestamp($scope.current.currently.time); //t.toISOString();
				$scope.time = f;
				console.log(f)
				// console.log("Date: "+s)
				_this.getBackgroundImage(lat, lng, $scope.current.currently.summary+", "+$scope.current.daily.icon+", hq, trinidad, "+s);
				// console.log($scope.current.currently.summary)
		}, function(error) {
				alert('Unable to get current conditinos');
				console.log(error);
			});
		};

		$scope.refreshData = function() {
			Geo.getLocation().then(function(position) {
				// console.log(position.coords);
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;

				Geo.reverseGeocode(lat, lng).then(function(locString) {
					$scope.currentLocationString = locString;
				});
				_this.getCurrent(lat, lng);
			}, function(error) {
				$scope.currentLocationString = "Unable to get current location:" + error;
			});
		};

		this.cycleBgImages = function() {
			$timeout(function cycle() {
				if($scope.bgImages) {
					$scope.activeBgImage = $scope.bgImages[$scope.activeBgImageIndex++ % $scope.bgImages.length];
				}
			})
		}

		this.getBackgroundImage = function(lat, lng, locString) {
			Flickr.search(locString, lat, lng).then(function(resp) {
				var photos = resp.photos;
				// console.log("Photos");
				// console.log(resp);
				if(photos.photo.length) {
					$scope.bgImages = photos.photo;
					_this.cycleBgImages();
				}
			}, function(error) {
				console.log('Unable to get Flickr images', error);
			})
		}

		$scope.refreshData();
		// $scope.showSettings();

		// alert("hello dre");
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
		// 	metApi.forecast(function(data){
		// 		_this.bulletins = data.items[0];
		// 	});
		// }

		// $scope.doRefresh = function() {
		// 	_this.yForecast();
		// 	$scope.$broadcast('scroll.refreshComplete');
		// }



		$scope.yForecast = function() {
				// $scope.show($ionicLoading);
				// alert();
			metApi.yahooForecast(function(data){
				console.log(data);

				// var demo = document.getElementById("demo");
				// demo.style.background = timeOfDay();

				_this.condition = data.query.results.channel.item.condition;
				_this.threeDay = data.query.results.channel.item.forecast;
				_this.location = data.query.results.channel.location.city;
				_this.pubDate = data.query.results.channel.item.pubDate;
				_this.title = data.query.results.channel.item.title;
				_this.sunrise = data.query.results.channel.astronomy.sunrise;
				_this.sunset = data.query.results.channel.astronomy.sunset;

				// _this.wicons = getWeatherIcons(_this.threeDay);
				// $scope.hide($ionicLoading);
	    		/*console.log(_this.wicons);
	    		// console.log(_this.threeDay);*/
			});
		}
		// $scope.yForecast();

	function timeOfDay(){
		var date = new Date();
		var time = date.getHours();
		var s = "";

		if (time >= 6 && time < 12) {
			s = "morning";
		}else if (time >= 12 && time < 18) {
			s = "mid day";
		}else if (time >= 18) {
			s = "night";
		};

		return s;
	}

	function convertTimestamp(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
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
})

.controller('SettingsCtrl', function($scope, Settings) {
	$scope.setings = Settings.getSettings();

	// watch for settings changes and save them if necessary
	$scope.$watch('settings', function(v) {
		Settings.save();
	}, true);

	$scope.closeSettings = function() {
		$scope.modal.hide();
	}
})
