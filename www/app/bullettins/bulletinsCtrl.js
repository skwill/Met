angular.module('metApp').controller('BulletinsCtrl', function(metApi) {

	var vm = this;
	vm.getGIBulletins = function() {
		metApi.getBulletins(function(data){
			vm.meta = data._meta;
			vm.links = data._links;
			vm.bulletins = data.items;
			vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}

	vm.getSWBulletins = function() {
		metApi.getBulletinsev(function(data){
			vm.bulletins = data.items;
			vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}


	vm.getBulletin = function(id) {

	}
})
