(function (){
	'use strict';

	angular.module('metApp').controller('HomeCtrl', ['metApi', HomeCtrl]);

	function HomeCtrl(metApi){
		var vm = this;

		var leagues = metApi.getLeagues();
		vm.leagues = leagues;

		console.log(vm.leagues.forecaster);
		/*var leagueData = eliteApi. getLeagueData();

		console.log(leagues, leagueData);*/
	};
})();