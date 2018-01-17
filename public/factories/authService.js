var module = angular.module('app')

module.factory('AuthService', function ($http, Session) {
  var authService = {}

  authService.loginMock = function (credentials) {
    var profile = { cn : credentials.email };
    Session.create(profile);
    return profile;
  }

  authService.login = function (credentials) {
    return $http.post('/ad/login', credentials).then(function (res) {
      Session.create(res.data)
      return res.data
    }).catch(function (err) {
      console.log(err.data.message);
      return err;
    })
  }

  authService.logout = function () {
    Session.destroy()
  }

  authService.isAuthenticated = function () {
    return !!Session.user
  }

  //TODO: get roles and implement Authorization
  // authService.isAuthorized = function (authorizedRoles) {
  //   if (!angular.isArray(authorizedRoles)) {
  //     authorizedRoles = [authorizedRoles];
  //   }
  //   return (authService.isAuthenticated() &&
  //     authorizedRoles.indexOf(Session.userRole) !== -1);
  // };

  authService.getRolesUser = function (mail) {
    return $http.get('/security/RolesUser?email=' + mail).then(function (data) {
      var roles = data.data.map(function (ele) {
        return ele.Rol;
      })
      Session.addRoles(roles);
    }).catch(function (err) {
      console.log('Ha fallado la obtencion de roles de usuario'+ err.message)
    })
  }

  authService.getRoles = function () {
    return $http.get('/security/Roles').then(function (data) {
      return data;
    }).catch(function (err) {
      console.log('Ha fallado la obtencion de roles '+ err.message)
    })
  }

  authService.addRol = function (name, description) {
    let config = {
      url : '/security/newRol',
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
      method: "POST",
      data: { name, description }
    }

    return $http(config).then(function (data) {
      return data;
    }).catch(function (err) {
      console.log('Ha fallado adicionando rol '+ err.message)
    })

  }

  return authService
})