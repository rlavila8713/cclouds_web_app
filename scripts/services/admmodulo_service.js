/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.factory('AdmModuloService', ['$http', '$q', function ($http, $q) {
    return {
        fetchTree: function () {
            return $http.get('../admin/admmodulos/')
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while fetching rols');
                    return $q.reject(errResponse);
                }
            );
        },
    };

}]);



