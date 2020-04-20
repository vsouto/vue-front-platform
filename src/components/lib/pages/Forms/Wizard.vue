<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10">
        <simple-wizard>
          <template slot="header">
            <h3 class="card-title">
              Build your profile
            </h3>
            <h3 class="description">
              This information will let us know more about you.
            </h3>
          </template>

          <wizard-tab :before-change="() => validateStep('step1')">
            <template slot="label">
              <i class="tim-icons icon-single-02" />
              <p>About</p>
            </template>
            <first-step
              ref="step1"
              @on-validated="onStepValidated"
            />
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step2')">
            <template slot="label">
              <i class="tim-icons icon-settings-gear-63" />
              <p>Account</p>
            </template>
            <second-step
              ref="step2"
              @on-validated="onStepValidated"
            />
          </wizard-tab>

          <wizard-tab :before-change="() => validateStep('step3')">
            <template slot="label">
              <i class="tim-icons icon-delivery-fast" />
              <p>Address</p>
            </template>
            <third-step ref="step3" />
          </wizard-tab>
        </simple-wizard>
      </div>
    </div>
  </div>
</template>
<script>
import FirstStep from './Wizard/FirstStep.vue';
import SecondStep from './Wizard/SecondStep.vue';
import ThirdStep from './Wizard/ThirdStep.vue';
import swal from 'sweetalert2';
import { SimpleWizard, WizardTab } from 'src/components/lib';

export default {
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    SimpleWizard,
    WizardTab
  },
  data() {
    return {
      wizardModel: {}
    };
  },
  methods: {
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
    },
    wizardComplete() {
      swal('Good job!', 'You clicked the finish button!', 'success');
    }
  }
};
</script>
