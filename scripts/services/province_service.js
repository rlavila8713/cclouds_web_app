/**
 * Created by Reinier on 06/03/2016.
 */

'use strict';

app.factory('ProvinceService', ['$http', '$q', function ($http, $q) {
    return {
        getProvinceByIdCountry: function (idCountry) {
            return $http.get('../admin/province/from_country=' + idCountry)
                .then(function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while getting Province');
                    return $q.reject(errResponse);
                });
        },
        fetchAllProvince: function () {
            return $http.get('../admin/province/')
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while fetching Provinces');
                    return $q.reject(errResponse);
                }
            );
        },

        createProvince: function (province) {
            return $http.post('../admin/province/',province)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating Province');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateProvince: function (province, id) {
            return $http.post('../admin/province/' + id,province)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while updating Province');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteProvince: function (id) {
            return $http.delete('../admin/province/' + id)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while deleting Province');
                    return $q.reject(errResponse);
                }
            );
        }
    };

}]);


