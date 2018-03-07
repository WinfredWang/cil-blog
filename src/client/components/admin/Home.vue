<template>
    <div>
        <articel-manager></articel-manager>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      urls: []
    };
  },
  created: function() {
    this.$http.post("/route/admin/validate").then(response => {
      if (response.body.status !== 0) {
        location.href="/admin/login.html";
      }
    });
  }
};
</script>