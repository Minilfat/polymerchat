import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './polymerchat-app.js';
import './login-register.js';

class MainApp extends PolymerElement {

  static get template() {
    return html`
      <template is="dom-if" if="[[!isLoggedIn]]">
        <login-register on-user-is-logged-in="_handleUserIsLoggedIn"></login-register>
      </template>

      <template is="dom-if" if="[[isLoggedIn]]">
        <polymerchat-app on-user-is-logged-out="_handleUserIsLoggedOut" stored-user="[[user]]"></polymerchat-app>
      </template>
    `;
  }

  static get properties() {
    return {
      user: {
        type: Object,
        value: {}
      },
      isLoggedIn: {
        type: Boolean,
        value: false
      }
    }
  }

  _handleUserIsLoggedIn(event) {
    this.set("isLoggedIn", true);
    this.set("user", event.detail.user);
    setTimeout(() => {
      let polymerChatAppElement = this.shadowRoot.querySelector("polymerchat-app");
      console.log(polymerChatAppElement)
      polymerChatAppElement.establishConnection();
    }, 200);
  }

  _handleUserIsLoggedOut() {
    this.set("isLoggedIn", false);
  }
}

window.customElements.define('main-app', MainApp);
