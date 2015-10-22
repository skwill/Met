angular.module('ionic.metApp').controller('BulletinsCtrl', function(metApi, $scope, $ionicLoading, $timeout, $ionicModal) {

	// $scope.show = function() {
	//     $ionicLoading.show({
	//       template: '<p>Loading...</p><ion-spinner></ion-spinner>'
	//     });
 //  	};

 //  $scope.hide = function(){
 //       $ionicLoading.hide();
 //  };


	var vm = this;
	$scope.slideHasChanged = function(index) {
	 	vm.update_slide(index);
	}

	vm.update_slide = function(index) {
		// console.log('slide: '+index);
		titles = ['General Information', 'Severe Weather', 'Floods', 'Rough Seas'];
		$scope.sub_title = titles[index];
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
		metApi.get_b_info(function(data){
			// vm.meta = data._meta;
			// vm.links = data._links;
			vm.b_info = data.items;
			// vm.pageTitle = vm.bulletins[0].bulletinpage;
			// console.log(data)
			// $scope.hide($ionicLoading);
		});
	}

	vm.getSWBulletins = function() {
		metApi.get_b_serv(function(data){
			vm.bulletins = data.items;
			vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}

	vm.get_flood_b = function() {
		metApi.get_b_flood(function(data) {
			// console.log(data)
		})
	}

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('app/bullettins/gi_info_item.html', {
	    scope: $scope,
	    animation: 'scale-in'
	  }).then(function(gi_details_modal) {
	    $scope.gi_details_modal = gi_details_modal;
	    // animation: 'slide-in-right'
	  });

	  // Triggered in the login modal to close it
	  $scope.gi_info_close = function() {
	    $scope.gi_details_modal.hide();
	  };

	  // Open the login modal
	  $scope.gi_info_open = function(id) {
	    $scope.gi_details_modal.show();
	    // console.log(id)

	    // vm.gi_info_title = "hello";
	    metApi.get_b_info(function(data){
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
