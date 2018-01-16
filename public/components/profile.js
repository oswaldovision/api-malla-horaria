var module = angular.module('app')

var controller = function ($scope, AuthService, Session, $location) {
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
    AuthService.login(credentials).then(function (user) {
      if (user){
        $scope.formLogin = false;
        // AuthService.getRolesUser(user.mail)
        $location.path('/');
      }
    }, function (err) {
      // $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      console.log('fail login ' + err)
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
  controller: ['$scope', 'AuthService', 'Session', '$location', controller]
})
