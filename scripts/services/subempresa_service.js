/**
 * Created by Reinier on 06/03/2016.
 */

'use strict';

app.factory('SubEmpresaService', ['$http', '$q', function ($http, $q) {
    return {
        getSubEmpresaByIdEmpresa: function (idEmpresa) {
            return $http.get('../admin/subempresa/from_empresa=' + idEmpresa)
                .then(function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while getting SubEmpresa');
                        return $q.reject(errResponse);
                    });
        },
        fetchAllSubEmpresa: function () {
            return $http.get('../admin/subempresa/')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching SubEmpresas');
                        return $q.reject(errResponse);
                    }
                );
        },

        fetchAllFromSubEmpresa: function (id) {
            return $http.get('../admin/subempresa/detailed/id=' + id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching SubEmpresas');
                        return $q.reject(errResponse);
                    }
                );
        },

        createSubEmpresa: function (subempresa) {
            return $http.post('../admin/subempresa/', subempresa)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating SubEmpresa');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateSubEmpresa: function (subempresa, id) {
            return $http.post('../admin/subempresa/' + id, subempresa)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while updating SubEmpresa');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteSubEmpresa: function (id) {
            return $http.delete('../admin/subempresa/' + id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while deleting Subempresa');
                        return $q.reject(errResponse);
                    }
                );
        }
    };

}]);


