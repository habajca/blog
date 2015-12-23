angular.module('myApp.alerts', [])
.directive('myAlerts', function() {
  return {
    restrict: 'E',
    templateUrl: 'components/alerts/alerts.html',
    controller: ['$scope', 'alerts', function($scope, alerts) {
      var applyAlerts = function(newAlerts) {
        $scope.alerts = newAlerts;
      }
      
      $scope.$watch(function() {
        return alerts.getAll();
      }, applyAlerts);
    }]
  }
})
.service('alerts', [function() {
  var current = {};
  var queue = [];
  var success = false;
  var update = function() {
      if (queue.length <= 0) {
        return current;
      }
      current = queue.reduce(function(all, alerts) {
        if (alerts.refresh) {
          all = {};
          delete alerts.refresh;
        }
        for (alertType in alerts) {
          all[alertType] = (all[alertType] || []).concat(alerts[alertType]);
        }
        return all;
      }, current);
      queue = [];
      return current;
  }
  return {
    refresh: function() {
      queue.push({refresh: true});
    },
    push: function(alerts) {
      queue.push(alerts);
      newAlerts = true;
    },
    getAll: function() {
      return update();
    },
    success: function() {
      success = true;
    },
    getSuccess: function() {
      var retSuccess = success;
      success = false;
      return retSuccess;
    }
  }
}]);
