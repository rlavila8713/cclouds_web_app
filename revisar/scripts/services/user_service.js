'use strict';

app.factory('UserService', ['$http', '$q', function ($http, $q) {
    return {
        fetchAllUsers: function () {
            return $http.get('../admin/usuario/')
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching users');
                        return $q.reject(errResponse);
                    }
                );
        },

        createUser: function (user) {
            return $http.post('../admin/usuario/', user)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating User');
                        return $q.reject(errResponse);
                    }
                );
        },

        updateUser: function (user, id) {
            return $http.post('../admin/usuario/' + id, user)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while creating User');
                        return $q.reject(errResponse);
                    }
                );
        },

        deleteUser: function (id) {
            return $http.delete('../admin/usuario/' + id)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        console.error('Error while deleting user');
                        return $q.reject(errResponse);
                    }
                );
        }
    };

}]);

