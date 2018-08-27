/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC List. Provides an interface for managing focus.
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
class MDCListAdapter {
  /** @return {number} */
  getListItemCount() {}

  /**
   * @return {number} */
  getFocusedElementIndex() {}

  /** @param {Element} node */
  getListItemIndex(node) {}

  /**
   * @param {number} index
   * @param {string} attribute
   * @param {string} value
   */
  setAttributeForElementIndex(index, attribute, value) {}

  /**
   * @param {number} index
   * @param {string} attribute
   */
  removeAttributeForElementIndex(index, attribute) {}

  /**
   * @param {number} index
   * @param {string} className
   */
  addClassForElementIndex(index, className) {}

  /**
   * @param {number} index
   * @param {string} className
   */
  removeClassForElementIndex(index, className) {}

  /**
   * Focuses list item at the index specified.
   * @param {number} index
   */
  focusItemAtIndex(index) {}

  /**
   * Checks if the provided element is a focusable sub-element.
   * @param {Element} ele
   */
  isElementFocusable(ele) {}

  /**
   * Checks if the provided element is contains the mdc-list-item class.
   * @param {Element} ele
   */
  isListItem(ele) {}

  /**
   * Sets the tabindex to the value specified for all button/a element children of
   * the list item at the index specified.
   * @param {number} listItemIndex
   * @param {number} tabIndexValue
   */
  setTabIndexForListItemChildren(listItemIndex, tabIndexValue) {}
}

export default MDCListAdapter;
