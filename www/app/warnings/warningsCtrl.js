angular.module('ionic.metApp').controller('warningsCtrl', function(metApi, $scope, $ionicLoading, $timeout, $ionicModal, $cordovaDevice, $ionicPlatform, $cordovaPush) {

	var vm = this;
	$scope.slideHasChanged = function(index) {
		vm.update_slide(index);
	}

	vm.update_slide = function(index) {
		titles = ['Watches', 'Warnings', 'Sigmet', 'Airmet'];
		$scope.sub_title = titles[index];
	}

	vm.get_o_air = function() {
		metApi.get_o_air(function(data) {
			vm.o_items = data.items;
			console.log(vm.o_items);
		})
	}
	vm.get_sigmet = function() {
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
	}


	// Create modals
	$ionicModal.fromTemplateUrl('app/warnings/info_item.html', {
		scope: $scope,
		animation: 'slide-in-up' //modal animation
	}).then(function(w_details_modal) {
		$scope.w_details_modal = w_details_modal;
	});
	// close modal
	$scope.w_info_close = function() {
		var m = document.querySelector('.modal');
		m.setAttribute("style", "");
		$scope.w_details_modal.hide();
	};

	// Open the login modal
	$scope.w_info_open = function(id, type) {
		$scope.w_details_modal.show();
		// switch function that gets called based on what key is submitted from clicked item
		switch (type) {
			case 'o': // bulletin
				metApi.get_o_air(function(data) {
					vm.warning = data.items[0];
					vm.warning.warnType = vm.warning.forecaster;
					// console.log(vm.warning)
				}, id);
				break;
			case 's':
				metApi.get_sigmet(function(data) {
					vm.warning = data.items[0];
					// console.log(vm.warning)
				}, id);
				break;
			case 'w':
				metApi.get_warn(function(data) {
					vm.warning = data.items[0];
					// console.log(vm.warning)
				}, id)
				break;
			case 'wt':
				metApi.get_watch(function(data) {
					vm.warning = data.items[0];
					// console.log(vm.warning)
				}, id)
				break;
		}
	};

	$scope.drag_close_modal = function(event) {
		var windowHeight = window.innerHeight;
		// var thisHeight = $element[0].offsetHeight;
		var pos = event.gesture.center.pageY;
		console.log(event)
		var m = document.querySelector('.modal');
		var trans = "; transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms;"
		m.setAttribute("style", "margin-top:" + pos + "px" + trans);
		if (pos > windowHeight / 2) {
			$scope.w_info_close();
		}
		if (pos < 0) {
			m.setAttribute("style", "margin-top:" + 0 + "px" + trans);
		}

		if (pos > windowHeight) {
			$scope.w_info_close();
		}
	}

	$scope.drag_release = function() {
		var m = document.querySelector('.modal');
		var trans = "; transition: all cubic-bezier(0.1, 0.7, 0.1, 1) 400ms;"
		m.setAttribute("style", "margin-top:" + 0 + "px" + trans);
	}
})
