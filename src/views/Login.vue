<template>
  <div class="login">
    <Login />
    <p>Login Page</p>
    <button @click="login()">{{ buttonText }}</button>
  </div>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
  name: "Login",
  components: { Login },
  data() {
    return {
      buttonText: "Login",
    };
  },
  mounted() {
    this.changeButtonName();
  },
  methods: {
    login() {
      let isLoggedIn =
        localStorage.getItem("isLoggedIn") === "false" ? false : true;
      if (isLoggedIn) {
        localStorage.setItem("isLoggedIn", false);
      } else {
        localStorage.setItem("isLoggedIn", true);
      }
      this.changeButtonName();
    },
    changeButtonName() {
      let isLoggedIn =
        localStorage.getItem("isLoggedIn") === "false" ? false : true;
      if (isLoggedIn) {
        this.buttonText = "Logout";
      } else {
        this.buttonText = "Log";
      }
    },
  },
};
</script>
