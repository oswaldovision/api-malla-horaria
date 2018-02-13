var module = angular.module('app')

var controller = function ($scope, AuthService, Session, NgTableParams, $location, usersService) {
  this.$onInit = function () {
    getUsers();
  }

  $scope.addUser = function (user) {
    usersService.addUser(user.email,user.name, user.address,user.phone,user.idRol,Session.user.profile.mail).then(function (result) {
      if (result.data.returnValue == 1){
        getUsers();
      }
    })
  }

  var getUsers = function () {
    usersService.getUsers(Session.user.profile.mail).then(function (allRoles) {
      $scope.users = new NgTableParams({}, {dataset: allRoles.recordset})
    })
  }

}

module.component('users', {
  templateUrl: './../templates/users.html',
  controller: ['$scope', 'AuthService', 'Session', 'NgTableParams','$location','usersService', controller]
})