angular.module('ionic.metApp').controller('ServicesCtrl', function(metApi, $scope, $ionicLoading, $timeout, $ionicModal, $cordovaDevice, $ionicPlatform, $cordovaPush) {

	var vm = this;
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
		metApi.get_radar(function(data) {
			console.log("here")

			//vm.aviation_items = data.items;

			vm.radar = data;
			var image = new Image();
			image.src = data.image_src;

			var img_div = $('#img_holder');
			img_div.html(image);
			// console.log(i);
		});
	}

	/*vm.get_sigmet = function() {
		metApi.get_sigmet(function(data) {
			vm.s_items = data.items;
			console.log(vm.s_items);
		})
	}
	vm.get_warn = function() {
		metApi.get_warn(function(data) {
			vm.w_items = data.items;
			console.log(vm.w_items);

		})
	}
	vm.get_watch = function() {
		metApi.get_watch(function(data) {
			vm.wt_items = data.items;
			console.log(vm.wt_items);
		})
	}*/






})
