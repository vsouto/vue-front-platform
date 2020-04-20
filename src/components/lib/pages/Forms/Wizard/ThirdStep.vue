<template>
  <div class="row justify-content-center">
    <div class="col-sm-12">
      <h5 class="info-text">
        Are you living in a nice area?
      </h5>
    </div>
    <div class="col-sm-7">
      <base-input
        v-model="model.street"
        v-validate="modelValidations.street"
        label="Street Name"
        name="street name"
        :error="getError('street name')"
      />
    </div>
    <div class="col-sm-3">
      <base-input
        v-model="model.streetNo"
        v-validate="modelValidations.streetNo"
        label="Street No"
        name="street number"
        :error="getError('street number')"
      />
    </div>
    <div class="col-sm-5">
      <base-input
        v-model="model.city"
        v-validate="modelValidations.city"
        label="City"
        name="city"
        :error="getError('city')"
      />
    </div>
    <div class="col-sm-5">
      <label>Country</label>
      <base-input :error="getError('country')">
        <el-select
          v-model="model.country"
          v-validate="modelValidations.country"
          class="select-primary"
          name="country"
        >
          <el-option
            v-for="country in countryOptions"
            :key="country"
            class="select-primary"
            :label="country"
            :value="country"
          />
        </el-select>
      </base-input>
    </div>
  </div>
</template>
<script>
import { Select, Option } from 'element-ui';

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      model: {
        street: '',
        streetNo: '',
        city: '',
        country: ''
      },
      countryOptions: [
        'Australia',
        'Germany',
        'Netherlands',
        'USA',
        'UK',
        'New Zealand'
      ],
      modelValidations: {
        street: {
          required: true,
          min: 5
        },
        streetNo: {
          required: true,
          min: 5
        },
        city: {
          required: true
        },
        country: {
          required: true
        }
      }
    };
  },
  methods: {
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    validate() {
      return this.$validator.validateAll().then(res => {
        this.$emit('on-validated', res, this.model);
        return res;
      });
    }
  }
};
</script>
<style></style>
