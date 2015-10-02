(function (){
	'use strict';

	

	angular.module('metApp').controller('HomeCtrl', ['metApi', HomeCtrl]);

	function HomeCtrl(metApi){
		var vm = this;

		metApi.getLeagues(function(data){
			vm.leagues = data;

			var xmlstr = data;

			// gets JSON object from a string with xml content
			var objson = xml2json.fromStr(xmlstr);
			console.log(objson.response.items.item.IssuedAt);
			//var o = JSON.parse(objson);
			// gets JSON string from a string with xml content
			//var strjson = xml2json.fromStr(xmlstr, 'string');
		});

		/*var leagues = metApi.getLeagues();
		vm.leagues = leagues;*/

		//console.log(vm.leagues.forecaster);
		/*var leagueData = eliteApi. getLeagueData();

		console.log(leagues, leagueData);*/
	};
})();