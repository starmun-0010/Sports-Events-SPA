﻿repository.factory('dataRepository', [
    '$http', '$q', 'authentication', function ($http, $q, authentication) {
        var baseUri = "/api/";
        var entityNames = {
            "city": "Cities",
            "cities": "Cities",
            "country": "Countries",
            "event": "Events",
            "countries": "Countries",
            "eventType": "EventTypes",
            "sport": "Sports",
            "eventTypes": "EventTypes",
            "sports": "Sports"
        }

        var uriColection = {
            "city": baseUri + entityNames["city"],
            "cities": baseUri + entityNames["cities"],
            "country": baseUri + entityNames["country"],
            "event": baseUri + entityNames["event"],
            "countries": baseUri + entityNames["countries"],
            "eventType": baseUri + entityNames["eventType"],
            "sport": baseUri + entityNames["sport"],
            "eventTypes": baseUri + entityNames["eventTypes"],
            "sports": baseUri + entityNames["sports"]



        };
        var subCollectionUri = function (type, id, collection) {
            return baseUri + entityNames[type] + "/" + id + "/" + entityNames[collection];
        }
        function dataRepository() {

            //general http functions
            function get(url) {
                var config = null;
                if (authentication.identity) {
                    config = { headers: { 'Authorization': "bearer " + authentication.identity.access_token } };

                }
                var defered = $q.defer();
                $http.get(url, config).then(function (data) {
                    defered.resolve(data.data);
                }, function (data) {
                    defered.reject(data);
                });
                return defered.promise;
            }
            function post(url, model) {
                var config = null;
                if (authentication.identity) {
                    config = { headers: { 'Authorization': "bearer " + authentication.identity.access_token } };

                }
                var defered = $q.defer();
                $http.post(url, model, config).then(function (data) {
                    defered.resolve(data.data);
                }, function (data) {
                    defered.reject(data);
                });
                return defered.promise;
            }
            //events repository

            this.events = {
                getBookmarkedEvents: function () {
                    var url = uriColection["event"] + "/";

                    return get(url);
                },

                getRegisteredEvents: function () {
                    var url = uriColection["event"];

                    return get(url);
                },
                getMyEvents: function () {
                    var url = uriColection["event"] + "/MyEvents";

                    return get(url);
                },

                getRegisteredUsers: function () {
                    var url = uriColection["event"] + "/MyEvents";

                    return get(url);
                }, getClickerUsers: function () {
                    var url = uriColection["event"] + "/MyEvents";

                    return get(url);
                }, getRegistrationRequests: function () {
                    var url = uriColection["event"] + "/MyEvents";

                    return get(url);
                },

                bookmark(eventId) {
                    var url = uriColection['event'] + '/BookmarkEvents';
                    var model = {
                        Id: eventId
                    };
                    return post(url, model);
                },

                register(eventId) {
                    var url = uriColection['event'] + '/RegistrationRequests';
                    var model = {
                        Id: eventId
                    };
                    return post(url, model);
                }
            }
            this.add = function (type, entity) {
                var defered = $q.defer();
                $http.post(uriColection[type], entity).then(function (data) {
                    defered.resolve(data.data);
                }, function (data) {
                    defered.reject(data);
                });
                return defered.promise;
            }
            this.getAll = function (collection) {
                var defered = $q.defer();
                var url = uriColection[collection];
                $http.get(url).then(function (data) {
                    defered.resolve(data.data);
                }, function (data) {
                    defered.reject(data);
                });
                return defered.promise;
            }

            this.getSubCollection = function (type, id, collection) {
                var defered = $q.defer();
                var url = subCollectionUri(type, id, collection);
                $http.get(url).then(function (data) {
                    defered.resolve(data.data);
                }, function (data) {
                    defered.reject(data);
                });
                return defered.promise;
            }
            this.getCalender = function (page, take) {
                var defered = $q.defer();
                var url = uriColection["event"] + "/Calender?page=" + page + "&take=" + take;
                $http.get(url).then(function (data) {
                    defered.resolve(data.data);
                }, function (data) {
                    defered.reject(data);
                });
                return defered.promise;
            }
            this.search = function (searchPhrase, sportType, eventType, startingDate, zipCode, city, startingPrice) {
                var defered = $q.defer();

                var url = uriColection["event"] + "/Search?";
                if (searchPhrase) {
                    url += "searchPhrase=" + searchPhrase + "&";
                }
                if (sportType) {
                    url += "sportType=" + sportType.Id + "&";
                }
                if (eventType) {
                    url += "eventType=" + eventType.Id + "&";
                }
                if (startingDate) {
                    url += "startingDate=" + startingDate + "&";
                }
                if (zipCode) {
                    url += "zipCode=" + zipCode + "&";
                }
                if (city) {
                    url += "city=" + city.Id + "&";
                }
                if (startingPrice) {
                    url += "startingPrice=" + startingPrice + "&";
                }

                if (url.charAt(url.length - 1) === "&") {
                    url = url.slice(0, url.length - 1);
                }

                $http.get(url).then(function (data) {
                    defered.resolve(data.data);
                }, function (data) {
                    defered.reject(data);
                });
                return defered.promise;
            }
        }

        var dataRepositoryInstacne = new dataRepository();




        return dataRepositoryInstacne;
    }
]);