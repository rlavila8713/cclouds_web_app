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
            return $http({
                method: 'POST',
                url: '../admin/usuario/',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (user) {
                    var str = [];
                    var flag = true;
                    for (var u in user) {
                        if (!flag) {
                            console.log(u+" "+user[u]);
                            str.push(encodeURIComponent(u) + "=" + encodeURIComponent(user[u]));
                        } else {
                            flag = !flag;
                        }
                        var out = str.join("&");
                        console.log(out);
                    }
                    return str.join("&");
                },
                data: user
            })
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
            return $http({
                method: 'POST',
                url: '../admin/usuario/'+id,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (user) {
                    var str = [];
                    var flag = true;
                    for (var u in user) {
                       // if (!flag) {
                        //    console.log(u+" "+user[u]);
                            str.push(encodeURIComponent(u) + "=" + encodeURIComponent(user[u]));
                       // } else {
                        //    flag = !flag;
                        //}
                        var out = str.join("&");
                        console.log(out);
                    }
                    return str.join("&");
                },
                data: user
            })
                .then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    console.error('Error while updating User');
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

