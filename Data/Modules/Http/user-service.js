(function () {
    'use strict';

    const Http = document.Http;

    /**
     * Сервис для работы с юзерами
     * @module UserService
     */
    class UserService
    {
        constructor()
        {
            this.user = null;
        }

        /**
         * Регистрирует нового пользователя
         * @param {string} name
         * @param {string} email
         * @param {string} password
         * @return {Promise}
         */
        signup(name, email, password)
        {
            return Http.FetchPost('/signup', {name, email, password});
        }

        /**
         * Авторизация пользователя
         * @param {string} email
         * @param {string} password
         * @return {Promise}
         */
        login(email, password) {
            return Http.FetchPost('/login', {email, password});
        }

        isLoggedIn() {
            return !!this.user;
        }

        /**
         * Загружает данные о текущем пользователе
         * @param {boolean} [force=false]
         * @return {Promise}
         */
        getData(force = false) {
            if (this.isLoggedIn() && !force) {
                return Promise.resolve(this.user);
            }

            return Http.FetchGet('/me')
                .then(function (userdata) {
                    this.user = userdata;
                    return userdata;
                }); // .bind(this) ??
        }

        /**
         * Загружает список всех пользователей
         * @return {Promise}
         */
        loadUsersList() {
            return Http.FetchGet('/users')
                .then(function (users) {
                    this.users = users;

                    if (this.isLoggedIn()) {
                        this.users = this.users.map(function (user) {
                            user.me = user.email === this.user.email;
                            return user;
                        }.bind(this));
                    }

                    return this.users;
                }.bind(this));
        }


    }

    window.UserService = UserService;

})();

/*
	function onSubmitLoginForm(formdata) {
		return userService
			.login(formdata.email, formdata.password)
			.then(function () {
				// OK
			})
			.catch((err) => alert(`Some error ${err.status}: ${err.responseText}`)); // если throw
	}

	function onSubmitSignupForm(formdata) {
		return userService
			.signup(formdata.email, formdata.password, +formdata.age)
			.then(function () {
				// OK
			})
			.catch((err) => alert(`Some error ${err.status}: ${err.responseText}`)); // если throw
	}

	userService.getData()
	.then(function () {
		// OK
	})
	.catch(function (error) {
		// ignore this error
	});

*/
