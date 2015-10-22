(function () {
	'use strict';

	angular.module('ionic.metApp').factory('metApi', ['$http', metApi]);
	var url = 'http://190.58.130.230/api';


	function metApi($http){

		function get_forecast(callback) {
			$http.get(url+'/forecast').success(function(resp) {
				callback(resp);
			}).finally(function() {

			});
		}

		function get_b_info(callback, id){
			var link = " ";
			if(id =! 'undefined') {
				link = '/'+id;
			}
			$http.get(url+"/bulletininfo"+link)
				.success(function(data){
					callback(data);
				});
		}

		function get_b_serv(callback){
			$http.get(url+"/bulletinsev")
				.success(function(data){
					callback(data);
				});
		}

		function get_b_flood(callback) {
			$http.get(url+'/bulletinflood')
				.success(function(data) {
					callback(data)
				})
		}

		function get_b_sea(callback) {
			$http.get(url+'/bulletinsea')
				.success(function(data) {
					callback(data)
				})
		}

		function get_o_air(callback) {
			$http.get(url+'/outlookair')
				.success(function(data) {
					callback(data)
				})
		}

		function get_o_aviation(callback) {
			$http.get(url+'/outlookaviation')
				.success(function(data) {
					callback(data)
				})
		}

		function get_o_period(callback) {
			$http.get(url+'/outlookperiod')
				.success(function(data) {
					callback(data)
				})
		}

		function get_o_tv(callback) {
			$http.get(url+'/outlooktv')
				.success(function(data) {
					callback(data)
				})
		}

		function get_sigmet(callback) {
			$http.get(url+'/sigmet')
				.success(function(data) {
					callback(data)
				})
		}

		function get_ttcp(callback) {
			$http.get(url+'/ttcp')
				.success(function(data) {
					callback(data)
				})
		}

		function get_ttpp(callback) {
			$http.get(url+'/ttpp')
				.success(function(data) {
					callback(data)
				})
		}

		function get_warn(callback) {
			$http.get(url+'/warn')
				.success(function(data) {
					callback(data)
				})
		}

		function get_watch(callback) {
			$http.get(url+'/watch')
				.success(function(data) {
					callback(data)
				})
		}

		return{
			get_forecast: get_forecast,
			get_b_info: get_b_info,
			get_b_serv: get_b_serv,
			get_b_flood: get_b_flood,
			get_b_sea: get_b_sea,
			get_o_air: get_o_air,
			get_o_aviation: get_o_aviation,
			get_o_period: get_o_period,
			get_o_tv: get_o_tv,
			get_sigmet: get_sigmet,
			get_ttcp: get_ttcp,
			get_ttpp: get_ttpp,
			get_warn: get_warn,
			get_watch: get_watch,
		};
	}
})();
