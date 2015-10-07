angular.module('metApp').controller('HomeCtrl', function(metApi, $scope) {
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
		$scope.$broadcast('scroll.refreshComplete');
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
