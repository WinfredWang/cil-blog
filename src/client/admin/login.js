import Vue from 'vue';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';

Vue.use(ElementUI)
Vue.use(VueResource)

new Vue({
    el: '#login',
    data: {
        pwd: "",
        email: "",
        invald: false
    },
    mounted: function () {
        this.$http
            .post("/admin/validate", { email: this.email, pwd: this.pwd })
            .then(response => {
                if (response.body.status == 0) {
                    location.href = "/admin"
                }
            });
    },
    methods: {
        login: function () {
            this.$http
                .post("/admin/login", { user: { email: this.email, pwd: this.pwd } })
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