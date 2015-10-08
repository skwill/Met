angular.module('metApp').run(function($rootScope) {
		// $rootScope.myclass =  "bar-royal"
	}).controller('HomeCtrl', function(metApi, $scope) {
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

	$scope.doRefresh = function() {
		vm.yForecast();
		$scope.$broadcast('scroll.refreshComplete');
	}

	vm.yForecast = function() {
		metApi.yahooForecast(function(data){
			vm.condition = data.query.results.channel.item.condition;
			vm.threeDay = data.query.results.channel.item.forecast;
			vm.location = data.query.results.channel.location.city; //item.pubDate //item.title
			vm.pubDate = data.query.results.channel.item.pubDate;
			vm.title = data.query.results.channel.item.title;
			vm.sunrise = data.query.results.channel.astronomy.sunrise;
			vm.sunset = data.query.results.channel.astronomy.sunset;

			var d = new Date();
    		var n = d.getHours();

    		var demo = document.getElementById("demo");

    		if (n >= 6 && n < 12) {
    			demo.style.background =  "url('https://hereandthereblogger.files.wordpress.com/2011/12/iphone-4-background-28.jpg') no-repeat center center";
    		}else if (n >= 12 && n < 13) {
    			demo.style.background =  "url('http://www.ilikewallpaper.net/iphone-5-wallpapers/download/11473/Miniature-City-2-iphone-5-wallpaper-ilikewallpaper_com.jpg') no-repeat center center"; 	
    		}else if (n >= 15 && n < 18) {  
    			demo.style.background =  "url('http://www.ilikewallpaper.net/iphone-4s-wallpapers/download/8047/Apple-Black-Background-iphone-4s-wallpaper-ilikewallpaper_com.jpg') no-repeat center center"; 		
    		}else{
    			demo.style.background =  "url('http://icetothebrim.com/wp-content/uploads/2012/01/iphone_space_ampersand_blur.png')  no-repeat center center";
    			
    		};

    		console.log(data);

    		

    		
			//console.log(n);
			/*vm.meta = data._meta;
			vm.links = data._links;*/
			//vm.bulletins = data.items[0];
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
