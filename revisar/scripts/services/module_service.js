/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.factory('ModuleService', ['$http', '$q', function ($http, $q) {
    return {
        fetchAllModule: function () {
            return $http.get('../admin/module/')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching modules');
                        return $q.reject(errResponse);
                    }
                );
        },

        createModule: function (module) {
            return $http.post('../admin/module/', module)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating module');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateModule: function (module, id) {
            return $http.post('../admin/module/' + id,module)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while updating Module');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteModule: function (id) {
            return $http.delete('../admin/module/' + id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while deleting module');
                        return $q.reject(errResponse);
                    }
                );
        }
    };

}]);



