<template>
    <div v-if="validate">
        <articel-manager></articel-manager>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      validate: false
    };
  },
  created: function() {
    this.$http.post("/route/admin/validate").then(response => {
      if (response.body.code !== 0) {
        this.validate = false;
        location.href = "/admin/login.html";
      } else {
        this.validate = true;
      }
    });
  }
};
</script>