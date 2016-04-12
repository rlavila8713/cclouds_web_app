/**
 * Created by reinier.leyva on 02/03/2016.
 */
'use strict';

app.controller('UserController', ['$rootScope','$scope', 'UserService', 'SexService', '$window', '$filter',function (
                                                                                                        $rootScope,
                                                                                                        $scope,
                                                                                                        UserService,
                                                                                                        SexService,
                                                                                                        $window,
                                                                                                        $filter) {
    var self = this;
	self.entries = 10;
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
        userEmail: '',
        phoneNumber: '',
        dateBirth: '',
        sex: '',
        parroquia: null,
        enabled: true
    };
    self.searchUser = '';
    self.sortType     = 'username'; // set the default sort type
    self.sortReverse  = false;  // set the default sort order
    self.users = [];
    self.sexes = [];
    $scope.myself = {};
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
    self.fetchCurrentUser = function (copyToUser) {
        UserService.fetchCurrentUser()
            .then(
                function (d) {
                    $scope.myself = d;
                    if(copyToUser)
                        self.user=angular.copy(d);
                },
                function (errResponse) {
                    console.error('Error while fetching Currencies');
                }
            );
    };
    $rootScope.$on('go_to_login_page', function() {
        location.reload();
    });
    self.fetchAllUsers();

    self.showData = function () {
        self.curPage = 0;
        self.pageSize = self.entries;
        self.numberOfPages = function () {
            return Math.ceil(self.users.users.length / self.pageSize);
        };
    };

    self.createUser = function (user) {
        UserService.createUser(user)
            .then(function (data) {
                swal({
                        title: 'Nuevo Usuario',
                        text: "El Usuario ha sido adicionado satisfactoriamente",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "success",
                        confirmButtonText: "Aceptar",
                        cancelButtonText: "Cancelar",
                        closeOnConfirm: true
                    },
                    function (clickedAction) {
                        if (clickedAction == true) {
                            self.fetchAllUsers();
                        }
                        return false;
                    });
            }, function (errResponse) {
                swal("Error...", errResponse.data.message, "error");
                console.error('Error while creating User.');
            });
    };

    self.updateUser = function (user, id) {
        UserService.updateUser(user, id)
            .then(function (data) {
                    swal({
                            title: 'Usuario',
                            text: "Los datos del usuario han sido modificados satisfactoriamente",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "success",
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                            closeOnConfirm: true
                        },
                        function (clickedAction) {
                            if (clickedAction == true) {
                                self.fetchAllUsers();
                            }
                        });
                }, function (errResponse) {
                    swal("Error...", errResponse.data.message, "error");
                    console.error('Error while updating User.');
                }
            );
    };

    self.deleteUser = function (id) {
        swal({
                title: 'Esta Ud. seguro?',
                text: "Se borrara toda la informacion referente al usuario",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Si, eliminar!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    UserService.deleteUser(id)
                        .then(function (data) {
                                swal("Eliminado!", "Los datos del usuario han sido eliminados.", "success");
                                self.fetchAllUsers();
                            },
                            function (errResponse) {
                                swal("Error...", errResponse.data.message, "error");
                                console.error('Error while deleting User.');
                            }
                        );
                } else {
                    swal("Cancelado", "Los datos del rol estan seguros", "error");
                }
            });
    };
    self.submit = function () {
        self.user.dateBirth = $filter('date')(self.user.dateBirth,'yyyy/MM/dd');
        if (self.user.idUser === null) {
            //console.log('Saving New User', self.user);
            self.createUser(self.user);
        } else {
            self.updateUser(self.user, self.user.idUser);
            //console.log('User updated with id ', self.user.idUser);
        }
        self.reset();
    };

    self.edit = function (id) {
        //console.log('id to be edited', id);
        for (var i = 0; i < self.users.users.length; i++) {
            if (self.users.users[i].idUser === id) {
                self.user = angular.copy(self.users.users[i]);
                break;
            }
        }
    };

    self.remove = function (id) {
        //console.log('id to be deleted', id);
        if (self.user.id === id) {//clean form if the user to be deleted is shown there.
            self.reset();
        }
        self.deleteUser(id);
    };
    self.getSexes= function () {
        //console.log('id to be deleted', id);
        SexService.fetchAllSexes()
            .then(function (data) {
                self.sexes = data;
            },
            function (errResponse) {
                //swal("Error...", "Ha ocurrido un error mientras se eliminaban los datos del usuario.! "+errResponse.data.message, "error");
                //console.error('Error while deleting User.');
            }
        );
        console.log("user controller get Sexes");
        console.log(self.sexes);
    };


    self.reset = function () {
        //console.log('resetting user');
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
            userEmail: '',
            phoneNumber: '',
            dateBirth: '',
            sex: '',
            parroquia: null,
            enabled: true
        };
        //console.log($scope.usuarioForm);
        $scope.usuarioForm.$setPristine(); //reset Form
    };

    self.valuationDate = new Date();
    self.valuationDatePickerIsOpen = false;

    self.valuationDatePickerOpen = function () {
        this.valuationDatePickerIsOpen = true;
    };
}]);
