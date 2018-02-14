var module = angular.module('app')

var controller = function ($scope, AuthService, Session, NgTableParams, $location, usersService, rolesService) {
  $scope.roles = [];
  $scope.selectedRol = angular.copy($scope.roles[0]);
  $scope.rol = {}

  this.$onInit = function () {
    getUsers();
    getRoles();
  }

  $scope.addUser = function (user) {
    usersService.addUser(user.email,user.name, user.address,user.phone,$scope.selectedRol.IdRol,Session.user.profile.mail).then(function (result) {
      if (result.data.returnValue == 1){
        getUsers();
        getRoles();
      }
    })
    console.log($scope.form)

  }

  var getUsers = function () {
    usersService.getUsers(Session.user.profile.mail).then(function (allUsers) {
      $scope.users = new NgTableParams({}, {dataset: allUsers.recordset})
    })
  }

  var getRoles = function () {
    rolesService.getRoles(Session.user.profile.mail).then(function (allRoles) {
      $scope.roles = allRoles.recordset;
    })
  }

}

module.component('users', {
  templateUrl: './../templates/users.html',
  controller: ['$scope', 'AuthService', 'Session', 'NgTableParams','$location','usersService', 'rolesService', controller]
})