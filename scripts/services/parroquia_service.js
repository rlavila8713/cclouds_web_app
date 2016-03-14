/**
 * Created by Reinier on 06/03/2016.
 */

'use strict';

app.factory('ParroquiaService', ['$http', '$q', function ($http, $q) {
    return {
        getParroquiaByIdCity: function (idCity) {
            return $http.get('../admin/parroquia/from_city=' + idCity)
                .then(function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while getting Parroquia');
                    return $q.reject(errResponse);
                });
        },
        fetchAllParroquia: function () {
            return $http.get('../admin/parroquia/')
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while fetching Parroquias');
                    return $q.reject(errResponse);
                }
            );
        },

        createParroquia: function (parroquia) {
            return $http({
                method: 'POST',
                url: '../admin/parroquia/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (parroquia) {
                    var str = [];
                    for (var r in parroquia)
                        str.push(encodeURIComponent(r) + "=" + encodeURIComponent(parroquia[r]));
                    return str.join("&");
                },
                data: parroquia
            })
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while creating Parroquia');
                    return $q.reject(errResponse);
                }
            );
            /*return $http.post('../admin/parroquia/', parroquia)
             .then(
             function (response) {
             return response.data;
             },
             function (errResponse) {
             console.error('Error while creating parroquia');
             return $q.reject(errResponse);
             }
             );*/
        },

        updateParroquia: function (parroquia, id) {
            return $http({
                method: 'POST',
                url: '../admin/parroquia/' + id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (parroquia) {
                    var str = [];
                    for (var p in parroquia)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(parroquia[p]));
                    return str.join("&");
                },
                data: parroquia
            })
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while updating Parroquia');
                    return $q.reject(errResponse);
                }
            );


            /*return $http.put('../admin/Parroquia/' + id, parroquia)
             .then(
             function (response) {
             return response.data;
             },
             function (errResponse) {
             console.error('Error while updating Parroquia');
             return $q.reject(errResponse);
             }
             );*/
        },

        deleteParroquia: function (id) {
            return $http.delete('../admin/parroquia/' + id)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while deleting Parroquia');
                    return $q.reject(errResponse);
                }
            );
        }
    };

}]);


