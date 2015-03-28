'use strict';

var app = angular.module('skyscraper');

app.directive('gplus',
  function(Hub, constants){
    var ddo = {
      restrict: 'E',
      transclude: true,
      template: '<span></span>',
      replace: true,
      link: function(scope, element, attr, ctrl, linker){
        // This flag we use to show or hide the button in our HTML.
        scope.signedIn = false;
     
        // Here we do the authentication processing and error handling.
        // Note that authResult is a JSON object.
        scope.processAuth = function(authResult) {
            // Do a check if authentication has been successful.
            if(authResult['access_token']) {
                // Successful sign in.
                scope.signedIn = true;
     
                gapi.client.load('plus','v1', function(){
                 var request = gapi.client.plus.people.get({
                   'userId': 'me'
                 });
                 request.execute(function(resp) {
                   console.log('Retrieved profile for:' + resp.displayName);
                 });
                });
            } else if(authResult['error']) {
                // Error while signing in.
                scope.signedIn = false;
     
                // Report error.
            }
        };

        // When callback is received, we need to process authentication.
        scope.signInCallback = function(authResult) {
            scope.$apply(function() {
                scope.processAuth(authResult);
            });
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
            gapi.signin.render(element[0], 
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