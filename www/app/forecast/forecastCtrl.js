angular.module('ionic.metApp').controller('ForecastCtrl', function(metApi, $rootScope, $scope, $ionicLoading, $timeout, $ionicModal, $cordovaDevice, $ionicPlatform, $cordovaPush, $ionicSlideBoxDelegate) {

	var vm = this;

	vm.getForecast = function() {
		metApi.get_forecast(function(data) {
			vm.forecast = data.items[0];
			vm.hello = data.items[0].forecastTime;
		})
	}
})
/*var vm = this;
	$scope.slideHasChanged = function(index) {
		vm.update_slide(index);
	}

	vm.update_slide = function(index) {
		titles = ['Watches', 'Warnings', 'Sigmet', 'Airmet'];
		$scope.sub_title = titles[index];
	}

	$scope.slide = function(to) {
		$ionicSlideBoxDelegate.slide(to);
	}

	vm.refresh_all_w = function() {
		vm.get_o_air();
		vm.get_sigmet();
		vm.get_warn();
		vm.get_watch();
	}

	vm.refreshData = function(f) {
		switch (f) {
			case ('Watches'):
				vm.get_watch();
				break;
			case ('Warnings'):
				vm.get_warn();
				break;
			case ('Sigmet'):
				vm.get_sigmet();
				break;
			case ('Airmet'):
				vm.get_o_air();
				break;
		}
	}

	vm.get_o_air = function() {
		metApi.get_o_air(function(data) {
			vm.o_items = data.items;
			console.log("Air");
			console.log(vm.o_items);
		})
		// $rootScope.$broadcast('scroll.refreshComplete');
	}
	vm.get_sigmet = function() {
		metApi.get_sigmet(function(data) {
			vm.s_items = data.items;
			console.log("SIg");
			console.log(vm.s_items);
		})
		// $rootScope.$broadcast('scroll.refreshComplete');
	}
	vm.get_warn = function() {
		metApi.get_warn(function(data) {
			vm.w_items = data.items;
			console.log("Warning");
			console.log(vm.w_items);

		})
		// $rootScope.$broadcast('scroll.refreshComplete');
	}
	vm.get_watch = function() {
		metApi.get_watch(function(data) {
			vm.wt_items = data.items;
			console.log("Watch");
			console.log(vm.wt_items);
		})
		// $rootScope.$broadcast('scroll.refreshComplete');
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
			case 'o': // air
				metApi.get_o_air(function(data) {
					vm.warning = data.items[0];
					vm.warning.warnType = vm.warning.forecaster;
					console.log(vm.warning)
				}, id);
				break;
			case 's': // sig
				metApi.get_sigmet(function(data) {
					vm.warning = data.items[0];
					// console.log(vm.warning)
				}, id);
				break;
			case 'w': // warnings
				metApi.get_warn(function(data) {
					vm.warning = data.items[0];
					// console.log(vm.warning)
				}, id)
				break;
			case 'wt': // watch
				metApi.get_watch(function(data) {
					vm.warning = data.items[0];
					console.log(vm.warning)
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
	}*/
//})
