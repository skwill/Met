angular.module('ionic.metApp').controller('WarningsCtrl', function(metApi, $scope, $ionicModal) {

	var vm = this;

	vm.getWarn = function(){
		metApi.getWarnings(function(data){
			//console.log('hello');
			vm.meta = data._meta;
			vm.links = data._links;
			vm.warnings = data.items;

			console.log(vm.warnings);
		})
	}

	vm.getWatch = function(){
		metApi.getWatches(function(data){
			//console.log('hello');
			vm.meta = data._meta;
			vm.links = data._links;
			vm.watches = data.items;

			console.log(vm.watches);
		})
	}
})
