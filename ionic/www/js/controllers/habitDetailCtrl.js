habitApp.controller('habitDetailCtrl', function($scope, $ionicActionSheet, $timeout, habitDetailService) {
  var totNumOfDays = 30;
$scope.daysOfMo = [];
(function popMonth() {
  for (var i = 1; i <= totNumOfDays; i++) {
        $scope.daysOfMo.push(i);
  }
})();

$scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<b>Share</b> This' },
       { text: 'Move' }
     ],
     destructiveText: 'Delete',
     titleText: 'Modify your habit',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       return true;
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 3000);

 };



});
