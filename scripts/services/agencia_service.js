/**
 * Created by Reinier on 06/03/2016.
 */

'use strict';

app.factory('AgenciaService', ['$http', '$q', function ($http, $q) {
    return {
        getAgenciasByIdSucursal: function (idSucursal) {
            return $http.get('../admin/agencia/from_sucursal=' + idSucursal)
                .then(function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while getting Agencias');
                        return $q.reject(errResponse);
                    });
        },
        fetchAllAgencias: function () {
            return $http.get('../admin/agencia/')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching Agencias');
                        return $q.reject(errResponse);
                    }
                );
        },
        fetchAllFromAgencias: function (id) {
            return $http.get('../admin/agencia/detailed/id=' + id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching Agencia');
                        return $q.reject(errResponse);
                    }
                );
        },

        createAgencia: function (agencia) {
            return $http.post('../admin/agencia/', agencia)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating Agencia');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateAgencia: function (agencia, id) {
            return $http.post('../admin/agencia/' + id, agencia)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while updating Agencia');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteAgencia: function (id) {
            return $http.delete('../admin/agencia/' + id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while deleting Agencia');
                        return $q.reject(errResponse);
                    }
                );
        }
    };

}]);


