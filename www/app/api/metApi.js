(function() {
	'use strict';

	angular.module('ionic.metApp').factory('metApi', ['$http', metApi]);
	var url = 'http://190.58.130.230/api';


	function metApi($http) {
		/*
		function get_forecast(callback, id) {
			var link = (id != undefined) ? '/' + id : '';
			$http.get(url + '/forecast' + link).success(function(resp) {
				callback(resp);
			}).finally(function() {

			});
		}*/
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		// all these function will collapse into 1 generic function called met_data
		// met_data will take the following params
		/*
			default: callback - for data:array
			id: id of record to fetch (can be null or undeined):int
			api_key: url of segment to fetch (if there is an id it will be appended to api_key string):string
		*/

		function subscribe_token(callback, token) {
			// http://190.58.130.230/api/subscribe?device_token=[TOKEN].
			$http.post(url + '/subscribe?device_token=' + token).success(function(data) {
				callback(data)
			})
		}

		function get_tokens(callback) {
			$http.get(url + '/subscribe/list').success(function(data) {
				callback(data)
			})
		}

		function unsubscribe(callback, token) {
			var link = (token != undefined) ? '?device_token=' + token : '';
			$http.post(url + '/unsubscribe' + link).success(function(data) {
				callback(data)
			})
		}

		function get_forecast(callback) {
			$http.get(url + '/forecast').success(function(data) {
				callback(data)
			})
		}


		function get_b_info(callback, id) {
			var link = (id != undefined) ? '/' + id : '';
			// $ionicLoading.show({
			// 	template: ' <ion-spinner></ion-spinner>'
			// });
			$http.get(url + "/bulletininfo" + link)
				.success(function(data) {
					callback(data);
				});
		}

		function get_b_serv(callback, id) {
			var link = (id != undefined) ? '/' + id : '';
			$http.get(url + "/bulletinsev" + link)
				.success(function(data) {
					callback(data);
				});
		}

		function get_b_flood(callback, id) {
			var link = (id != undefined) ? '/' + id : '';
			$http.get(url + '/bulletinflood' + link).success(function(data) {
				callback(data)
			})
		}

		function get_b_sea(callback, id) {
			var link = (id != undefined) ? '/' + id : '';
			$http.get(url + '/bulletinsea' + link).success(function(data) {
				callback(data)
			})
		}

		// check for winds
		function get_o_air(callback, id) {
			var link = (id != undefined) ? '/' + id : '';

			$http.get(url + '/outlookair' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_o_aviation(callback, id) {
			var link = (id != undefined) ? '/' + id : '';

			$http.get(url + '/outlookaviation' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_o_period(callback, id) {
			var link = (id != undefined) ? '/' + id : '';

			$http.get(url + '/outlookperiod' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_o_tv(callback, id) {
			var link = (id != undefined) ? '/' + id : '';

			$http.get(url + '/outlooktv' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_sigmet(callback, id) {
			var link = (id != undefined) ? '/' + id : '';

			$http.get(url + '/sigmet' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_ttcp(callback, id) {
			var link = (id != undefined) ? '/' + id : '';

			$http.get(url + '/ttcp' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_ttpp(callback, id) {
			var link = (id != undefined) ? '/' + id : '';

			$http.get(url + '/ttpp' + link)
				.success(function(data) {
					callback(data)
				})
		}

		function get_warn(callback, id) {
			var link = (id != undefined) ? '/' + id : '';

			$http.get(url + '/warn' + link)
				.success(function(data) {
					callback(data)
				})
		}


		function get_watch(callback, id) {
			var link = (id != undefined) ? '/' + id : '';

			$http.get(url + '/watch' + link)
				.success(function(data) {
					callback(data)
				})
		}


		function get_uv_index(callback) {
			var headers = {
				'Cache-Control': 'max-age="600"'
			};
			$http.get(url + '/uv', headers).success(function(data) {
				// console.warn(data)
				callback(data)
			})
		}

		// new set of keys
		// was there before just modified to take an id
		function get_radar(callback, id) {
			var link = "";
			if (id && id != 0) {
				link = id;
			}
			// var link = (id != undefined) ? '/' + id : '';

			// console.log('link', link)
			$http.get(url + '/radar/search?item=' + link).success(function(data) {
				callback(data)
			})
		}

		function get_tourism(callback) {
			$http.get(url + '/tourism').success(function(data) {
				callback(data)
			})
		}

		function get_tides(callback) {
			$http.get(url + '/tidal').success(function(data) {
				callback(data)
			})
		}

		function get_drywet(callback) {
			$http.get(url + '/drywet').success(function(data) {
				callback(data)
			})
		}

		function get_issue(callback) {
			$http.get(url + '/issue').success(function(data) {
				callback(data)
			})
		}

		function get_agrotrini(callback) {
			$http.get(url + '/argotrini').success(function(data) {
				callback(data)
			})
		}

		function get_agroData(type, callback) {
			var agrourl = 'http://190.58.130.230/api/argotrini/search?item=';

			$http.get(agrourl + type).success(function(data) {
				callback(data);
			})
		}

		function get_agrotbg(callback) {
			$http.get(url + '/argotbg').success(function(data) {
				callback(data)
			})
		}

		function get_agroDataTbg(type, callback) {
			var agrourl = 'http://190.58.130.230/api/argotbg/search?item=';

			$http.get(agrourl + type).success(function(data) {
				callback(data);
			})
		}

		function get_trend(callback) {
			$http.get(url + '/trend').success(function(data) {
				callback(data)
			})
		}

		function get_elnino(callback) {
			$http.get(url + '/elnino').success(function(data) {
				callback(data)
			})
		}

		function get_elninos(callback) {
			$http.get(url + '/elninos').success(function(data) {
				//console.log("Total = " + data._meta.totalCount);

				var count = data._meta.totalCount;
				var info = new Array(count);

				for (var i = 0; i < count; i++) {
					info[i] = data.items[i];
				};

				//console.log(info[0]);
				data = info;

				callback(data)
			})
		}

		function get_option_files(callback, s) {
			$http.get(url + s).success(function(data) {
				callback(data);
			})
		}


		function get_rainandtemp(callback) {
			$http.get(url + '/rainandtemp').success(function(data) {
				callback(data)
			})
		}

		function get_project(callback) {
			$http.get(url + '/project').success(function(data) {
				callback(data)
			})
		}

		function get_metar(callback) {
			$http.get(url + '/metar').success(function(data) {
				callback(data)
			})
		}

		function get_aws(callback, station) {
			$http.get(url + '/aws/search?name=' + station).success(function(data) {
				callback(data)
			});
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
			get_uv_index: get_uv_index,
			get_radar: get_radar,
			get_tourism: get_tourism,
			get_tides: get_tides,
			get_drywet: get_drywet,
			get_issue: get_issue,
			get_agrotrini: get_agrotrini,
			get_agrotbg: get_agrotbg,
			get_agroData: get_agroData,
			get_agroDataTbg: get_agroDataTbg,
			get_trend: get_trend,
			get_elnino: get_elnino,
			get_elninos: get_elninos,
			get_rainandtemp: get_rainandtemp,
			get_project: get_project,
			get_metar: get_metar,
			get_aws: get_aws,
			subscribe_token: subscribe_token,
			get_tokens: get_tokens,
			unsubscribe: unsubscribe,
			get_option_files: get_option_files,
		};
	}
})();
