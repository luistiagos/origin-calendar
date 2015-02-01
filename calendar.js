

angular.module("ui.calendar", ['ionic']);

angular.module("ui.calendar").directive("calendar", ['$ionicGesture', function($ionicGesture){

	return {
		restrict:"E",
		scope:{selectedDate:"=ngModel"},
		templateUrl:"calendar.template.html",
		link: function (scope, element, attrs) {
			$ionicGesture.on("swipeleft", scope.swipeLeft,element);
			$ionicGesture.on("swiperight", scope.swipeRight,element);
		},
		controller:function($scope){
			
			$scope.days = [];
			
			$scope.daysInWeek = ["dom","seg","ter","qua","qui","sex","sab"];
			$scope.months = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

			$scope.update = function() {
				$scope.date.setMonth($scope.month);
				$scope.days = [];
				$scope.startingDays();
				$scope.$apply();				
			}			

			$scope.swipeRight = function () {
				$scope.month--;
				$scope.update();			
			}

			$scope.swipeLeft = function () {
				$scope.month++;	
				$scope.update();
			}


			$scope.startingDays = function() {			
				$scope.day = $scope.date.getDate();

				//de volta para o dia 1
				$scope.date.setDate(1);
		
				$scope.month = $scope.date.getMonth();
				$scope.year = $scope.date.getFullYear()

				$scope.getDaysInMonth($scope.date.getDay());
			}

			$scope.getDaysInMonth = function(dayInWeek) {
				var daysCont = 28; // nao e bissexto, fev

				// Set, Abr, Jun, Nov
				if( /8|3|5|10/.test( $scope.month ) ) daysCont = 30;

				// Nao e fev
				if( $scope.month != 1 ) daysCont = 31;

				// Ano bissexto, fev
				if( ( $scope.year % 4 == 0 && $scope.year % 100 != 0 ) || $scope.year % 400 == 0 ) daysCont = 29;

				//setando os dias em vazio, para sincronizar dia da semana
				dayInWeek++;

				for (var i = 1;i < dayInWeek;i++) {
					$scope.days.push("");
				}

				for (var i = 1;i <= daysCont;i++) {
					$scope.days.push(i);
				}
		
				var lastDay = new Date();
				lastDay.setDate(daysCont);
				lastDay.setMonth($scope.month);
				lastDay.setFullYear($scope.year);
				var dayLimit = lastDay.getDay();
				for (var i = 5; i >= dayLimit; i--) {
					$scope.days.push("");
				}
			}
	
			$scope.selectedDate = $scope.date = new Date();
			$scope.startingDays();
		}
	}
}]);


//angular.module("ui.calendar").controller("OriginCalendarCtrl", ['$scope', ]);
