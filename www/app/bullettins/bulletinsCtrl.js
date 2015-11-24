angular.module('ionic.metApp')
	.run(function($http, $cordovaPush, $ionicPlatform, $rootScope) {
		$ionicPlatform.ready(function() { // works on web browser
			// Ionic.io();

			// var user = Ionic.User.current();
			// if (!user.id) {
			// 	user.id = Ionic.User.anonymousId();
			// 	user.name = "Test User",
			// 	user.message = "Emulator"
			// }
			// user.save();
			// var push = new Ionic.Push({
			// 	"debug": true
			// });
		})




		var androidConfig = {
			"senderID": "158386410361",
			// "ecb": "window.onNotification"
		};

		// window.onNotification = function(e) {
		// 	alert("nitification")
		// }

		document.addEventListener("deviceready", function() {
			// Ionic.io();

			// var user = Ionic.User.current();
			// if (!user.id) {
			// user.id = Ionic.User.anonymousId();
			// user.name = "Test User",
			// user.message = "Emulator"
			// }
			// user.save();
			var push = new Ionic.Push({
				"debug": true
			});

			push.register(function(token) {
				console.log('Device token:', token.token);
				// alert(token.token);
			})

			$cordovaPush.register(androidConfig).then(function(result) {
				// Success
				// alert("start of push");
				// console.log(result)
			}, function(err) {
				// Error
			})

			$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
				// $scope.$on('pushNotificationReceived', function(event, notification) {
				// alert("end");
				switch (notification.event) {
					case 'registered':
						if (notification.regid.length > 0) {
							// alert('registration ID = ' + notification.regid);
						}
						break;

					case 'message':
						// this is the actual push notification. its format depends on the data model from the push server
						// alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
						break;

					case 'error':
						// alert('GCM error = ' + notification.msg);
						break;

					default:
						// alert('An unknown GCM event has occurred');
						break;
				}
			});


			// WARNING: dangerous to unregister(results in loss of tokenID)
			// $cordovaPush.unregister(options).then(function(result) {
			// 	// Success!
			// }, function(err) {
			// 	// Error
			// })

		}, false);
	})
	.controller('BulletinsCtrl', function(metApi, $scope, $ionicLoading, $timeout, $ionicModal, $cordovaDevice, $ionicPlatform, $cordovaPush) {

		var vm = this;

		$ionicPlatform.ready(function() {
			if (window.cordova) {
				var device = $cordovaDevice.getDevice();
				// alert(device.model);
				// alert(device.cordova);
				// alert(device.platform);
				// alert(device.uuid);
				// alert(device.version);
			}

		})
		// var m = "";
		// slide had changed listener event
		$scope.slideHasChanged = function(index) {
			vm.update_slide(index);
		}

		// update slide with index
		vm.update_slide = function(index) {
			titles = ['General Information', 'Severe Weather', 'Floods', 'Rough Seas'];
			$scope.sub_title = titles[index];
			// m = index;
			// console.log($scope.m)
		}

		// get general info bulletins
		vm.getGIBulletins = function() {
			metApi.get_b_info(function(data) {
				vm.b_info = data.items;
				console.log("general info")
				console.log(data)

				// alert(data.item[0].flag)
			});
		}

		// get severe weather bulletins
		vm.get_serv_b = function() {
			metApi.get_b_serv(function(data) {
				console.log("severe info")
				console.log(data)
				vm.s_items = data.items;

			})
		}
		// get blood bulletins
		vm.get_flood_b = function() {
			metApi.get_b_flood(function(data) {
				console.log("flood info")
				console.log(data)
				vm.f_items = data.items;

			})
		}

		// get rouch seas
		vm.get_sea_b = function() {
			metApi.get_b_sea(function(data) {
				vm.r_items = data.items;
				console.log("rough info")
				console.log(data);
				// console.log(data)
			})
		}


		// Create modals
		$ionicModal.fromTemplateUrl('app/bullettins/info_item.html', {
			scope: $scope,
			animation: 'scale-in' //modal animation
		}).then(function(b_details_modal) {
			$scope.b_details_modal = b_details_modal;
		});
		// close modal
		$scope.b_info_close = function() {
			$scope.b_details_modal.hide();
		};

		// Open the login modal
		$scope.b_info_open = function(id, type) {
			$scope.b_details_modal.show();
			// switch function that gets called based on what key is submitted from clicked item
			switch (type) {
				case 'b': // bulletin
					metApi.get_b_info(function(data) {
						vm.bulletin = data.items[0];
						console.log(vm.bulletin)
					}, id);
					break;
				case 's':
					metApi.get_b_serv(function(data) {
						vm.bulletin = data.items[0];
						console.log(vm.bulletin)
					}, id);
					break;
				case 'f':
					metApi.get_b_flood(function(data) {
						vm.bulletin = data.items[0];
						console.log(vm.bulletin)
					}, id)
					break;
				case 'r':
					metApi.get_b_sea(function(data) {
						vm.bulletin = data.items[0];
						console.log(vm.bulletin)
					}, id)
					break;
			}
		};

	})
