$(function () {

    var loginJS = {

        init: function () {
            this.check_login();

        },

        check_login: function () {
            let user_token = localStorage.getItem("presc_user_token");

            if (user_token !== null) return;

            let location_uri = location.pathname.substr(1);

            if (location_uri.search("login") < 0) {
                window.location.href = "/web-frontend/pages/examples/login.html";
                return;
            }


            $(document).on("click", '#login_form button[type="submit"]', function () {

            })


            $( "#login_form" ).submit(function( event ) {

                event.preventDefault();
                var data = $(this).serializeArray();



                $.ajax({
                    url:        'http://cse299.wp-expert.us:8001/auth/login',
                    type:       "POST",
                    data:  data,
                    dataType: 'text json',
                    success: function (data, textStatus, jqXHR) {
                        localStorage.setItem("presc_user_token", data.token);
                        window.location.href = "/web-frontend/";
                        return;
                    },

                    error: function (jqXHR, textStatus, errorThrown) {
                        alert('Login error, try again!');
                    },

                    complete: function (jqXHR, textStatus) {
                        //DO SOMETHING HERE IF YOU WISH TO
                    }
                });


            });




        }


    };

    loginJS.init();

})

