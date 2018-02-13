var module = angular.module('app')

module.service('usersService', service);

function service ($http, $location) {
  this.getUsers= function (user) {
    var req = {
      method: 'GET',
      url: '/users/' + user
    }
    return $http(req).then(function (data) {
      return data.data
    }).catch(function (err) {
      $location.path('/unauthorized');
      return err
    })
  }

  this.addUser = function (email, name, address, phone, idRol, user) {
    let config = {
      url : '/users/' + user,
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      method: "POST",
      data: { email, name, address, phone, idRol, user}
    }

    return $http(config).then(function (data) {
      return data;
    }).catch(function (err) {
      console.log('Ha fallado adicionando rol '+ err.message)
    })

  }
}

service.$inject = ['$http', '$location'];
