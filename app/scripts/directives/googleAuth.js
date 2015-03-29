'use strict';

var app = angular.module('skyscraper');

app.directive('gplus',
  function(Hub, constants){
    var ddo = {
      restrict: 'E',
      transclude: true,
      template: '<div><span class="signIn" ng-show="!signedIn"></span><button class="btn btn-default" type="submit" ng-show="signedIn" ng-click="signOut()">Sign out</button><div>',
      replace: true,
      link: function(scope, element, attr, ctrl, linker){
        // This flag we use to show or hide the button in our HTML.
        scope.signedIn = false;
     
        // Here we do the authentication processing and error handling.
        // Note that authResult is a JSON object.
        scope.processAuth = function(authResult) {
            // Do a check if authentication has been successful.
            if(authResult['status']['signed_in']) {
                // Successful sign in.
                scope.signedIn = true;
                //gapi.client.setApiKey('AIzaSyAsn4fajaYEpKu7q9hRWv7TSrRL39nkb4I');
                gapi.client.load('plus','v1', function(){
                 var request = gapi.client.plus.people.get({
                   'userId': 'me'
                 });
                 request.execute(function(resp) {
                   scope.$broadcast('login', resp);
                   console.log('Retrieved profile for:' + resp.displayName);
                 });
                });
            } else if(!angular.isUndefined(authResult['error']) && authResult['error'] !== null)  {
                // Error while signing in.
                scope.signedIn = false;
                console.log('Error');
                // Report error.
            }
        };

        scope.signOut = function(){
          gapi.auth.signOut();
          scope.signedIn = false;
          scope.$broadcast('logout');
        }

        // When callback is received, we need to process authentication.
        scope.signInCallback = function(authResult) {
          if(scope.$$phase) {
            scope.processAuth(authResult);
          }
          else {
            scope.$apply(function() {
              scope.processAuth(authResult);
            });
          }
        };

        // Asynchronously load the G+ SDK.
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = 'https://apis.google.com/js/client:plusone.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);

        linker(function(el, tScope){
          po.onload = function() {
            if (el.length) {
              element.append(el);
            }
            var signIn = element[0].getElementsByClassName('signIn');
            gapi.signin.render(signIn[0], 
            {
              'callback': scope.signInCallback, // Function handling the callback.
              'clientid': '523803381681-2si853ks8rqsm3l29cb5u61hbek30l3e.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
              'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                // as their explanation is available in Google+ API Documentation.
              'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
              'cookiepolicy': 'single_host_origin'
            });
          };
        });
      }
    }
    return ddo;
  });