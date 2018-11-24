$(function () {

    var loginJS = {

        init: function () {
            this.check_login();

        },

        check_login: function () {
            let user_token = localStorage.getItem("presc_user_token");

            if (user_token !== null) return;

            let location_uri = location.pathname.substr(1);

            if (location_uri.search("login") > 0)
                return;
            else
                window.location.href = "/web-frontend/pages/examples/login.html";



        }


    };

    loginJS.init();

})

