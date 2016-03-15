/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.factory('RolService', ['$http', '$q', function ($http, $q) {
    return {
        fetchAllRols: function () {
            return $http.get('../admin/rol/')
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

        getRolById: function (idRol) {
            return $http.get('../admin/rol/id='+idRol)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching rol');
                        return $q.reject(errResponse);
                    }
                );
        },

        createRol: function (rol) {
            return $http.post('../admin/rol/',rol)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating rol');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateRol: function (rol, id) {
            return $http.post('../admin/rol/'+id,rol)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while updating Rol');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteRol: function (id) {
            return $http.delete('../admin/rol/' + id)
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while deleting rol');
                    return $q.reject(errResponse);
                }
            );
        }
    };

}]);



