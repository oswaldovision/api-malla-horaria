var module = angular.module('app')

var controller = function ($scope, $location) {
  $scope.message = '';
}

module.component('unauthorized', {
  templateUrl: './../templates/unauthorized.html',
  controller: ['$scope', '$location', controller]
})