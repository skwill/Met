angular.module('ionic.metApp')
	.controller('ForecastCtrl', ['metApi', '$interval', '$ionicHistory', '$route',
		function(metApi, $interval, $ionicHistory, $route) {
			var vm = this;
			var interval = 10 * 60000;
			$interval(function time() {
				$ionicHistory.clearCache().then(function() {
					// alert('cache cleared')
					// console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -');
					// console.log('cache cleared');
					$route.reload();
					vm.getForecast();
					$route.reload();
				});
				$ionicHistory.clearHistory();
			}, interval);

			vm.getForecast = function() {
				metApi.get_forecast(function(data) {
					vm.forecast = data.items[0];
					vm.hello = data.items[0].forecastTime;
				})
			}
		}
	])
