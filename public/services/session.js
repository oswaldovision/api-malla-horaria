var module = angular.module('app')

module.service('Session', function () {
  this.user = {
    isAuthenticated : false,
    roles : [],
    profile :{}
  };

  this.create = function (profile) {
    this.user.profile = profile;
    this.user.isAuthenticated = true;
    this.user.roles = [];
  };

  this.addRoles = function (roles) {
    this.user.roles = roles;
  }

  this.destroy = function () {
    this.user = {
      isAuthenticated : false,
      roles : [],
      profile :{}
    };
  };

  this.hasRoleAdmin = function(role){
    var indexOfRole = this.user.roles.indexOf(role);
    if (indexOfRole === -1)
      return false;
    else
      return true;
  }
})