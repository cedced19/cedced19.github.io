angular.module('Calculs', []).controller('CalculsCtrl', ['$scope', function($scope) {
    $scope.hours = 1000;
    $scope.watt = 8;
    $scope.costBulb = 22.98;
    $scope.lifetime = 50000;
    $scope.costKwh = 0.1329;
}]);