<template>
    <form id="login">
        <div class="col-md-5 col-md-offset-3">
            <div class="alert alert-danger" role="alert" v-if="invald">Email or Password is wrong!</div>
            <div class="form-group clearfix ">
                <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" v-model="email" placeholder="Email">
                </div>
            </div>
            <div class="form-group clearfix ">
                <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" v-model="pwd" placeholder="Password">
                </div>
            </div>
            <div class="form-group clearfix">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-default" v-on:click=login>Sign in</button>
                </div>
            </div>

        </div>
    </form>
</template>

<script>
    export default {
        data: function () {
            return {
                pwd: '',
                email: '',
                invald: false
            }
        },
        mounted: function () {
            this.$http.post('/admin/islogin', { email: this.email, pwd: this.pwd }).then((response) => {
                if (response.body.status == 0) {
                    this.$router.push({ path: '/home' })
                }
            });
        },
        methods: {
            login: function () {
                this.$http.post('/admin/login', { email: this.email, pwd: this.pwd }).then((response) => {
                    if (response.body.status == 0) {
                        this.invald = false;
                        this.$router.push({ path: '/home' })
                    } else {
                        this.invald = true;
                    }
                });
            }
        }
    }

</script>
<style>
    #login {
        margin-top: 100px;
    }
    #login .form-group {
        margin-top: 10px; 
    }
</style>