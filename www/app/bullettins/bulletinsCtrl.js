(function (){
	'use strict';

	angular.module('metApp').controller('BulletinsCtrl', ['metApi', BulletinsCtrl]);

	function BulletinsCtrl(metApi){
		var vm = this;

		metApi.getBulletins(function(data){
			vm.bulletins = data;
			console.log(vm.bulletins.items[0].forecaster);
		});



		/*var leagues = metApi.getLeagues();
		vm.leagues = leagues;*/

		//console.log(vm.leagues.forecaster);
		/*var leagueData = eliteApi. getLeagueData();

		console.log(leagues, leagueData);*/
	};
})();

(function (){
	'use strict';

	angular.module('metApp').controller('BulletinsinfoCtrl', ['metApi', BulletinsinfoCtrl]);

	function BulletinsinfoCtrl(metApi){
		var vm = this;

		metApi.getBulletinsev(function(data){
			vm.bulletins = data;
			console.log(vm.bulletins.items[0].forecaster);
		});



		/*var leagues = metApi.getLeagues();
		vm.leagues = leagues;*/

		//console.log(vm.leagues.forecaster);
		/*var leagueData = eliteApi. getLeagueData();

		console.log(leagues, leagueData);*/
	};
})();