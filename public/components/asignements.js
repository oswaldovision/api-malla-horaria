var module = angular.module('app')

var controller = function ($auth) {
  var ctrl = this
  ctrl.title = 'Asignaciones'

}

module.component('asignements', {
  templateUrl: '../templates/asignements.html',
  controllerAs: 'ctrl',
  controller: ['$auth', controller]
})