// weather app based on driftyco ionic-weather
// https://github.com/driftyco/ionic-weather
angular.module('ionic.metApp')
	.controller('HomeCtrl', function(metApi, $scope, $timeout, $rootScope, Weather, Geo, Flickr, $ionicModal, $ionicPlatform, $ionicPopup, $interval, $ionicBackdrop, $state, $ionicHistory) {
		var _this = this;
		$scope.activeBgImageIndex = 0;
		// $scope.country = '';
		$scope.isFlipped = false;
		//  - - - - - - - - - - - - - - -  -
		// interval block: how ofter the app will refresh it's data \\
		var interval = 10 * 60000;
		$interval(function time() {
			// $scope.refreshData();
			$rootScope.ref_trin();
			$rootScope.ref_bago();
			console.log("fetch info and location", 'cache cleared');
			$ionicHistory.clearCache();
		}, interval);

		// flip tp tobago after making all calls if location is tobago
		setTimeout(function() {
			if ($rootScope.c == "Tobago") {
				$scope.flip('Tobago')
			}
		}, 1000);
		// end if interval block

		//  - - - - - - - - - - - - - - - - - - -
		// MET API functions: all function look to met factory for consuming data
		$scope.set_due_point = function(idx, arr) {
			var p = arr[idx].value;
			// console.log('dew point', p);
			var pat = /([0-9\.]+)%/g;
			return (r = pat.exec(p))[0];
		}

		// set a pretty string for temp reading in metars view
		$scope.cTemp = function(t) {
			var s = "";
			if( (t < 29 && $scope.timeOfDay() != 'night' ) || (t < 23 && $scope.timeOfDay == 'night')) {
				s = 'cool '+($scope.timeOfDay() != 'night'?'day':'night');
			}
			if((t >= 29 && t <= 31 && $scope.timeOfDay() != 'night') || (t >= 23 && t <= 26 && $scope.timeOfDay() == 'night')) {
				s = 'warm '+($scope.timeOfDay() != 'night'?'day':'night');
			}
			if((t >= 32 && t <= 34 && $scope.timeOfDay() != 'night') || (t >= 27 && t <= 29 && $scope.timeOfDay() == 'night')) {
				s = 'hot '+($scope.timeOfDay() != 'night'?'day':'night');
			}
			if((t > 34 && $scope.timeOfDay() != 'night') || (t > 29 && $scope.timeOfDay() == 'night')) {
				s = 'very hot '+($scope.timeOfDay() != 'night'?'day':'night');
			}

			return s;
		}

		// set a pretty string for winds in metars view
		$scope.cWind = function(s) {
			var t = "";
			var or = s;
			s = s.substring(s.lastIndexOf('(')+1, s.lastIndexOf(';'));
			s = parseInt(s);
			var ktm = (s * 1.15077945).toFixed(0)+' MPH';
			var dir_and_speed = or.split('(', 1)+ 'at '+ktm;

			if(s >= 0 && s <= 3) { t = 'Calm/Still winds coming '+dir_and_speed; }
			if(s >= 4 && s <= 10) { t = 'Gentle breeze ' + dir_and_speed; }
			if(s >= 11 && s <= 16) { t = 'Moderate breeze ' + dir_and_speed; }
			if(s >= 17 && s <= 21) { t = 'Windy breeze ' + dir_and_speed; }
			if(s >= 22 && s <= 27) { t = 'Strong Winds ' + dir_and_speed; }
			if(s >= 28 && s <= 33) { t = 'Very Strong Winds ' + dir_and_speed; }
			if(s >= 34 && s <= 62) { t = 'Storm Force Winds ' + dir_and_speed; }
			if(s > 63) { t = 'Hurricane force winds ' + dir_and_speed; }

			return t;
		}

		// show alert: can show any type of alert, its a very generic function
		$scope.showAlert = function(title, message) {
			var alertPopup = $ionicPopup.alert({
				title: title,
				template: message
			});
		}

		// actual flip function, when this is called the screen flips
		$scope.flip = function(country) {
			$scope.isFlipped = !$scope.isFlipped;
			if (country == "Trinidad") {
				$rootScope.ref_trin();
			} else {
				$rootScope.ref_bago();
			}
		}

		// clear home screen cache when entering the view
		$scope.$on('$ionicView.beforeEnter', function() {
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
		})

		// close any modal found in the scope
		// also special case: if modal is a child of met services menu then open parent
		$scope.closeModal = function(a) {
			$scope.modal.hide();
		}

		// when any modal is closed, hide the back drop
		$scope.$on('modal.hidden', function() {
			$ionicBackdrop.release();
		})


		// helper functins - - - - - - - - - - - - - - - - - - - - - - - - - \\
		// they help format dates and stuff - - - - - - - - - - - - - - - - - \\

		// get us the time of day as a string eg  morning
		$scope.timeOfDay = function() {
			var date = new Date();
			var time = date.getHours();
			var s = "";
			if (time >= 0 && time < 12) { s = "morning"; }
			else if (time >= 12 && time < 17) { s = "mid day"; }
			else if (time >= 17 && time < 20) { s = "evening"; }
			else if (time >= 20) { s = "night"; };

			return s;
		}

		// get us the hour of day: primarily for displaying the uv index hour: eg 11am
		$scope.hourOfDay = function() {
			var d = new Date();
			var t = d.getHours();
			if (t >= 0 && t <= 12) { t = (t == 0 ? '12' : t) + 'am'; }
			if (t > 12) { t = (t - 12) + 'pm'; }

			return t;
		}

		// a full date in array, like what is found above present conditions on the home screen
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
			var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];

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

		// rgb colors of the background image displayed will theme the home page
		$scope.getAverageRGB = function(el, el2) {
			var blockSize = 5,
				defaultRGB = {
					r: 0,
					g: 0,
					b: 0
				},
				canvas = document.createElement('canvas'),
				context = canvas.getContext && canvas.getContext('2d'),
				data, width, height,
				i = -4,
				length,
				rgb = {
					r: 0,
					g: 0,
					b: 0
				},
				count = 0;
			var bright = 0;
			if (!context) {
				return defaultrgb;
			}
			height = canvas.height = el.naturalHeight || el.offsetHeight || el.height;
			width = canvas.width = el.naturalWidth || el.offsetWidth || el.width;
			context.drawImage(el, 0, 0);
			data = context.getImageData(0, 0, width, height);
			length = data.data.length;

			while ((i += blockSize * 4) < length) {
				++count;
				rgb.r += data.data[i];
				rgb.g += data.data[i + 1];
				rgb.b += data.data[i + 2];
				bright += (0.34 * rgb.r + 0.5 * rgb.g + 0.16 * rgb.b);
				if (bright !== 0) bright /= 2;
			}
			// bright = 0.1;
			if (bright > 0.5) var textColor = "#FFFFFF";
			else var textColor = "#000000";

			// ~~ used to floor values
			rgb.r = ~~ (rgb.r / count);
			rgb.g = ~~ (rgb.g / count);
			rgb.b = ~~ (rgb.b / count);
			$(el2 + '.bar, ' + el2 + '.d3').css('background-color', 'rgba(' + [rgb.r, rgb.g, rgb.b, 0.6].join(', ') + ')');
			$('#cw-summary').css('color', textColor);
			$(el2 + '.of1').css('background-color', 'rgba(' + [rgb.r, rgb.g, rgb.b, 0.9].join(', ') + ')');
			$('.item-complex').css('border-bottom', '1px solid rgba(' + [rgb.r, rgb.g, rgb.b, 0.4].join(', ') + ')');
		}

		// capitalize first one letter of the word
		$scope.capFLetter = function(str) {
			return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
		}

		// checks if a word is in a string
		$scope.is_word_in_string = function(string, word) {
			return new RegExp('\\b' + word + '\\b', 'i').test(string);
		}

		// checks if a value is in an array
		// @ returns the position index value was found if found
		$scope.inArray = function(needle, haystack) {
			for (i = 0; i < haystack.length; i ++) {
				if(haystack[i] == needle) {
					return haystack[i];
				}
			}

			return false;
		}

		// metars fcast array
		$scope.metars_cloud = [
			{ 'code': 'FEW', 'desc': 'Clear' },
			{ 'code': 'SCT', 'desc': 'Partly Cloudy' },
			{ 'code': 'BKN', 'desc': 'Mostly Cloudy' },
			{ 'code': 'OVC', 'desc': 'Overcast' },
			{ 'code': '-RA', 'desc':'Light Rain' },
			{ 'code': '-SHRA', 'desc': 'Light Showers' },
			{ 'code': 'RA', 'desc': 'Moderate Rain' },
			{ 'code': 'SHRA', 'desc': 'Moderate Showers' },
			{ 'code': '+RA', 'desc': 'Heavy Rain' },
			{ 'code': '+SHRA', 'desc': 'Heavy Showers' },
			{ 'code': 'TS', 'desc': 'Thunder' },
			{ 'code': '-TSRA', 'desc': 'Light Thundershowers' },
			{ 'code': 'TSRA', 'desc': 'Moderate Thundershowers' },
			{ 'code': '+THRA', 'desc': 'Heavy Thundershowers' },
			{ 'code': 'FC', 'desc': 'Funnel Cloud' },
			{ 'code': 'BR', 'desc': 'Mist' },
			{ 'code': 'FG', 'desc': 'Fog' },
			{ 'code': 'FU', 'desc': 'Smoke' },
			{ 'code': 'HZ', 'desc': 'Haze' },
			{ 'code': 'SQ', 'desc': 'Squall' }
		];
	})
	.controller('TrinCtrl', function(metApi, $scope, $timeout, $rootScope, Weather, Geo, Flickr, $ionicModal, $ionicPlatform, $ionicPopup, $interval, $ionicBackdrop, $state) {
		var _this = this;
		$scope.fcasttrin = "sunny"; // default trin fcast
		$scope.fcastbago = "sunny"; // default bago fcast

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
					$scope.$watch('country', function() {
						$rootScope.c = $scope.country;
					})
					_this.getCurrent(lat, lng);
					_this.get_uv_index();
					_this.metars_trin();
					_this.trin_3day();
				});
			}, function(error) {
				// in some cases something may go wrong
				// most times location service for android may be turned off
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
				$scope.today = $scope.my_date(); // today is
				// fetch a background image from flickr based on out location, time and current weather conditinos
				// console.log('currently', $scope.current)
				_this.getBackgroundImage("Trinidad");
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
					setTimeout(function() {
						$scope.getAverageRGB(document.querySelector('#i-trin'), '.trin')
					}, 2000)
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
			var today = new Date();
			var el = document.getElementById('uv-index');
			var d = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();
			$scope.hour_of_day = $scope.hourOfDay();
			// these indexes represent uv values. but instead of using the value directly we use a color in place of the index to represent the value
			// the index will match to a color class to represent the uv_index value on the summary page
			var uv_c = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11'];
			metApi.get_uv_index(function(data) {
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

					// ensure the uv value matches the correct color class
					var ci = i == 0 || i == 1 ? 0 : i == 11 || i > 11 ? (11 - 1) : i - 1;
					$scope.uv_color = uv_c[ci];

					// remove any stray uv classes from the uv display
					for (x = 0; x < uv_c.length; x++) {
						if (hasClass(el, uv_c[x])) {
							el.classList.remove(uv_c[x])
						}
					}
					$scope.$watch('uv_color', function() {
						el.className = el.className + "  " + $scope.uv_color;
					})
				}
			})

			if (!today_index.length) {
				var ti = [{
						'uv_value': 0
					}]
				$scope.uv_index = ti[0];
				el.className = el.className + " c1";
			}
		}

		// test if a gived element has a given class
		function hasClass(el, cls) {
			return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
		}

		//metars keys for trinidad
		_this.metars_trin = function() {
			$scope.current_temp_trin = "No data";
			metApi.get_metar(function(data) {
				var m = data.items;
				var ids = [
					// metar for
					{ 'id': 1, 'icon': 'icon ion-ios-location-outline', 'el': 'met-loc', 'show': false, 'txt': null, },
					// text
					{ 'id': 2, 'icon': 'icon ion-thermometer', 'el': null, 'show': false, 'txt': null, },
					// temp
					{ 'id': 3, 'icon': 'icon ion-thermometer', 'el': 'temp', 'show': true, 'txt': null, },
					// dewpoint
					{ 'id': 4, 'icon': 'icon ion-waterdrop', 'el': 'dew', 'show': true, 'txt': null, },
					// pressure
					{ 'id': 5, 'icon': 'icon ion-ios-speedometer-outline', 'el': 'pressure', 'show': true, 'txt': null, },
					// winds
					{ 'id': 6, 'icon': 'icon ion-ios-analytics-outline', 'el': 'winds', 'show': true, 'txt': null, },
					// visibility
					{ 'id': 7, 'icon': 'icon', 'el': 'weather', 'show': false, 'txt': null, },
					// ceiling
					{ 'id': 8, 'el': 'weather', 'show': false, 'txt': null, },
					// clouds
					{ 'id': 9, 'icon': 'icon ion-ios-cloudy-outline', 'el': 'clouds', 'show': true, 'txt': null, },
					// weather
					{ 'id': 10, 'icon': 'icon ion-umbrella', 'el': 'weather', 'show': false }
				];

				_this.mdata = [];
				// push any items with station of TTPP to the mdata array
				for (i = 0; i < m.length; i++) {
					if (m[i].station == "TTPP") {
						_this.mdata.push({
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

				$scope.current_temp_trin = _this.mdata[2].value.substring(0, 3);
				_this.mdata[2].txt = 'Looks like a ' + $scope.cTemp(Number($scope.current_temp_trin));
				_this.mdata[5].value = $scope.cWind(_this.mdata[5].value);
				console.debug('winds', _this.mdata[5].value);
				$scope.dew_point_trin = $scope.set_due_point(3, _this.mdata);

				// metars we compare against for building home screen up-to-date summary
				var mets = [];
				// use the parent scope metars_cloud array and compayr trinidad metars to it to buuld conditions
				for(i = 0; i < $scope.metars_cloud.length; i++) {
					if(_this.mdata[1].value.indexOf($scope.metars_cloud[i].code) > -1) {
						console.log($scope.metars_cloud[i].code);
						mets.push($scope.metars_cloud[i].code);
					}
				}

				$scope.cc;
				// mets = ['-SHRA', 'FEW', 'SCT', 'SHRA']; // testing other conditions
				for(i = 0; i < mets.length; i++) {
					// start of cloud conditions
					if(mets[i] == "FEW") {
						if(!$scope.inArray('SCT', mets) && !$scope.inArray('BKN', mets) && !$scope.inArray('OVC', mets)) {
							$scope.cc = 'FEW';
						}
					}

					if(mets[i] == "SCT") {
						if(!$scope.inArray('BKN', mets) && !$scope.inArray('OVC', mets)) {
							$scope.cc = 'SCT';
						}
					}

					if($scope.inArray('BKN', mets)) {
						$scope.cc = 'BKN';
					}

					if($scope.inArray('OVC', mets)) {
						$scope.cc = 'OVC';
					}
					// end of cloud conditions

					// start of precipitation / weather conditions
					for(x = 0; x < $scope.metars_cloud.length; x++) {
						if(mets[mets.length-1] == $scope.metars_cloud[x].code) {
							$scope.cc = $scope.metars_cloud[x].code;
						}
					}
					// end of weather conditions
				}

				var ci = "";
				for(x = 0; x < $scope.metars_cloud.length; x++) {
					if($scope.cc == $scope.metars_cloud[x].code) {
						ci = $scope.metars_cloud[x].desc;
						$scope.summary_text_trin = ci;
					}
				}

				// ci = 'Clear';
				$scope.fcasttrin = ci=='Clear'?'clear-'+$scope.timeOfDay():ci;
				// if we are between midnight and general sunrise time with clear conditions show us a moon
				if(ci=='Clear' && parseInt($scope.hourOfDay()) >= 0 && parseInt($scope.hourOfDay()) <= 5) {
					$scope.fcasttrin = 'clear-night';
				}
				console.debug('metars trin', mets, $scope.cc, ci, $scope.fcasttrin);
				// deal with summary text based on metars
				if(_this.mdata[1].value.indexOf('NOSIG') > -1) {
					// metars says no sig
					// when metars says no sig then we need an icon to say clear conditions for the current time of day
					var v = $scope.summary_text_trin; // + " " + $scope.timeOfDay();;
					$scope.summary_text_trin = $scope.capFLetter(v);
				}
				else {
					// "value": "TTPP 181400Z 11007KT 3000 -SHRA VCSH FEW010CB SCT012 24/23 Q1015 TEMPO SHRA RMK CB-E/S SHWRS-ALL QUADS",
					// metars has a weather condition
					// we pull the weather condition string from the weather index of the data set
					// weather index only exists when we have no sig
					$scope.summary_text_trin = $scope.capFLetter(_this.mdata[9].value.match(/\(([^)]+)\)/)[1]).replace('(', ''); // this is the weather index
					// when metars tells us that we have a weather condition then we need to match that current condition to our array of conditions
					// and select the appropriate icon
				}

				if($scope.summary_text_trin.indexOf('Haze') > -1) {
					$scope.summary_text_trin = "Dust, smoke and other dry particles may be in the air"
				}

				// correct cloudy icon for day or night
				if($scope.fcasttrin.indexOf('Cloudy') > -1) {
					var tod = $scope.timeOfDay()=='night'?'-night':'';
					$scope.fcasttrin = $scope.fcasttrin+tod;
				}
			})
		}

		// shows the modal for trin metars: slide up from bottom
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
		// outlook tv for the 3-day forecast
		_this.trin_3day = function(t) { // can be input of the country we load data for
			_this.wicons = [];
			metApi.get_o_tv(function(data) {
				var i = data.items[0];
				$scope.t = 'Today';
				$scope.tm = $scope.day_string(1);
				$scope.nd = $scope.day_string(2);
				_this.max24 = i.maxTrin24look;
				_this.min24 = i.minTrin24look;
				_this.max48 = i.maxTrin48look;
				_this.min48 = i.minTrin48look;
			})

			// get forecast for first day of 3-day forecast
			metApi.get_forecast(function(data) {
				var f = data.items[0];
				_this.ftime_trin = f.forecastTime;
				if(_this.ftime_trin == "05:30PM") {
					$scope.t = 'Tonight';
				}
				_this.th = f.PiarcoFcstMnTemp;
				_this.tl = f.PiarcoFcstMxTemp;
				// temp icons
				_this.wicons[0] = 'ion-ios-partlysunny-outline';
				_this.wicons[1] = 'ion-ios-partlysunny-outline';
				_this.wicons[2] = 'ion-ios-partlysunny-outline';
				_this.sunup = f.sunrise;
				_this.sundown = f.sunset;
			})
		}

		// do initial load
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
					_this.getCurrent(lat, lng);
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
				$scope.today = $scope.my_date();
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
					setTimeout(function() {
						$scope.getAverageRGB(document.querySelector('#i-bago'), '.bago')
					}, 2000)
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
				// ids of metars for tobago
				var ids = [
					// metar for
					{ 'id': 9, 'icon': 'icon ion-ios-location-outline', 'el': 'met-loc', 'show': false, 'txt': null, },
					// text
					{ 'id': 10, 'icon': 'icon ', 'el': null, 'show': false, 'txt': null, },
					// temperature
					{ 'id': 11, 'icon': 'icon ion-thermometer', 'el': 'temp', 'show': true, 'txt': null, },
					// dewpoint
					{ 'id': 12, 'icon': 'icon ion-waterdrop', 'el': 'dew', 'show': true, 'txt': null, },
					// pressure
					{ 'id': 13, 'icon': 'icon ion-ios-speedometer-outline', 'el': 'pressure', 'show': true, 'txt': null, },
					// winds
					{ 'id': 14, 'icon': 'icon ion-ios-analytics-outline', 'el': 'winds', 'show': true, 'txt': null, },
					// visibility
					{ 'id': 15, 'icon': 'icon ion-thermometer', 'el': null, 'show': false, 'txt': null, },
					// ceiling
					{ 'id': 16, 'icon': 'icon ', 'el': null, 'show': false, 'txt': null, },
					// clouds
					{ 'id': 17, 'icon': 'icon ion-ios-cloudy-outline', 'el': 'clouds', 'show': true, 'txt': null, }
				];

				_this.mdatab = null;
				_this.mdatab = [];
				var c = 0;
				for (i = 0; i < m.length; i++) { // metars
					if (m[i].station == 'TTCP') {
						_this.mdatab.push({
							'id': m[i].id,
							'label': m[i].label,
							'station': m[i].station,
							'value': m[i].value,
							'icon': ids[c] != undefined ? ids[c].icon : '',
							'el': ids[c] != undefined ? ids[c].el : '',
							'show': ids[c] != undefined ? ids[c].show : ''
						});
						c++;
					}
				}

				$scope.current_temp = _this.mdatab[2].value.substring(0, 3);
				_this.mdatab[2].txt = 'Looks like a ' + $scope.cTemp(Number($scope.current_temp));
				$scope.dew_point = $scope.set_due_point(3, _this.mdatab);

				var mets = [];
				for(i = 0; i < $scope.metars_cloud.length; i++) {
					if(_this.mdatab[1].value.indexOf($scope.metars_cloud[i].code) > -1) {
						console.log($scope.metars_cloud[i].code);
						mets.push($scope.metars_cloud[i].code);
					}
				}

				$scope.cd;
				for(i = 0; i < mets.length; i++) {
					// start of clouf conditions
					if(mets[i] == "FEW") {
						// cannot have SCT, BKN or OVC
						if(!$scope.inArray('SCT', mets) && !$scope.inArray('BKN', mets) && !$scope.inArray('OVC', mets)) {
							$scope.cc = 'FEW';
						}
					}
					if(mets[i] == "SCT") {
						if(!$scope.inArray('BKN', mets) && !$scope.inArray('OVC', mets)) {
							$scope.cc = 'SCT';
						}
					}
					if($scope.inArray('BKN', mets)) {
						$scope.cc = 'BKN';
					}
					if($scope.inArray('OVC', mets)) {
						$scope.cc = 'OVC';
					}
					// end of cloud conditions
					// start of precipitation / weather conditions
					for(x = 0; x < $scope.metars_cloud.length; x++) {
						if(mets[mets.length-1] == $scope.metars_cloud[x].code) {
							$scope.cd = $scope.metars_cloud[x].code;
						}
					}
				}

				var ci = "";
				for(x = 0; x < $scope.metars_cloud.length; x++) {
					if($scope.cd == $scope.metars_cloud[x].code) {
						ci = $scope.metars_cloud[x].desc;
						$scope.summary_text = ci;
					}
				}
				$scope.fcastbago = ci=='Clear'?'clear-'+$scope.timeOfDay():ci;
				if(ci=='Clear' && parseInt($scope.hourOfDay()) >= 0 && parseInt($scope.hourOfDay()) <= 5) {
					$scope.fcastbago = 'clear-night';
				}
				console.debug('metars bago', mets, $scope.cd, ci, $scope.fcastbago);
				// deal with summary text based on metars
				if(_this.mdatab[1].value.indexOf('NOSIG') > -1) {
					var v = $scope.summary_text;// + " " + $scope.timeOfDay();;
					$scope.summary_text = $scope.capFLetter(v);
				}
				else {
					$scope.summary_text = $scope.capFLetter(_this.mdatab[9].value.match(/\(([^)]+)\)/)[1]).replace('(', ''); // this is the weather index
				}

				if($scope.summary_text.indexOf('Haze') > -1) {
					$scope.summary_text = "Dust, smoke and other dry particles may be in the air"
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
				// $scope.tb = $scope.day_string(0);
				$scope.t = 'Today';
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
				_this.ftime_bago = f.forecastTime;
				if(_this.ftime_bago == "05:30PM") {
					$scope.t = 'Tonight';
				}
				_this.th = f.CrownFcstMnTemp;
				_this.tl = f.CrownFcstMxTemp;
			})
		}

		_this.refreshData();

	})
	.directive('weatherIconTrin', function() {
		return {
	        restrict: 'E',
	        link: function(scope, element, attrs) {
	        	setTimeout(function() {
	        		var j = scope.fcasttrin.replace(/\s/g, "-").toLowerCase();
	        		console.debug('fcast trin', scope.fcasttrin)

	        		scope.getContentUrl  = function() {
	        			return 'app/home/svg/'+j+'.html';
	        		}
	        	}, 2000)
	        },
	        template: '<div ng-include="getContentUrl()" style="padding-top: 13px"></div>'
	    };
	})
	.directive('weatherIconBago', function($timeout) {
		return {
			restrict: 'E',
			link: function(scope, element, attrs) {
	        	setTimeout(function() {
	        		var j = scope.fcastbago.replace(/\s/g, "-").toLowerCase();
	        		console.debug('fcast bago', scope.fcastbago)
	        		scope.getContentUrl  = function() {
	        			return 'app/home/svg/'+j+'.html';
	        		}
	        	}, 2000)
	        },
	        template: '<div ng-include="getContentUrl()"></div>'
		}
	})
