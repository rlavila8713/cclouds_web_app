/**
 * Created by Reinier on 04/05/2016.
 */

'use strict';

app.factory('LogService', ['$http', '$q', function ($http, $q) {
    return {
        fetchAllLogs: function () {
            return $http.get('../admin/logs/')
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while fetching Logs');
                    return $q.reject(errResponse);
                }
            );
        },

        deleteLog: function (id) {
            return $http.delete('../admin/logs/' + id)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while deleting Logs');
                    return $q.reject(errResponse);
                }
            );
        }
    };

}]);


