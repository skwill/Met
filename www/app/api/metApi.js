(function() {
	'use strict';

	angular.module('ionic.metApp').factory('metApi', ['$http', metApi]);
	var url = 'http://190.58.130.230/api';


	function metApi($http) {

		function get_forecast(callback) {
			$http.get(url + '/forecast').success(function(resp) {
				callback(resp);
			}).finally(function() {

			});
		}
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		// all these function will collapse into 1 generic function called met_data
		// met_data will take the following params
		/*
			default: callback - for data:array
			id: id of record to fetch (can be null or undeined):int
			api_key: url of segment to fetch (if there is an id it will be appended to api_key string):string
		*/
		function get_b_info(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';
			$http.get(url + "/bulletininfo" + link)
				.success(function(data) {
					callback(data);
				});
		}

		function get_b_serv(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';
			$http.get(url + "/bulletinsev" + link)
				.success(function(data) {
					callback(data);
				});
		}

		function get_b_flood(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';
			$http.get(url + '/bulletinflood' + link).success(function(data) {
				callback(data)
			})
		}

		function get_b_sea(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';
			$http.get(url + '/bulletinsea' + link).success(function(data) {
				callback(data)
			})
		}

		function get_o_air(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';

			$http.get(url + '/outlookair' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_o_aviation(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';

			$http.get(url + '/outlookaviation' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_o_period(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';

			$http.get(url + '/outlookperiod' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_o_tv(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';

			$http.get(url + '/outlooktv' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_sigmet(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';

			$http.get(url + '/sigmet' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_ttcp(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';

			$http.get(url + '/ttcp' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_ttpp(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';

			$http.get(url + '/ttpp' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_warn(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';

			$http.get(url + '/warn' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_watch(callback, id) {
			var link = (id = !'undefined') ? '/' + id : '';

			$http.get(url + '/watch' + link)
				.success(function(data) {
					callback(data)
				})
		}
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		return {
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
