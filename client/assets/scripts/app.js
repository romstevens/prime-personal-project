var app = angular.module('app', []);

app.controller('PlayController', ['$scope', '$http', function($scope, $http){
    $scope.scene = {};

    $scope.getScene = function(id) {
        $http.get('/play/scene/' + id).success(function(data){
            console.log(data);
            $scope.scene = data;
        });
    };

    $scope.makeChoice = function(id) {
        $http.post('/play/choice/' + id).success(function(data){
            console.log(data);
            $scope.getScene(data.id);
        });
    };

    $scope.continue = function(choice) {
        if (choice.direct) {
            $scope.getScene(choice.id);
        }
        else {
            $scope.makeChoice(choice.id);
        }
    };

    $scope.test = function(thing){
        console.log(thing);
    };

    $scope.getScene(7);
}]);