/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
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

import MDCFoundation from '@material/base/foundation';
import MDCChipAdapter from './adapter';
import {strings, cssClasses} from './constants';


/**
 * @extends {MDCFoundation<!MDCChipAdapter>}
 * @final
 */
class MDCChipFoundation extends MDCFoundation {
  /** @return enum {string} */
  static get strings() {
    return strings;
  }

  /** @return enum {string} */
  static get cssClasses() {
    return cssClasses;
  }

  /**
   * {@see MDCChipAdapter} for typing information on parameters and return
   * types.
   * @return {!MDCChipAdapter}
   */
  static get defaultAdapter() {
    return /** @type {!MDCChipAdapter} */ ({
      addClass: () => {},
      removeClass: () => {},
      hasClass: () => {},
      addClassToLeadingIcon: () => {},
      removeClassFromLeadingIcon: () => {},
      eventTargetHasClass: () => {},
      notifyInteraction: () => {},
      notifyTrailingIconInteraction: () => {},
      notifyRemoval: () => {},
      getComputedStyleValue: () => {},
      setStyleProperty: () => {},
    });
  }

  /**
   * @param {!MDCChipAdapter} adapter
   */
  constructor(adapter) {
    super(Object.assign(MDCChipFoundation.defaultAdapter, adapter));

    /**
     * Whether a trailing icon click should immediately trigger exit/removal of the chip.
     * @private {boolean}
     * */
    this.shouldRemoveOnTrailingIconClick_ = true;
  }

  /**
   * @return {boolean}
   */
  isSelected() {
    return this.adapter_.hasClass(cssClasses.SELECTED);
  }

  /**
   * @param {boolean} selected
   */
  setSelected(selected) {
    if (selected) {
      this.adapter_.addClass(cssClasses.SELECTED);
    } else {
      this.adapter_.removeClass(cssClasses.SELECTED);
    }
  }

  /**
   * @return {boolean}
   */
  getShouldRemoveOnTrailingIconClick() {
    return this.shouldRemoveOnTrailingIconClick_;
  }

  /**
   * @param {boolean} shouldRemove
   */
  setShouldRemoveOnTrailingIconClick(shouldRemove) {
    this.shouldRemoveOnTrailingIconClick_ = shouldRemove;
  }

  /**
   * Begins the exit animation which leads to removal of the chip.
   */
  beginExit() {
    this.adapter_.addClass(cssClasses.CHIP_EXIT);
  }

  /**
   * Handles an interaction event on the root element.
   * @param {!Event} evt
   */
  handleInteraction(evt) {
    if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
      this.adapter_.notifyInteraction();
    }
  }

  /**
   * Handles a transition end event on the root element.
   * @param {!Event} evt
   */
  handleTransitionEnd(evt) {
    // Handle transition end event on the chip when it is about to be removed.
    if (this.adapter_.eventTargetHasClass(/** @type {!EventTarget} */ (evt.target), cssClasses.CHIP_EXIT)) {
      if (evt.propertyName === 'width') {
        this.adapter_.notifyRemoval();
      } else if (evt.propertyName === 'opacity') {
        // See: https://css-tricks.com/using-css-transitions-auto-dimensions/#article-header-id-5
        const chipWidth = this.adapter_.getComputedStyleValue('width');

        // On the next frame (once we get the computed width), explicitly set the chip's width
        // to its current pixel width, so we aren't transitioning out of 'auto'.
        requestAnimationFrame(() => {
          this.adapter_.setStyleProperty('width', chipWidth);

          // To mitigate jitter, start transitioning padding and margin before width.
          this.adapter_.setStyleProperty('padding', '0');
          this.adapter_.setStyleProperty('margin', '0');

          // On the next frame (once width is explicitly set), transition width to 0.
          requestAnimationFrame(() => {
            this.adapter_.setStyleProperty('width', '0');
          });
        });
      }
      return;
    }

    // Handle a transition end event on the leading icon or checkmark, since the transition end event bubbles.
    if (evt.propertyName !== 'opacity') {
      return;
    }
    if (this.adapter_.eventTargetHasClass(/** @type {!EventTarget} */ (evt.target), cssClasses.LEADING_ICON) &&
        this.adapter_.hasClass(cssClasses.SELECTED)) {
      this.adapter_.addClassToLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
    } else if (this.adapter_.eventTargetHasClass(/** @type {!EventTarget} */ (evt.target), cssClasses.CHECKMARK) &&
               !this.adapter_.hasClass(cssClasses.SELECTED)) {
      this.adapter_.removeClassFromLeadingIcon(cssClasses.HIDDEN_LEADING_ICON);
    }
  }

  /**
   * Handles an interaction event on the trailing icon element. This is used to
   * prevent the ripple from activating on interaction with the trailing icon.
   * @param {!Event} evt
   */
  handleTrailingIconInteraction(evt) {
    evt.stopPropagation();
    if (evt.type === 'click' || evt.key === 'Enter' || evt.keyCode === 13) {
      this.adapter_.notifyTrailingIconInteraction();
      if (this.shouldRemoveOnTrailingIconClick_) {
        this.beginExit();
      }
    }
  }
}

/**
 * @typedef {{
 *   detail: {
 *     chip: {foundation: !MDCChipFoundation},
 *   },
 *   bubbles: boolean,
 * }}
 */
let MDCChipInteractionEventType;

export {MDCChipFoundation, MDCChipInteractionEventType};
