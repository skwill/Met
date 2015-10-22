angular.module('ionic.metApp').controller('warningsCtrl', function(metApi, $scope, $ionicLoading, $timeout) {

	var vm = this;
	$scope.slideHasChanged = function(index) {
	 	vm.update_slide(index);
	}

	vm.update_slide = function(index) {
		titles = ['Watches', 'Warnings', 'Sigmet', 'Airmet'];
		$scope.sub_title = titles[index];
		console.log('slide: '+index);
		// switch (index) {
		// 	case 0:
		// 		$scope.sub_title = titles[0];
		// 	break;
		// 	case 1:
		// 		$scope.sub_title = titles[1];
		// 	break;
		// 	case 2:
		// 		$scope.sub_title = titles[2];
		// 	break;
		// 	case 3:
		// 		$scope.sub_title = titles[3];
		// 	break;
		// }
	}

	vm.getGIBulletins = function() {
		// $scope.show($ionicLoading);
		metApi.getBulletins(function(data){
			vm.meta = data._meta;
			vm.links = data._links;
			vm.bulletins = data.items;
			vm.pageTitle = vm.bulletins[0].bulletinpage;
			// console.log(data)
			// $scope.hide($ionicLoading);
		});
	}

	vm.getSWBulletins = function() {
		metApi.getBulletinsev(function(data){
			vm.bulletins = data.items;
			vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}

	vm.get_flood_b = function() {
		metApi.bflood(function(data) {
			console.log(data)
		})
	}


	vm.getBulletin = function(id) {

	}
	// vm.getGIBulletins();
})
