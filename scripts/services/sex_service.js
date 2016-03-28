/**
 * Created by Isidro on 28/03/2016.
 */
'use strict';

app.factory('SexService', ['$http', '$q', function ($http, $q) {
    return {
        fetchAllSexes: function () {
            return $http.get('../admin/sex/')
                .then(
                function (response) {
                    console.log("el sex service");
                    console.log(response.data.sexes);

                    return response.data.sexes;

                },
                function (errResponse) {
                    console.error('Error while fetching sexes');
                    return $q.reject(errResponse);
                }
            );
        },

        createSex: function (user) {
            return $http.post('../admin/sex/', user)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while creating sex');
                    return $q.reject(errResponse);
                }
            );
        },

        updateSex: function (sex, id) {
            return $http.post('../admin/sex/' + id, sex)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while creating sex');
                    return $q.reject(errResponse);
                }
            );
        },

        deleteSex: function (id) {
            return $http.delete('../admin/sex/' + id)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while deleting sex');
                    return $q.reject(errResponse);
                }
            );
        }
    };

}]);

