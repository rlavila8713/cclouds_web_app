/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.controller('UserController', ['$scope', 'UserService', '$window', function ($scope, UserService, $window) {
    var self = this;
    self.user = {
        idUser: null,
        idRol: null,
        firstName: '',
        lastName: '',
        username: '',
        password: 'password',
        dbHash: 'dbHash',
        plainTextPassword: 'plain',
        passwordResetToken: 'passwordResetToken',
        address: '',
        userEmail: '',
        phoneNumber: '',
        dateBirth: '',
        sex: '',
        parroquia: null,
        enabled: true
    };

    self.users = [];

    self.fetchAllUsers = function () {
        UserService.fetchAllUsers()
            .then(
                function (d) {
                    self.users = d;
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };

    self.fetchAllUsers();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = 5;
        self.numberOfPages = function () {
            return Math.ceil(self.users.users.length / self.pageSize);
        };
    };

    self.createUser = function (user) {
        UserService.createUser(user)
            .then(function (data) {
                swal({
                        title: 'New user',
                        text: "The user has been added successfully",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "success",
                        confirmButtonText: "OK",
                        cancelButtonText: "Cancel",
                        closeOnConfirm: true
                    },
                    function (clickedAction) {
                        if (clickedAction == true) {
                            self.fetchAllUsers();
                        }
                        return false;
                    });
            }, function (errResponse) {
                swal("Error...", "Error while creating User.!", "error");
                console.error('Error while creating User.');
            });
    };

    self.updateUser = function (user, id) {
        UserService.updateUser(user, id)
            .then(function (data) {
                    swal({
                            title: 'User',
                            text: "The user has been updated successfully",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "OK",
                            cancelButtonText: "Cancel",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllUsers();
                            }
                        });
                }, function (errResponse) {
                    swal("Error...", "Error while updating User.!", "error");
                    console.error('Error while updating User.');
                }
            );
    };

    self.deleteUser = function (id) {
        swal({
                title: 'Are you sure?',
                text: "You will delete the user and information",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "Cancel",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    UserService.deleteUser(id)
                        .then(function (data) {
                                swal("Deleted!", "The user has been deleted.", "success");
                                self.fetchAllUsers();
                            },
                            function (errResponse) {
                                swal("Error...", "Error while deleting User.!", "error");
                                console.error('Error while deleting User.');
                            }
                        );
                } else {
                    swal("Cancelled", "The user is safe :)", "error");
                }
            });
    };
    self.submit = function () {
        if (self.user.idUser === null) {
            console.log('Saving New User', self.user);
            self.createUser(self.user);
        } else {
            self.updateUser(self.user, self.user.idUser);
            console.log('User updated with id ', self.user.idUser);
        }
        self.reset();
    };

    self.edit = function (id) {
        console.log('id to be edited', id);
        for (var i = 0; i < self.users.users.length; i++) {
            if (self.users.users[i].idUser === id) {
                self.user = angular.copy(self.users.users[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        console.log('id to be deleted', id);
        if (self.user.id === id) {//clean form if the user to be deleted is shown there.
            self.reset();
        }
        self.deleteUser(id);
    };

    self.reset = function () {
        console.log('resetting user');
        self.user = {idUser: null, password: '', userEmail: '', phoneNumber: '', enabled: false};
        console.log($scope.usuarioForm);
        $scope.usuarioForm.$setPristine(); //reset Form
    };

    self.valuationDate = new Date();
    self.valuationDatePickerIsOpen = false;

    self.valuationDatePickerOpen = function () {
        this.valuationDatePickerIsOpen = true;
    };


}]);
