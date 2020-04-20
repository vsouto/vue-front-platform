<template>
  <div class="row">
    <div class="col-md-6">
      <register-form @on-submit="onRegisterSubmit" />
    </div>
    <div class="col-md-6">
      <login-form @on-submit="onLoginSubmit" />
    </div>
    <div class="col-md-12">
      <type-validation-form
        @on-submit="onTypeValidationSubmit"
      />
    </div>
    <div class="col-md-12">
      <range-validation-form
        @on-submit="onRangeValidationSubmit"
      />
    </div>
  </div>
</template>
<script>
import RegisterForm from './ValidationForms/RegisterForm.vue';
import LoginForm from './ValidationForms/LoginForm.vue';
import TypeValidationForm from './ValidationForms/TypeValidationForm.vue';
import RangeValidationForm from './ValidationForms/RangeValidationForm';

export default {
  components: {
    RegisterForm,
    LoginForm,
    TypeValidationForm,
    RangeValidationForm
  },
  data() {
    return {
      registerModel: {},
      loginModel: {},
      typeValidationModel: {},
      rangeValidationModel: {}
    };
  },
  methods: {
    onRegisterSubmit(model) {
      this.registerModel = model;
    },
    onLoginSubmit(model) {
      this.loginModel = model;
    },
    onTypeValidationSubmit(model) {
      this.typeValidationModel = model;
    },
    onRangeValidationSubmit(model) {
      this.rangeValidationModel = model;
    }
  }
};
</script>
<style></style>
