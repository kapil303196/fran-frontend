<template>
  <div class="container">
    <div v-if="error.length > 0">
      <div class="alert alert-danger" v-for="e in error" :key="e">
        <strong>Danger!</strong> {{ e }}
        action.
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <form @submit.prevent="login()" class="box">
            <h1>Login</h1>
            <p class="text-muted">Please enter your login and password!</p>
            <input
              type="text"
              name=""
              placeholder="Username"
              v-model="username"
            />
            <input
              type="password"
              name=""
              placeholder="Password"
              v-model="password"
            />
            <input type="submit" name="" value="Login" href="#" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Login from "@/components/Login.vue";
var validator = require("validator");

export default {
  name: "Login",
  components: { Login },
  data() {
    return {
      buttonText: "Login",
      username: "",
      password: "",
      error: [],
    };
  },
  mounted() {
    this.changeButtonName();
  },
  methods: {
    login() {
      this.error = [];
      if (!this.checkLength(this.password)) {
        this.error.push("Passwords cannot be longer than 32 characters");
      }
      if (!this.checkIfLowerCase(this.password)) {
        this.error.push(
          "Passwords can only contain lower case alphabetic characters"
        );
      }
      if (!this.checkSameLooking(this.password)) {
        this.error.push(
          "Passwords may not contain the letters i, O, or l, as these letters can be mistaken for other characters"
        );
      }
      if (!this.checkNonOverlappingTwoPairs(this.password)) {
        this.error.push(
          "Passwords may not contain the letters i, O, or l, as these letters can be mistaken for other characters"
        );
      }
      if (!this.checkIncreasingLetters(this.password)) {
        this.error.push(
          "Passwords must include one increasing straight of at least three letters, like abc, cde, fgh, and so on, up to xyz . They cannot skip letters; acd doesn't count."
        );
      }
      let isLoggedIn =
        localStorage.getItem("isLoggedIn") === "false" ? false : true;
      localStorage.setItem("isLoggedIn", true);
      this.$router.push({ name: "Home" });
      this.changeButtonName();
    },
    changeButtonName() {
      let isLoggedIn =
        localStorage.getItem("isLoggedIn") === "false" ? false : true;
      if (isLoggedIn) {
        this.buttonText = "Logout";
      } else {
        this.buttonText = "Login";
      }
    },
    removeNumbersAndSpecialCharacters(value) {
      return value
        .replace(/(?!\w|\s)./g, "")
        .replace(/\s+/g, " ")
        .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, "$2")
        .replace(/[0-9]/g, "");
    },

    checkIncreasingLetters(control) {
      let increasingLetters = "";

      for (
        let itemIndex = 0;
        itemIndex < this.removeNumbersAndSpecialCharacters(control).length - 1;
        itemIndex++
      ) {
        if (
          control.charCodeAt(itemIndex) ===
            control.charCodeAt(itemIndex + 1) - 1 &&
          control.charCodeAt(itemIndex) ===
            control.charCodeAt(itemIndex + 2) - 2
        ) {
          increasingLetters = control.substr(itemIndex, itemIndex + 3);
        }
      }
      if (increasingLetters.length > 0) {
        return true;
      } else {
        return false;
      }
    },

    checkNonOverlappingTwoPairs(control) {
      let matchingPairs = [],
        sortedValue = [];

      if (control.length > 0) {
        sortedValue = Array.from(
          this.removeNumbersAndSpecialCharacters(control)
        ).sort();

        for (
          let itemIndex = 0;
          itemIndex < sortedValue.length - 1;
          itemIndex++
        ) {
          if (sortedValue[itemIndex + 1] === sortedValue[itemIndex]) {
            matchingPairs.push(sortedValue[itemIndex]);
          }
        }
      }
      console.log("matchingPairs", matchingPairs);
      if (matchingPairs.length >= 2) {
        return true;
      } else {
        return false;
      }
    },

    checkSameLooking(str) {
      var re = /^[^iOl]*$/;
      return re.test(str);
    },

    checkLength(str) {
      if (str.length > 32) {
        return false;
      } else {
        return true;
      }
    },

    checkIfLowerCase(str) {
      return validator.isLowercase(str);
    },
  },
};
</script>