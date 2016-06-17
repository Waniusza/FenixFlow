App
        .controller('AppController', ['$scope', '$rootScope', '$state', '$interval', 'resourceService', 'APP_CONFIG', 
                function ($scope, $rootScope, $state,  $interval, resourceService, APP_CONFIG) {
					$scope.prefix = APP_CONFIG.FILE_PREFIX;
							
					function clearAdds() {
						angular.forEach(document.getElementsByClassName("cbalink"), function (element) {
							element.hidden = true;
						});

						var ad = document.getElementById("bmone2n-1276.1.1.1")
						if (ad !== null) {
							ad.hidden = true;
						}
					}
					
					$interval(clearAdds, 100);
					$rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
						console.log("$stateChangeSuccess ", event, toState, toParams, fromState, fromParams);
						$rootScope.activeItem = toState.name;
					});
					$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
						console.log("$stateChangeError ", event, toState, toParams, fromState, fromParams, error);

			
					});
					
					$rootScope.activeItem = $state.$current.name;

					$rootScope.logoDest = APP_CONFIG.FILE_PREFIX + "/assets/data/foto/logo_new.jpg";
            }]);