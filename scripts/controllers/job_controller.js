/**
 * Created by Reinier on 17/04/2016.
 */

'use strict'

app.controller('JobController', ['$scope', 'EmpresaService', 'SubEmpresaService', 'SucursalService', 'AgenciaService',
    function ($scope, EmpresaService, SubEmpresaService, SucursalService, AgenciaService) {
        var self = this;
        self.empresa = {
            idEmpresa: null,
            nombreEmpresa: '',
            observacionEmpresa: '',
            idRepresentante: '',
            rupEmpresa: '',
            fechaConstitucionEmpresa: '',
            esloganEmpresa: '',
            imagenEmpresa: ''
        };
        self.subempresa = {
            idSubEmpresa: null,
            idEmpresa: '',
            nombreSubEmpresa: '',
            observacionSubEmpresa: '',
            idTipoNegocioSubEmpresa: '',
            idRepresentante1SubEmpresa: '',
            idRepresentante2SubEmpresa: '',
            fechaConstitucionSubEmpresa: '',
            esloganSubEmpresa: '',
            imagenLogoSubEmpresa: ''
        };
        self.sucursal = {
            idSucursal: null,
            idSubEmpresa: '',
            nombreSucursal: '',
            observacionSucursal: '',
            idRepresentanteSucursal: ''
        };
        self.agencia = {
            idAgencia: null,
            idSucursal: '',
            nombreAgencia: '',
            observacionAgencia: '',
            idRepresentanteAgencia: ''
        };
        self.empresas = [];
        self.subempresas = [];
        self.sucursales = [];
        self.agencias = [];

        self.fetchAllEmpresas = function () {
            EmpresaService.fetchAllEmpresas()
                .then(
                    function (data) {
                        self.empresas = data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching Currencies');
                    }
                );
        };

        self.getSubEmpresaByIdEmpresa = function (id) {
            SubEmpresaService.getSubEmpresaByIdEmpresa(id)
                .then(function (data) {
                        self.subempresas = data;
                        console.log(self.subempresas);
                    },
                    function (errResponse) {
                        console.error('Error while fetching Provinces');
                    });
        };

        self.getSucursalesByIdSubEmpresa = function (id) {
            console.log(id);
            SucursalService.getSucursalesByIdSubEmpresa(id)
                .then(function (data) {
                        self.sucursales = data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching Cities');
                    });
        };
        self.getAgenciasByIdSucursal = function (id) {
            AgenciaService.getAgenciasByIdSucursal(id)
                .then(function (data) {
                        self.agencias = data;
                    },
                    function (errResponse) {
                        console.error('Error while fetching Parroquias');
                    });
        };
        self.reset = function () {
            self.empresa = {
                idEmpresa: null,
                nombreEmpresa: '',
                observacionEmpresa: '',
                idRepresentante: '',
                rupEmpresa: '',
                fechaConstitucionEmpresa: '',
                esloganEmpresa: '',
                imagenEmpresa: ''
            };
            self.subempresa = {
                idSubEmpresa: null,
                idEmpresa: '',
                nombreSubEmpresa: '',
                observacionSubEmpresa: '',
                idTipoNegocioSubEmpresa: '',
                idRepresentante1SubEmpresa: '',
                idRepresentante2SubEmpresa: '',
                fechaConstitucionSubEmpresa: '',
                esloganSubEmpresa: '',
                imagenLogoSubEmpresa: ''
            };
            self.sucursal = {
                idSucursal: null,
                idSubEmpresa: '',
                nombreSucursal: '',
                observacionSucursal: '',
                idRepresentanteSucursal: ''
            };
            self.agencia = {
                idAgencia: null,
                idSucursal: '',
                nombreAgencia: '',
                observacionAgencia: '',
                idRepresentanteAgencia: ''
            };
            self.empresas = [];
            self.subempresas = [];
            self.sucursales = [];
            self.agencias = [];

        }


        self.fetchAllFromAgencia = function (id) {
            AgenciaService.fetchAllFromAgencia(id).then(function (data) {
                    self.agencia = data.agencia;
                    self.sucursal = data.sucursal;
                    self.sucursal.idSucursal= self.sucursal.idSucursal+ ""; //TODO: change that +"" for a function that convert a number into a string
                    self.subempresa = data.subempresa;
                    self.subempresa.idSubEmpresa= self.subempresa.idSubEmpresa + "";  //TODO: change that +"" for a function that convert a number into a string
                    self.empresa = data.empresa;
                    self.empresa.idEmpresa= self.empresa.idEmpresa + ""; //TODO: change that +"" for a function that convert a number into a string
                    self.agencias = {"agencias": data.agencias};
                    self.sucursales = {"sucursales": data.sucursales};
                    self.subempresas = {"subempresas": data.subempresas};
                    self.empresas = {"empresas": data.empresas};

                },
                function (errResponse) {
                    console.error('Error while fetching Agencias');
                })
        };
        self.fetchAllFromSucursal = function (id) {
            SucursalService.fetchAllFromSucursal(id).then(function (data) {
                    //self.city = data.city;
                    //self.city.idCity = self.city.idCity+""; //TODO: change that +"" for a function that convert a number into a string
                    self.subempresa = data.subempresa;
                    self.subempresa.idSubEmpresa= self.subempresa.idSubEmpresa + "";  //TODO: change that +"" for a function that convert a number into a string
                    self.empresa = data.empresa;
                    self.empresa.idEmpresa= self.empresa.idEmpresa + ""; //TODO: change that +"" for a function that convert a number into a string
                    self.subempresas = {"subempresas": data.subempresas};
                    self.empresas = {"empresas": data.empresas};

                },
                function (errResponse) {
                    console.error('Error while fetching Sucursales');
                })
        }
        self.fetchAllEmpresas();
    }]);

