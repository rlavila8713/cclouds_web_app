/**
 * Created by Reinier on 06/03/2016.
 */

'use strict';

app.factory('CountryService', ['$http', '$q', function ($http, $q) {
    return {
        fetchAllCountry: function () {
            return $http.get('../admin/country/')
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while fetching Countries');
                    return $q.reject(errResponse);
                }
            );
        },

        createCountry: function (country) {
            return $http.post('../admin/country/',country)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating Country');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateCountry: function (country, id) {
            return $http.post('../admin/country/'+id,country)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while updating Country');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteCountry: function (id) {
            return $http.delete('../admin/country/' + id)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while deleting Country');
                    return $q.reject(errResponse);
                }
            );
        }
    };

}]);


