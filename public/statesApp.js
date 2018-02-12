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

  var scheduleState = {
    name: 'schedule',
    url: '/schedule',
    component : 'schedule'
  }

  var unauthorizedState = {
    name: 'unauthorized',
    url: '/unauthorized',
    component : 'unauthorized'
  }

  $stateProvider.state(homeState);
  $stateProvider.state(asignementState);
  $stateProvider.state(chartState);
  $stateProvider.state(rolesState);
  $stateProvider.state(scheduleState);
  $stateProvider.state(unauthorizedState);
  $stateProvider.state("default", {
    name: 'home',
    url: '',
    component : 'home'
  })
});

app.config(['calendarConfig', function(calendarConfig) {

  calendarConfig.dateFormatter = 'moment'; // use moment to format dates

}]);