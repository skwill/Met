angular.module('metApp').controller('HomeCtrl', function(metApi) {

	var vm = this;
	vm.getForecast = function() {
		metApi.forecast(function(data){
			/*vm.meta = data._meta;
			vm.links = data._links;*/
			vm.bulletins = data.items[0];
			//console.log(vm.bulletins.IssuedAt);
			//vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}
/*
	vm.getSWBulletins = function() {
		metApi.getBulletinsev(function(data){
			vm.bulletins = data.items;
			vm.pageTitle = vm.bulletins[0].bulletinpage;
		});
	}


	vm.getBulletin = function(id) {

	}*/
})


/*(function (){
	'use strict';



	angular.module('metApp').controller('HomeCtrl', ['metApi', HomeCtrl]);

	function HomeCtrl(metApi){
		var vm = this;

		metApi.forecast(function(data){
			// vm.leagues = data;
			console.log(data.items);

			// var xmlstr = data;

			// gets JSON object from a string with xml content
			// var objson = xml2json.fromStr(xmlstr);
			// console.log(objson.response.items.item.IssuedAt);


			//var o = JSON.parse(objson);
			// gets JSON string from a string with xml content
			//var strjson = xml2json.fromStr(xmlstr, 'string');
		});

		/*var leagues = metApi.getLeagues();
		vm.leagues = leagues;*/

		//console.log(vm.leagues.forecaster);
		/*var leagueData = eliteApi. getLeagueData();

		console.log(leagues, leagueData);*/
/*	};
})();
*/