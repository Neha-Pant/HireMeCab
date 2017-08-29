'use strict';
angular.module('meanApp').factory('AuthenticationService', Service);

function Service($http, $cookies, $sessionStorage) {
    var service = {};
    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(user, callback) {
      console.log('inside auth service');
        $http.post('/uapi/login', user)
            .then(function(response) {
                if (response.data.success && response.data.token) {
                //  console.log('inside success');
                    $sessionStorage.tokenDetails = {
                        token: response.data.token
                    };
                    $http.defaults.headers.common.Authorization = response.data.token;
                    var obj = {
                        currentUser: {
                            isLoggedIn: true,
                            userInfo: {
                                id: response.data.userDetail._id,
                                email: response.data.userDetail.Email,
                                name: response.data.userDetail.Name,
                                phone: response.data.userDetail.Phone,
                                address: response.data.userDetail.Address,
                                role: response.data.userDetail.Role,
                                status: response.data.userDetail.Status
                            }
                        }
                    };
                    $cookies.putObject('authUser', obj);
                    console.log(obj);
                    callback(response);
                } else {
                    callback(response);
                }
            });
    }

    function Logout() {
    //  console.log('removing user');
        delete $sessionStorage.tokenDetails;
        $http.defaults.headers.common.Authorization = '';
        $cookies.remove('authUser');

    }
}
