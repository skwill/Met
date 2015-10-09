angular.module('metApp').run(function($rootScope) {		
	}).controller('HomeCtrl', function(metApi, $scope, $ionicLoading, $timeout) {
	var vm = this;

	vm.getForecast = function() {
		metApi.forecast(function(data){			
			vm.bulletins = data.items[0];			
		});
	}

	$scope.doRefresh = function() {
		vm.yForecast();
		$scope.$broadcast('scroll.refreshComplete');
	}

	$scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
        $ionicLoading.hide();
  };

	vm.yForecast = function() {
			$scope.show($ionicLoading);
		metApi.yahooForecast(function(data){
			
			var demo = document.getElementById("demo");
			demo.style.background = timeOfDay();

			vm.condition = data.query.results.channel.item.condition;
			vm.threeDay = data.query.results.channel.item.forecast;
			vm.location = data.query.results.channel.location.city; 
			vm.pubDate = data.query.results.channel.item.pubDate;
			vm.title = data.query.results.channel.item.title;
			vm.sunrise = data.query.results.channel.astronomy.sunrise;
			vm.sunset = data.query.results.channel.astronomy.sunset;		

			vm.wicons = getWeatherIcons(vm.threeDay);
			$scope.hide($ionicLoading);
    		/*console.log(vm.wicons);
    		console.log(vm.threeDay);*/
		});
	}

	function timeOfDay(){
		var date = new Date();
		var time = date.getHours();

		var url = "";

		if (time >= 6 && time < 12) {
			url = "url('http://intelappsdca.com/met/images/sunrise.jpg')no-repeat center center";
			return url;
		}else if (time >= 12 && time < 18) {
			url = "url('http://intelappsdca.com/met/images/mid-day.jpg')no-repeat center center";
			return url;
		}else if (time >= 18) {
			url = "url('http://intelappsdca.com/met/images/night.jpg')no-repeat center center";
			return url;
		};
	}

	function getWeatherIcons(threeDay){
		var conditions = ['Tropical Storm','Hurricane','Severe Thunderstorms','Thunderstorms','Drizzle','Windy','Showers','Cloudy','Sunny','Isolated Thunderstorms','Scattered Thunderstorms','Partly Cloudy','Thundershowers','Isolated Thundershowers','Not Available'];

		var icons = ['ion-ios-thunderstorm-outline','ion-ios-thunderstorm-outline','ion-ios-thunderstorm-outline','ion-umbrella','ion-shuffle','ion-ios-rainy','ion-ios-cloud','ion-ios-sunny-outline','ion-ios-thunderstorm-outline','ion-ios-thunderstorm-outline','ion-ios-partlysunny','ion-ios-thunderstorm-outline','ion-ios-thunderstorm-outline','ion-ios-help-empty'];

		var pass = ['', '', ''];
		var passCount = 0;

		for (i = 1; i < 4; i++) { 
			for (t = 0; t < conditions.length; t++) {
				if (threeDay[i].text == conditions[t]){					
					pass[passCount] = icons[conditions.indexOf(conditions[t])-1];
					passCount++;					
					break;
				};				
			};		    
		}
		return pass;
	}
})
