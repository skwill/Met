angular.module('ionic.metApp').controller('BulletinsCtrl', function(metApi, $scope, $ionicModal) {

	// $scope.show = function() {
	//     $ionicLoading.show({
	//       template: '<p>Loading...</p><ion-spinner></ion-spinner>'
	//     });
 //  	};

 //  $scope.hide = function(){
 //       $ionicLoading.hide();
 //  };

	var vm = this;
	vm.getGIBulletins = function() {
		// $scope.show($ionicLoading);
		metApi.getBulletins(function(data){
			vm.meta = data._meta;
			vm.links = data._links;
			vm.bulletins = data.items;
			vm.pageTitle = vm.bulletins[0].bulletinpage;
			//console.log(data)
			// $scope.hide($ionicLoading);
		});
	}

	/*vm.getSWBulletins = function() {
		metApi.getBulletinsev(function(data){
			vm.bulletins = data.items;
			vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}*/

	vm.getSevere = function(){
		metApi.getBulletinsev(function(data){
			vm.severe = data.items;
			//console.log(data);
		})
	}

	vm.getFlood = function(){
		metApi.getBulletinFlood(function(data){
			vm.flood = data.items;
			//console.log(data);
		})
	}

	vm.getSea = function(){
		metApi.getBulletinSea(function(data){
			vm.sea = data.items;
			console.log(data.items);
		})
	}


	// vm.getBulletin = function(id){
	// 	//console.log('id ='+id)
		

	// 	vm.go = true;
	// 	vm.indexId = null;
	// 	//vm.pass = "crap";
	// 	vm.gid = id;

	// 	metApi.getBulletins(function(data){
	// 		angular.forEach(data.items, function(data2, index){
	// 			//console.log(data2);
	// 			//console.log('index id ='+index);
	// 			//console.log(go);

	// 		   	if (vm.go == true) {
	// 		   		if (index == vm.gid) {
	// 		   			//console.log('index id ='+index);
	// 		   			vm.go = false;
	// 		   			vm.pass = data2;
			   			
	// 		   			//vm.indexId = index;
	// 		   			//console.log(indexId);
	// 		   			//console.log(data2);
			   			
	// 		   			//return vm.pass;
	// 		   		};

	// 		   	};

			   				   			   
	// 		});

	// 		//console.log(vm.pass);
	// 		return vm.pass;
	// 	});	

		//console.log(vm.pass);
		
	//}
	

	$scope.openModalFunction = function(){
		$ionicModal.fromTemplateUrl('app/bullettins/infomodal.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal){			
		    $scope.modal = modal;
		    $scope.modal.show();


		    //console.log(index);
		});

		/*$scope.openModal = function() {
	        $scope.modal.show();
	    };*/

	    $scope.closeModal = function() {
	        $scope.modal.hide();
	    };


	    $scope.$on('$destroy', function() {
	        $scope.modal.remove();
	    });

	    $scope.$on('modal.hidden', function() {
	        // Execute action
	    });

	    $scope.$on('modal.removed', function() {
	        // Execute action
	    });
	}
})
