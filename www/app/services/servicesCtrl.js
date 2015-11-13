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
			//xmlDoc=loadXMLDoc(data);
			/*var base64_string = "/9j/4AAQSkZJRgABAgAAAQABAAD//...";
var img = document.createElement("img");
// added `width` , `height` properties to `img` attributes
img.width = "250px";
img.height = "250px";
img.src = "data:image/png;base64," + base64_string;*/

			//vm.aviation_items = data.items;
			console.log(data);
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
