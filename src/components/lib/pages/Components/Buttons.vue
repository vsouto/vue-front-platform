<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="row">
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">
                Pick your Color
              </h4>
            </div>
            <div class="card-body">
              <base-button>Default</base-button>&nbsp;
              <base-button type="primary">
                Primary
              </base-button>
              <base-button type="info">
                Info
              </base-button>&nbsp; <br>
              <base-button
                type="success"
                class="animation-on-hover"
              >
                Success
              </base-button>&nbsp; <base-button type="warning">
                Warning
              </base-button>&nbsp;
              <base-button type="danger">
                Danger
              </base-button>&nbsp;
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">
                Buttons with Label
              </h4>
            </div>
            <div class="card-body">
              <base-button>
                <i class="tim-icons icon-minimal-left" /> Left
              </base-button>
              &nbsp;

              <base-button>
                Right <i class="tim-icons icon-minimal-right" />
              </base-button>
              &nbsp;

              <base-button type="info">
                <i class="tim-icons icon-alert-circle-exc" /> Info
              </base-button>
              <br>
              <base-button type="success">
                <i class="tim-icons icon-check-2" /> Success
              </base-button>
              &nbsp;

              <base-button type="warning">
                <i class="tim-icons icon-time-alarm" /> Warning
              </base-button>
              &nbsp;

              <base-button type="danger">
                <i class="tim-icons icon-simple-remove" /> Danger
              </base-button>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">
                Pick your Size
              </h4>
            </div>
            <div class="card-body">
              <base-button
                type="primary"
                size="sm"
              >
                Small
              </base-button>
              <base-button type="primary">
                Regular
              </base-button>
              <base-button
                type="primary"
                size="lg"
              >
                Large
              </base-button>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">
                Pick your Style
              </h4>
            </div>
            <div class="card-body">
              <base-button type="primary">
                Default
              </base-button>
              <base-button
                type="primary"
                round
              >
                round
              </base-button>
              <base-button
                type="primary"
                round
              >
                <i
                  slot="label"
                  class="tim-icons icon-heart-2"
                /> with icon
              </base-button>
              <base-button
                type="primary"
                round
                icon
              >
                <i class="tim-icons icon-heart-2" />
              </base-button>
              <base-button
                type="primary"
                simple
              >
                Simple
              </base-button>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">
                Pagination
              </h4>
            </div>

            <div class="card-body">
              <base-pagination
                v-model="defaultPagination"
                type="warning"
                :page-count="10"
                :show-arrows="false"
              />

              <base-pagination
                v-model="infoPagination"
                :page-count="10"
                :pages-to-display="3"
              />
            </div>
          </div>

          <div class="col-md-6">
            <div class="card-header">
              <h4 class="card-title">
                Button Group
              </h4>
            </div>
            <div class="card-body">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-info btn-outline"
                >
                  Left
                </button>
                <button
                  type="button"
                  class="btn btn-info btn-outline"
                >
                  Middle
                </button>
                <button
                  type="button"
                  class="btn btn-info btn-outline"
                >
                  Right
                </button>
              </div>

              <br><br>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-info btn-outline"
                >
                  1
                </button>
                <button
                  type="button"
                  class="btn btn-info btn-outline"
                >
                  2
                </button>
                <button
                  type="button"
                  class="btn btn-info btn-outline"
                >
                  3
                </button>
                <button
                  type="button"
                  class="btn btn-info btn-outline"
                >
                  4
                </button>
              </div>
              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-info btn-round btn-outline"
                >
                  5
                </button>
                <button
                  type="button"
                  class="btn btn-info btn-round btn-outline"
                >
                  6
                </button>
                <button
                  type="button"
                  class="btn btn-info btn-round btn-outline"
                >
                  7
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="card-header">
          <h4 class="card-title">
            Social buttons
          </h4>
        </div>

        <div class="card-body">
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <p class="category">
                Default
              </p>
              <button class="btn btn-twitter">
                <i class="fab fa-twitter" /> Connect with Twitter
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <p class="category">
&nbsp;
              </p>
              <button class="btn btn-icon btn-twitter">
                <i class="fab fa-twitter" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <p class="category">
&nbsp;
              </p>
              <button class="btn btn-icon btn-round btn-twitter">
                <i class="fab fa-twitter" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <p class="category">
                Neutral
              </p>
              <button class="btn btn-icon btn-simple btn-twitter">
                <i class="fab fa-twitter" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <p class="category">
&nbsp;
              </p>
              <button class="btn btn-simple btn-twitter">
                <i class="fab fa-twitter" /> Connect with Twitter
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <button class="btn btn-facebook">
                <i class="fab fa-facebook-square" /> Share · 2.2k
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-facebook">
                <i class="fab fa-facebook-f" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-round btn-facebook">
                <i class="fab fa-facebook-f" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-simple btn-facebook">
                <i class="fab fa-facebook-square" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <button class="btn btn-simple btn-facebook">
                <i class="fab fa-facebook-square" /> Share · 2.2k
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <button class="btn btn-google">
                <i class="fab fa-google-plus-g" /> Share on Google+
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon  btn-google">
                <i class="fab fa-google-plus-g" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-round btn-google">
                <i class="fab fa-google-plus-g" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-simple btn-google">
                <i class="fab fa-google-plus-g" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <button class="btn btn-simple btn-google">
                <i class="fab fa-google-plus-g" /> Share on Google+
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <button class="btn btn-linkedin">
                <i class="fab fa-linkedin" /> Connect with Linkedin
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon  btn-linkedin">
                <i class="fab fa-linkedin" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-round btn-linkedin">
                <i class="fab fa-linkedin" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-simple btn-linkedin">
                <i class="fab fa-linkedin" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <button class="btn btn-simple btn-linkedin">
                <i class="fab fa-linkedin" /> Connect with Linkedin
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <button class="btn btn-pinterest">
                <i class="fab fa-pinterest" /> Pint it · 212
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-pinterest">
                <i class="fab fa-pinterest" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-round btn-pinterest">
                <i class="fab fa-pinterest" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-simple btn-pinterest">
                <i class="fab fa-pinterest" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <button class="btn btn-simple btn-pinterest">
                <i class="fab fa-pinterest" /> Pint it · 212
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <button class="btn btn-youtube">
                <i class="fab fa-youtube" /> View on Youtube
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-youtube">
                <i class="fab fa-youtube" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-round btn-youtube">
                <i class="fab fa-youtube" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-simple btn-youtube">
                <i class="fab fa-youtube" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <button class="btn btn-simple btn-youtube">
                <i class="fab fa-youtube" /> View on Youtube
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <button class="btn btn-tumblr">
                <i class="fab fa-tumblr-square" /> Repost
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon  btn-tumblr">
                <i class="fab fa-tumblr" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-round btn-tumblr">
                <i class="fab fa-tumblr" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-simple btn-tumblr">
                <i class="fab fa-tumblr-square" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <button class="btn btn-simple btn-tumblr">
                <i class="fab fa-tumblr-square" /> Repost
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <button class="btn btn-github">
                <i class="fab fa-github" /> Connect with Github
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon  btn-github">
                <i class="fab fa-github" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-round btn-github">
                <i class="fab fa-github" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-simple btn-github">
                <i class="fab fa-github" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <button class="btn btn-simple btn-github">
                <i class="fab fa-github" /> Connect with Github
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <button class="btn btn-behance">
                <i class="fab fa-behance-square" /> Follow us
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon  btn-behance">
                <i class="fab fa-behance" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-round btn-behance">
                <i class="fab fa-behance" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-simple btn-behance">
                <i class="fab fa-behance" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <button class="btn btn-simple btn-behance">
                <i class="fab fa-behance-square" /> Follow us
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <button class="btn btn-dribbble">
                <i class="fab fa-dribbble" /> Find us on Dribble
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon  btn-dribbble">
                <i class="fab fa-dribbble" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-round btn-dribbble">
                <i class="fab fa-dribbble" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-simple btn-dribbble">
                <i class="fab fa-dribbble" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <button class="btn btn-simple btn-dribbble">
                <i class="fab fa-dribbble" /> Find us on Dribble
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 col-sm-5">
              <button class="btn btn-reddit">
                <i class="fab fa-reddit" /> Repost · 232
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon  btn-reddit">
                <i class="fab fa-reddit" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-round btn-reddit">
                <i class="fab fa-reddit" />
              </button>
            </div>
            <div class="col-md-1 col-sm-1">
              <button class="btn btn-icon btn-simple btn-reddit">
                <i class="fab fa-reddit" />
              </button>
            </div>
            <div class="col-md-3 col-sm-4">
              <button class="btn btn-simple btn-reddit">
                <i class="fab fa-reddit" /> Repost · 232
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BasePagination } from 'src/components/lib';

export default {
  components: {
    BasePagination
  },
  data() {
    return {
      defaultPagination: 1,
      infoPagination: 3
    };
  }
};
</script>
<style></style>
