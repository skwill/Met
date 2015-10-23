(function () {
	'use strict';

	angular.module('ionic.metApp').factory('metApi', ['$http', metApi]);
	var url = 'http://190.58.130.230/api';


	function metApi($http){

		function forecast(callback) {
			$http.get(url+'/forecast').success(function(resp) {
				callback(resp);
			}).finally(function() {

			});
		}

		function yahooForecast(callback) {
			$http.get("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22port%20of%20spain%22%20)and%20u%3D'c'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys").success(function(resp) {
				callback(resp);
			});
		}

		function getBulletins(callback){
			$http.get(url+"/bulletininfo")
				.success(function(data){
					callback(data);
				});
		}

		function getBulletinsev(callback){
			$http.get(url+"/bulletinsev")
				.success(function(data){
					callback(data);
				});

			//return leagues.items[0];
		}

		function getBulletinFlood(callback){
			$http.get(url+"/bulletinflood")
				.success(function(data){
					callback(data);
				});

			//return leagues.items[0];
		}

		function getBulletinSea(callback){
			$http.get(url+"/bulletinflood")
				.success(function(data){
					callback(data);
				});

			//return leagues.items[0];
		}

		return{
			// getLeagues: getLeagues,
			getBulletins: getBulletins,
			getBulletinsev: getBulletinsev,
			getBulletinFlood: getBulletinFlood,
			getBulletinSea: getBulletinSea,
			forecast: forecast,
			yahooForecast: yahooForecast
			/*getLeagueData: getLeagueData*/
		};
	}
})();

/*var leagues = JSON.parse('[{"id":1005,"name":"5th Grade Saturday 2013-14 League","isDirty":false,"isArchived":false},{"id":1004,"name":"6th Grade Friday 2013-14 League","isDirty":false,"isArchived":false},{"id":2008,"name":"7th Grade HYBA Spring 2014","isDirty":false,"isArchived":false},{"id":1,"name":"7th Grade MS JV Friday 2013-14 League","isDirty":false,"isArchived":false},{"id":2,"name":"7th Grade MS JV Saturday 2013-14 League","isDirty":false,"isArchived":false},{"id":3,"name":"8th Grade MS Varsity Friday 2013-14 League","isDirty":false,"isArchived":false},{"id":1003,"name":"8th Grade MS Varsity Saturday 2013-14 League","isDirty":false,"isArchived":false},{"id":2007,"name":"Friday Spring 6th Grade","isDirty":false,"isArchived":false},{"id":2005,"name":"March Madness Tournament 2014","isDirty":false,"isArchived":false},{"id":2010,"name":"Metro Classic 2014","isDirty":false,"isArchived":false},{"id":2009,"name":"Spring Fling Tournament 2014","isDirty":false,"isArchived":false},{"id":2011,"name":"Summer Showdown 2014","isDirty":false,"isArchived":false}]');*/

	/*	var leagues = {"items":[{"bulletinflooddatatblID":1,"flag":"0","bulletinpage":"Flood","forecaster":"Marlon Noel","bulletinType":"FLOOD BULLETIN","bulletinNum":"232","textArea1":"sdfaf","textArea2":"dsfsd","textArea3":"","textArea4":"","textArea5":"","insertionDate":"2015-09-03","issuedAt":"01:17 PM","currdate":"Thursday 03rd of September 2015 ","jsonObject":"{\"flag\":\"1\",\"bulletinpage\":\"Flood\",\"forecaster\":\"Marlon Noel\",\"bulletinType\":\"FLOOD BULLETIN\",\"bulletinNum\":\"232\",\"textArea1\":\"sdfaf\",\"textArea2\":\"dsfsd\",\"textArea3\":\"\",\"textArea4\":\"\",\"textArea5\":\"\",\"issuedAt\":\"01:17 PM\",\"currdate\":\"Thursday 03rd of September 2015 \",\"insertionDate\":\"2015-09-03\"}"}],"_links":{"self":{"href":"http://190.58.130.230/api/bulletinfloods?page=1"}},"_meta":{"totalCount":1,"pageCount":1,"currentPage":1,"perPage":20}};*/
