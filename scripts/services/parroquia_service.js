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
            return $http.post('../admin/parroquia/',parroquia)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating Parroquia');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateParroquia: function (parroquia, id) {
            return $http.post('../admin/parroquia/' + id,parroquia)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while updating Parroquia');
                        return $q.reject(errResponse);
                    }
                );
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


