angular.module('ionic.metApp').controller('ServicesCtrl', function(metApi, $scope, $ionicLoading, $timeout, $ionicModal, $cordovaDevice, $ionicPlatform, $cordovaPush, $ionicSlideBoxDelegate) {

	var vm = this;

	vm.refresh_all_a = function() {

	}
	/*$scope.slideHasChanged = function(index) {
		vm.update_slide(index);
	}

	vm.update_slide = function(index) {
		titles = ['Watches', 'Warnings', 'Sigmet', 'Airmet'];
		$scope.sub_title = titles[index];
	}*/

	vm.get_o_aviation = function() {
		metApi.get_o_aviation(function(data) {
			vm.aviation_items = data.items;
			console.log(vm.aviation_items);
		})
	}

	vm.get_aviation_radar = function() {
		// metApi.get_radar(function(data) {
		// 	console.log("here")

		// 	//vm.aviation_items = data.items;

		// 	vm.radar = data;
		// 	var image = new Image();
		// 	image.src = data.image_src;

		// 	var img_div = $('#img_holder');
		// 	img_div.html(image);
		// 	// console.log(i);
		// });
	}

	$scope.slideHasChanged = function(index) {
		vm.update_slide(index);
	}

	vm.update_slide = function(index) {
		titles = ['Satellite', 'Radar', 'Weather Report', 'Forecast'];
		$scope.sub_title = titles[index];
		console.log(index)
	}

	$scope.slide = function(to) {
		// $scope.current = to;
		$ionicSlideBoxDelegate.slide(to);
		// vm.refresh_all_b();
	}








})
