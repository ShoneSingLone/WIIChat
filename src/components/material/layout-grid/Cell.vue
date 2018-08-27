<template>
  <div class="mdc-layout-grid__cell">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "md-layout-grid",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" >
// Copyright 2017 Google Inc. All Rights Reserved.
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

@import "./variables";
@import "./mixins";

.mdc-layout-grid__cell {
  // select the upper breakpoint
  $upper-breakpoint: nth(map-keys($mdc-layout-grid-columns), 1);

  @each $size in map-keys($mdc-layout-grid-columns) {
    @include mdc-layout-grid-media-query_($size) {
      $gutter: map-get($mdc-layout-grid-default-gutter, $size);

      @include mdc-layout-grid-cell(
        $size,
        $mdc-layout-grid-default-column-span,
        $gutter
      );

      @for $span
        from 1
        through map-get($mdc-layout-grid-columns, $upper-breakpoint)
      {
        // Span classes.
        // stylelint-disable max-nesting-depth
        @at-root .mdc-layout-grid__cell--span-#{$span},
          .mdc-layout-grid__cell--span-#{$span}-#{$size} {
          @include mdc-layout-grid-cell-span_($size, $span, $gutter);
        }
        // stylelint-enable max-nesting-depth
      }
    }
  }
  // Order override classes.
  @for $i from 1 through map-get($mdc-layout-grid-columns, $upper-breakpoint) {
    &--order-#{$i} {
      @include mdc-layout-grid-cell-order($i);
    }
  }
  // Alignment classes.
  &--align-top {
    @include mdc-layout-grid-cell-align(top);
  }
  &--align-middle {
    @include mdc-layout-grid-cell-align(middle);
  }
  &--align-bottom {
    @include mdc-layout-grid-cell-align(bottom);
  }
}
// postcss-bem-linter: end
</style>
