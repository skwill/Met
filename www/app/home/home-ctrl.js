angular.module('metApp').controller('HomeCtrl', function(metApi, $scope) {
	var vm = this;

	metApi.forecast(function(data){
		// console.log(data.items);
	});

	$scope.doRefresh = function() {
		metApi.forecast(function(data){
			// console.log(data.items);
		});
		$scope.$broadcast('scroll.refreshComplete');
	}
})
// (function (){
// 	'use strict';



// 	angular.module('metApp').controller('HomeCtrl', ['metApi', HomeCtrl]);

// 	function HomeCtrl(metApi){
// 		var vm = this;

// 		metApi.forecast(function(data){
// 			// vm.leagues = data;
// 			console.log(data.items);

// 			// var xmlstr = data;

// 			// gets JSON object from a string with xml content
// 			// var objson = xml2json.fromStr(xmlstr);
// 			// console.log(objson.response.items.item.IssuedAt);


// 			//var o = JSON.parse(objson);
// 			// gets JSON string from a string with xml content
// 			//var strjson = xml2json.fromStr(xmlstr, 'string');
// 		});

// 		vm.doRefresh = function() {
// 			alert();
// 		}

// 		/*var leagues = metApi.getLeagues();
// 		vm.leagues = leagues;*/

// 		//console.log(vm.leagues.forecaster);
// 		/*var leagueData = eliteApi. getLeagueData();

// 		console.log(leagues, leagueData);*/
// 	};
// })();
