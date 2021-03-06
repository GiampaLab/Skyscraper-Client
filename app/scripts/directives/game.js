'use strict';

var app = angular.module('skyscraper');

app.directive('game', ['Hub', 'constants', '$timeout', '$interval',
    function(Hub, constants, $timeout, $interval) {
        var ddo = {
            restrict: 'A',
            link: function(scope, element, attr) {
                
                var counterValue = 15;
                var hubInited = false;
                var needLogin = false;
                var loginInfo = null;
                scope.attempts = 0;
                scope.maxAttempts = 3;
                scope.timeLeft = 100;
                scope.myCards = [];
                scope.counter = counterValue;
                scope.gameStarted = false;
                scope.players = [];
                scope.gameOver = false;
                scope.theTimeout = $timeout;
                scope.menuIsOpen = true;

                scope.onTimeout = function() {
                    scope.$apply(function() {
                        scope.counter--;
                        scope.timeLeft = 100 - (100 / 15 * (counterValue - scope.counter))
                        if (scope.counter === 0) {
                            scope.myCards.push({ symbols: scope.extractedCard });
                            scope.stop();
                        }
                        scope.theTimeout(scope.onTimeout, 1000);
                    })
                }

                scope.stop = function() {
                    scope.hub.extractCard();
                }

                scope.hub = new Hub('skyscraperHub', {
                    listeners: {
                        'start': function(symbols, extractedCardSymbols, players) {
                            scope.$apply(function(){
                                scope.gameOver = false;
                                scope.gameStarted = true;
                                scope.currentCard = symbols;
                                scope.extractedCard = extractedCardSymbols;
                                scope.players = players;
                                setPlayerPoints(players); 
                                resetAndStartTimeout();       
                            });
                        },
                        'setExtractedCard': function(symbols, players) {
                            scope.$apply(function() {
                                scope.attempts = 0;
                                scope.extractedCard = symbols;
                                setPlayerPoints(players);
                                resetAndStartTimeout();
                            });
                        },
                        'gameOver': function(gameStats) {
                            scope.gameStats = gameStats;
                            scope.gameStarted = false;
                            scope.gameOver = true;
                            scope.$apply();
                        },
                        'setPlayers': function(players) {
                            scope.players = players;
                            scope.$apply();
                        },
                        'joinGame': function(currentlyExtractedCard, playerCurrentCard, player) {
                            scope.extractedCard = currentlyExtractedCard;
                            scope.currentCard = playerCurrentCard;
                            scope.gameStarted = true;
                            scope.gameOver = false;
                            scope.players.push(player);
                            scope.$apply();
                        }
                    },
                    //server side methods
                    methods: ['extractCard', 'cardMatched', 'startGame', 'addPlayer', 'resetGame'],
                    rootPath: constants.signalREndpoint
                });
                
                scope.getMyCardsSymbols = function(){
                    var result = [];
                    angular.forEach(scope.myCards, function(card){
                       result = result.concat(card.symbols); 
                    });
                    return result;
                }

                scope.hub.promise.done(function(result) {
                    hubInited = true;
                    if (needLogin) {
                        execLogin(loginInfo);
                    }
                });

                scope.startGame = function() {
                    scope.hub.startGame(8, scope.currentPlayer);
                }

                scope.resetGame = function() {
                    scope.theTimeout.cancel(scope.timeout);
                    scope.hub.resetGame();
                    scope.gameStarted = false;
                    scope.currentCard.splice(0, scope.currentCard.length);
                    scope.extractedCard.splice(0, scope.extractedCard.length);
                }

                scope.select = function(symbol) {
                    if (!scope.extractedCard) {
                        return;
                    }
                    if (scope.attempts < scope.maxAttempts && _.contains(_.pluck(scope.extractedCard, 'id'), symbol.id) && !scope.gameOver) {
                        scope.currentCard = scope.extractedCard;
                        scope.hub.cardMatched(_.pluck(scope.extractedCard, 'id'), scope.currentPlayer.id);
                    }else if(scope.attempts < scope.maxAttempts){
                        scope.attempts++;
                    }
                }

                scope.$on('login', function(event, info) {
                    if (hubInited) {
                        scope.$apply(function() {
                            execLogin(info);
                        });
                    }
                    else {
                        loginInfo = info;
                        needLogin = true;
                    }
                });

                scope.$on('logout', function() {
                    scope.login = false;
                    scope.players = _.reject(scope.players, function(p) {
                        return p.displayName = scope.currentPlayer.displayName;
                    });
                });

                function execLogin(info) {
                    scope.currentPlayer = { displayName: info.displayName, imageUrl: info.image.url, id: info.id };
                    scope.login = true;
                }

                function setPlayerPoints(players) {
                    angular.forEach(players, function(p) {
                        var player = _.find(scope.players, function(pl) {
                            return pl.id === p.id;
                        })
                        player.points = p.points;
                    });
                }
                
                function resetAndStartTimeout(){
                    if (scope.timeout) {
                        scope.theTimeout.cancel(scope.timeout);
                    }
                    if (!scope.timeout && scope.gameStarted) {
                        scope.timeout = scope.theTimeout(scope.onTimeout, 1000);
                    }
                    scope.counter = counterValue;
                }
            }
        }
        return ddo;
    }]);