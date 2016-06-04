//MODULE
var twitchApp = angular.module("twitchApp", ["ngRoute", "ngResource"]);

//ROUTES
/*weatherApp.config(function ($routeProvider){
   
    $routeProvider
    
    .when("/", {
        templateUrl: "pages/home.htm",
        controller: "forecastController"
    })
    
});*/





twitchApp.controller("mainController", ["$scope", "$resource", "$routeParams", "$filter", function ($scope, $resource, $routeParams, $filter) {

   $scope.channel = [{name:"BobRoss"},{name:"OgamingSC2"}, {name: "NALCS1"}, {name:"PokerCentral"}, {name:"DansGaming"}, {name:"Resttpowered"}, {name:"Summit1g"}, {name:"Steel_Tv"}, {name:"ProfessorBroman"}, {name:"StreamerHouse"}, {name:"DotaMajor"}, {name:"Stewie2K"}, {name:"nl_Kripp"}, {name: "JoshOG"},{name:"MineskiTV"}, {name:"AnneMunition"}];

   $scope.streamAPI = $resource("https://api.twitch.tv/kraken/streams/:id", {callback: "JSON_CALLBACK" }, {get: {method: "JSONP"}});
   $scope.channelAPI = $resource("https://api.twitch.tv/kraken/channels/:id", { callback: "JSON_CALLBACK" }, {get: { method: "JSONP" }});  
   

   for (let i = 0; i < $scope.channel.length; i++) {
      $scope.channelResult = $scope.channelAPI.get({id: $scope.channel[i].name}, function(data){
            $scope.channel[i].url = data.url
            $scope.channel[i].logo = data.logo;
         });            
      $scope.streamResult = $scope.streamAPI.get({id: $scope.channel[i].name}, function(data){
         if(data.stream === null) {
            $scope.channel[i].status = "-Offline-";
            $scope.channel[i].online = false;
            $scope.channel[i].viewers = "-";
         }
         else {
            $scope.channel[i].status = data.stream.game + ":  " + data.stream.channel.status;
            $scope.channel[i].online = true;
            $scope.channel[i].viewers = "Viewers: " + data.stream.viewers;

         }
      });     
   }
   console.log($scope.channel);
   
}]);

   










   