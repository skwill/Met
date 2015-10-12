// angular.module('ionic.metApp').controller('BulletinsCtrl', function(metApi, $scope, $ionicLoading, $timeout) {

// 	// $scope.show = function() {
// 	//     $ionicLoading.show({
// 	//       template: '<p>Loading...</p><ion-spinner></ion-spinner>'
// 	//     });
//  //  	};

//  //  $scope.hide = function(){
//  //       $ionicLoading.hide();
//  //  };

// 	var vm = this;
// 	vm.getGIBulletins = function() {
// 		// $scope.show($ionicLoading);
// 		metApi.getBulletins(function(data){
// 			vm.meta = data._meta;
// 			vm.links = data._links;
// 			vm.bulletins = data.items;
// 			vm.pageTitle = vm.bulletins[0].bulletinpage;
// 			console.log(data)
// 			// $scope.hide($ionicLoading);
// 		});
// 	}

// 	vm.getSWBulletins = function() {
// 		metApi.getBulletinsev(function(data){
// 			vm.bulletins = data.items;
// 			vm.pageTitle = vm.bulletins[0].bulletinpage;
// 		});
// 	}


// 	vm.getBulletin = function(id) {

// 	}
// })
