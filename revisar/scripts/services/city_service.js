/**
 * Created by Reinier on 06/03/2016.
 */

'use strict';

app.factory('CityService', ['$http', '$q', function ($http, $q) {
    return {

        getCitiesByIdProvince: function (idProvince) {
            return $http.get('../admin/city/from_province=' + idProvince)
                .then(function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while getting Cities');
                        return $q.reject(errResponse);
                    });
        },

        fetchAllCity: function () {
            return $http.get('../admin/city/')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching Cities');
                        return $q.reject(errResponse);
                    }
                );
        },

        createCity: function (city) {
            return $http.post('../admin/city/', city)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating City');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateCity: function (city, id) {
            return $http.post('../admin/city/' + id, city)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while updating City');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteCity: function (id) {
            return $http.delete('../admin/city/' + id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while deleting City');
                        return $q.reject(errResponse);
                    }
                );
        }
    };

}]);


