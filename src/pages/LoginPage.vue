<template>
  <div class="container">
    <Header title="Login"></Header>
    <b-form @submit.prevent="onLogin">
      <b-form-group id="input-group-Username" label-cols-sm="3" label="Username:" label-for="Username">
        <b-form-input id="Username" v-model="$v.form.username.$model" type="text"
                      :state="validateState('username')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-Password" label-cols-sm="3" label="Password:" label-for="Password">
        <b-form-input id="Password" type="password" v-model="$v.form.password.$model"
                      :state="validateState('password')"></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length">
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-if="!$v.form.password.valid">
          need at least one number and one special letter
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary" style="width:100px;display:block;" class="mx-auto w-100 mb-2">Login
      </b-button>
      <b-button variant="danger" class="mx-auto w-100" @click="$router.push('/register')">Register</b-button>
      <div class="mt-2">
        Do not have an account yet?
        <router-link to="register"> Register in here</router-link>
      </div>
    </b-form>
    <b-alert class="mt-2" v-if="form.submitError" variant="warning" dismissible show>
      Login failed: {{ form.submitError }}
    </b-alert>
  </div>
</template>

<script>
import { alpha, maxLength, minLength, required } from "vuelidate/lib/validators";
import Header from "@/components/Header";

export default {
  name: "Login",
  components: { Header },
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      password: {
        required,
        valid: function(value) {
          const containsNumber = /[0-9]/.test(value);
          const containsSpecial = /[#?!@$%^&*-]/.test(value);
          return containsNumber && containsSpecial;
        },
        length: (p) => minLength(5)(p) && maxLength(10)(p)
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Login() {
      try {
        await this.axios.post("Login", { userName: this.form.username, password: this.form.password });
        this.$root.store.login(this.form.username);
        if (this.$router.currentRoute.path === "/")
          this.$router.go();
        else
          await this.$router.replace("/");
      } catch (err) {
        this.$root.toast("Input Error", err.response.data.message, "danger");
        this.form.submitError = err.response.data.message;
      }
    },
    onLogin() {
      this.form.submitError = undefined;
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.Login();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
