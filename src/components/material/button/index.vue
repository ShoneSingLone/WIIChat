<template>
  <button class="button" ref="button">
    <slot></slot>
  </button>
</template>

<script>
import { MDCRipple } from "../ripple";

export default {
  name: "md-button",
  components: {},
  data() {
    return {};
  },
  mounted() {
    new MDCRipple(this.$refs.button);
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
//
// Copyright 2016 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

@import "../ripple/common";
@import "../ripple/mixins";

@import "./mixins";
@import "./variables";

$mdc-typography-styles-button: ();

// postcss-bem-linter: define button
.button {
  @include mdc-button-base_;
  @include mdc-button-corner-radius(2px);
  @include mdc-button-container-fill-color(transparent);
  @include mdc-button-ink-color(primary);
  @include mdc-states(primary);
  // The icon CSS class overrides styles defined in the .material-icons CSS
  // class, which is loaded separately so the order of CSS definitions is not
  // guaranteed. Therefore, increase specifity by nesting this class to ensure
  // overrides apply.
  .button__icon {
    @include mdc-button__icon_;
  }
  // stylelint-disable-next-line selector-no-qualifying-type
  svg.button__icon {
    @include mdc-button__icon-svg_;
  }
  text-transform: none;
}
.button--raised,
.button--unelevated,
.button--outlined {
  .button__icon {
    // Icons inside contained buttons have different styles due to increased button padding
    @include mdc-button__icon-contained_;
  }
}
.button--raised,
.button--unelevated {
  @include mdc-button--filled_;
  @include mdc-button-container-fill-color(primary);
  @include mdc-button-ink-color(on-primary);
  @include mdc-states(on-primary);
}
.button--raised {
  @include mdc-button--raised_;
}
.button--outlined {
  @include mdc-button--outlined_;
  @include mdc-button-outline-width(2px);
  @include mdc-button-outline-color(primary);
}
.button--dense {
  @include mdc-button--dense_;
}
</style>
