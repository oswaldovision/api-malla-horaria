var module = angular.module('app')

module.service('rolesService', service);

function service ($http) {
  this.getRoles= function (user) {
    var req = {
      method: 'GET',
      url: '/roles/' + user
    }
    return $http(req).then(function (data) {
      return data.data
    }).catch(function (err) {
      return err
    })
  }
}

service.$inject = ['$http'];
