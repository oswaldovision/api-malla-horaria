var app = angular.module('app');
app.config(function ($stateProvider) {
  var homeState = {
    name: 'home',
    url: '/',
    component : 'home'
  }

  var asignementState = {
    name: 'asignements',
    url: '/asignements',
    component : 'asignements'
  }

  var chartState = {
    name: 'chart',
    url: '/chart',
    component: 'chartComp'
  }

  var rolesState = {
    name: 'roles',
    url: '/roles',
    component: 'roles'
  }

  $stateProvider.state(homeState);
  $stateProvider.state(asignementState);
  $stateProvider.state(chartState);
  $stateProvider.state(rolesState);
  $stateProvider.state("default", {
    name: 'home',
    url: '',
    component : 'home'
  })
});