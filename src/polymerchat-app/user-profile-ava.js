import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class UserProfileAva extends PolymerElement {
  static get template() {
    return html`
      <style>
        .wrapper {
          width: 45px;
          height: 45px;
          display: flex;

          justify-content: center;
          align-items: center;

          border-radius: 50%;
          background: #8FB996;
        }

        .item {
          font-size: 1.3em;
          color: white;
          font-weight: 900;
          text-transform: uppercase;
        }
      </style>

      <div class="wrapper">
        <div class="item">
          [[_firstLetter]]
        </div>
      </div>
    `;
  }

  static get is() {
    return 'user-profile-ava';
  }

  static get properties() {
    return {
      name: {
        type: String,
        value: undefined
      },
      _firstLetter: {
        type: String,
        computed: "_computeFirstLetter(name)"
      }
    }
  }
  _computeFirstLetter(name) {
    if (name === undefined) {
      return "";
    }

    return name[0];
  }
}
window.customElements.define(UserProfileAva.is, UserProfileAva);
