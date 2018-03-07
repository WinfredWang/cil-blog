import Vue from 'vue';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';

Vue.use(ElementUI)
Vue.use(VueResource)

new Vue({
    el: '#login',
    data: {
        name: "",
        password: "",
        invald: false
    },
    mounted: function () {
        this.$http
            .post("/route/admin/validate", { name: this.name, password: this.password })
            .then(response => {
                if (response.body.status == 0) {
                    location.href = "/admin"
                }
            });
    },
    methods: {
        login: function () {
            this.$http
                .post("/route/admin/login", { user: { name: this.name, password: this.password } })
                .then(response => {
                    if (response.body.status == 0) {
                        this.invald = false;
                        location.href = "/admin"
                    } else {
                        this.invald = true;
                    }
                });
        }
    }
})