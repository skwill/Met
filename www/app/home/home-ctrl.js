angular.module('metApp').run(function($rootScope) {
		// $rootScope.myclass =  "bar-royal"
	}).controller('HomeCtrl', function(metApi, $scope) {
	var vm = this;

	vm.getForecast = function() {
		metApi.forecast(function(data){
			/*vm.meta = data._meta;
			vm.links = data._links;*/
			vm.bulletins = data.items[0];
			//console.log(vm.bulletins.IssuedAt);
			//vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}

	$scope.doRefresh = function() {
		vm.yForecast();
		$scope.$broadcast('scroll.refreshComplete');
	}

	vm.yForecast = function() {
		metApi.yahooForecast(function(data){
			vm.condition = data.query.results.channel.item.condition;
			vm.threeDay = data.query.results.channel.item.forecast;
			vm.location = data.query.results.channel.location.city; //item.pubDate //item.title
			vm.pubDate = data.query.results.channel.item.pubDate;
			vm.title = data.query.results.channel.item.title;
			vm.sunrise = data.query.results.channel.astronomy.sunrise;
			vm.sunset = data.query.results.channel.astronomy.sunset;
			console.log(data);
			/*vm.meta = data._meta;
			vm.links = data._links;*/
			//vm.bulletins = data.items[0];
			//console.log(vm.bulletins.IssuedAt);
			//vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}
/*
	vm.getSWBulletins = function() {
		metApi.getBulletinsev(function(data){
			vm.bulletins = data.items;
			vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}


	vm.getBulletin = function(id) {

	}*/
})
