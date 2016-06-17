(function () {
    'use strict';
    App.controller('TeamController', TeamController);

    TeamController.$inject = ['$scope', '$timeout', 'resourceService', 'APP_CONFIG'];

    function TeamController($scope, $timeout, resourceService, APP_CONFIG) {

        $scope.title = "Team";
        $scope.teamData = {};
        $scope.activeElement;
        $scope.setActiveElement = setActiveElement;

        var dataSource = APP_CONFIG.FILE_PREFIX + "/assets/data/jsons/team";
        (function init() {
            console.log("TeamController init");
            resourceService.getFileDate(dataSource, "json").then(function (result) {
                var id = 0
                angular.forEach(result, function (person) {
                    if (person.active != false) {
                        person.id = id++;
                    }
                });
                $scope.teamData = result;
                console.log("TEST", $scope.teamData, $scope.teamData.length > 0);
                if ($scope.teamData.length > 0) {
                    $timeout(function () {
                        setActiveElement(1);
                    }, 200);
                }
            });

            console.log("TeamController teamData", $scope.teamData);
        })();

        function setActiveElement(index) {
            var slideElements = document.getElementsByClassName("slider");

            angular.forEach(slideElements, function (slider, sliderIndex) {
                switch (sliderIndex - index) {
//                    case -2 :
////                        slider.classList.remove("slider-lvl1");
////                        slider.classList.remove("slider-lvl2");
////                        slider.classList.add("slider-lvl3");
////                        slider.classList.add("left");
////                        slider.classList.remove("right");
////                        slider.classList.remove("hide");
//
//                        slider.className = "slider slider-lvl3 left";
//                        break;
                    case -1 :
//                        slider.classList.remove("slider-lvl1");
//                        slider.classList.add("slider-lvl2");
//                        slider.classList.remove("slider-lvl3");
//                        slider.classList.add("left");
//                        slider.classList.remove("right");
//                        slider.classList.remove("hide");
                        slider.className = "slider slider-lvl2 left";
                        break;
                    case 0 :
//                        slider.classList.add("slider-lvl1");
//                        slider.classList.remove("slider-lvl2");
//                        slider.classList.remove("slider-lvl3");
//                        slider.classList.remove("left");
//                        slider.classList.remove("right");
//                        slider.classList.remove("hide");
                        slider.className = "slider slider-lvl1";
                        break;
                    case 1 :
//                        slider.classList.remove("slider-lvl1");
//                        slider.classList.add("slider-lvl2");
//                        slider.classList.remove("slider-lvl3");
//                        slider.classList.remove("left");
//                        slider.classList.add("right");
//                        slider.classList.remove("hide");
                        slider.className = "slider slider-lvl2 right";
                        break;
//                    case 2 :
////                        slider.classList.remove("slider-lvl1");
////                        slider.classList.remove("slider-lvl2");
////                        slider.classList.add("slider-lvl3");
////                        slider.classList.remove("left");
////                        slider.classList.add("right");
////                        slider.classList.remove("hide");
//                        slider.className = "slider slider-lvl3 right";
//                        break;
                    default :
//                        slider.classList.add("hide");
                        slider.className = "slider hide";
                }
            });
        }
    }

    App.directive("teamMember", ['APP_CONFIG', function (APP_CONFIG) {
            return {
                restrict: "AE",
                templateUrl: "components/team/team-member.html",
                scope: {
                    person: "="
                },
                controller: ['$scope', function ($scope) {
                        $scope.birthdayImage = APP_CONFIG.FILE_PREFIX + "/assets/image/birthday.png";
                        $scope.person.data.imageName = APP_CONFIG.FILE_PREFIX + $scope.person.data.imageName;
                        $scope.person.age = _countAge($scope.person.data.bornYear);
                        $scope.person.isBirthday = _checkBirthday($scope.person.data.bornYear);
                    }]
            }
        }])

    function _countAge(bornTime) {
        var TODAY = new Date();
        var bornDate = new Date(bornTime);
        console.log("Born date :", bornDate);
        var age = TODAY.getFullYear() - bornDate.getFullYear() - 1;

        if (TODAY.getMonth() > bornDate.getMonth()) {
            age++;
        } else if (TODAY.getMonth() == bornDate.getMonth() && (TODAY.getDay() > bornDate.getDay())) {
            age++;
        }
        console.log("Got age:", age);
        return age;
    }

    function _checkBirthday(bornTime) {
        var TODAY = new Date();
        var bornDate = new Date(bornTime);
        return TODAY.getMonth() == bornDate.getMonth() && TODAY.getDate() == bornDate.getDate();
    }

})();