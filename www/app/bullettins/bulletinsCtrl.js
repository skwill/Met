angular.module('ionic.metApp').controller('BulletinsCtrl', function(metApi, $scope, $ionicLoading, $timeout, $ionicModal) {

	var vm = this;
	// slide had changed listener event
	$scope.slideHasChanged = function(index) {
		vm.update_slide(index);
	}

	// update slide with index
	vm.update_slide = function(index) {
		titles = ['General Information', 'Severe Weather', 'Floods', 'Rough Seas'];
		$scope.sub_title = titles[index];
	}

	// get general info bulletins
	vm.getGIBulletins = function() {
		metApi.get_b_info(function(data) {
			vm.b_info = data.items;
			// vm.pageTitle = vm.bulletins[0].bulletinpage;
			// alert(data.items[0].bulletinType);
		});
	}

	// get severe weather bulletins
	vm.getSWBulletins = function() {
		metApi.get_b_serv(function(data) {
			vm.bulletins = data.items;
			vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}

	// get blood bulletins
	vm.get_flood_b = function() {
		metApi.get_b_flood(function(data) {
			// console.log(data)
		})
	}

	// Create modals
	$ionicModal.fromTemplateUrl('app/bullettins/gi_info_item.html', {
		scope: $scope,
		animation: 'scale-in'
	}).then(function(gi_details_modal) {
		$scope.gi_details_modal = gi_details_modal;
	});

	// close
	$scope.gi_info_close = function() {
		$scope.gi_details_modal.hide();
	};

	// Open the login modal
	$scope.gi_info_open = function(id) {
		$scope.gi_details_modal.show();
		// console.log(id)

		// vm.gi_info_title = "hello";
		metApi.get_b_info(function(data) {
			// vm.meta = data._meta;
			// vm.links = data._links;
			vm.bulletin = data.items[0];
			// vm.pageTitle = vm.bulletins[0].bulletinpage;
			console.log(vm.bulletin)
			// $scope.hide($ionicLoading);
		}, id);
	};


	vm.getBulletin = function(id) {

	}
	// vm.getGIBulletins();
})
