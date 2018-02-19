var module = angular.module('app')

module.service('rolesService', service);

function service ($http, $location) {
  this.getRoles= function (user) {
    var req = {
      method: 'GET',
      url: '/roles/' + user
    }
    return $http(req).then(function (data) {
      return data.data
    }).catch(function (err) {
      $location.path('/unauthorized');
      return err
    })
  }

  this.addRol = function (name, description, idStore, user) {
    let config = {
      url : '/roles',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      method: "POST",
      data: { name, description , idStore,user}
    }

    return $http(config).then(function (data) {
      return data;
    }).catch(function (err) {
      console.log('Ha fallado adicionando rol '+ err.message)
    })

  }
}

service.$inject = ['$http', '$location'];
