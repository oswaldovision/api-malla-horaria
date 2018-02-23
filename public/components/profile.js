var module = angular.module('app')

var controller = function ($scope, AuthService, Session, $location,$timeout) {
  $scope.message = "";
  $scope.showError = false;
  $scope.doFade = false;

  $scope.formLogin = true;
  $scope.credentials = {
    email : '',
    password : ''
  }
  $scope.current = {};
  $scope.$watch(function () {
    return Session.user
  }, function () {
    $scope.current = Session.user
  }, true)

  $scope.authenticate = function (credentials) {
    AuthService.login(credentials).then(function (data) {
      if (data.status == 401){
        $scope.formLogin = true;
        $scope.showError = false;
        $scope.doFade = false;

        $scope.showError = true;
        $scope.message = 'usuario o password invalido';

        $timeout(function () {
          $scope.doFade = true;
          $scope.showError = false;
        }, 1000);
      }else{
        $scope.formLogin = false;
        // AuthService.getRolesUser(data.mail)
        $location.path('/schedule');
      }
    }).catch(function (er) {
      console.log('usuario erro' + er)
    })
  }

  $scope.logout = function () {
    AuthService.logout();
    $scope.formLogin = true;
    $scope.credentials.email = '';
    $scope.credentials.password = '';
    $location.path('/')
  }
}

module.component('profile', {
  templateUrl: '../templates/profile.html',
  controller: ['$scope', 'AuthService', 'Session', '$location', '$timeout',controller]
})
