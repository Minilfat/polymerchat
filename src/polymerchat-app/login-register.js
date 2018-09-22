import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/polymer/lib/elements/dom-if.js';

class LoginRegister extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        .panel-body {
          /* background: #D7FFF1; */
          height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          
        }

        .input-wrapper {
          width: 300px;
          height: 300px;
          border-radius: 10px;
        }

        paper-button {
          background: #285943;
          width: 90%;
          color: white;
        }

        paper-input {
          width: 90%;
          margin-left: 5px;
        }
      </style>
      
      <div class="panel-body">
        <div class="input-wrapper">
          <paper-input label="Sign in with an unique name" value="{{login}}" on-keypress="keyPressed"></paper-input>
          <paper-button raised="" on-tap="signIn">Sign In!</paper-button>
        </div>
      </div>
    `;
  }

  static get is() { return 'login-register'; }

  static get properties() {
    return {
      login: {
        type: String,
        value: ""
      },

      _finalName: {
        type: String,
        value: ""
      }
    }
  }

  signIn() {
    if (this.login !== "") {
      this._finalName = this.login;
      this.login = "";
      this.dispatchEvent(new CustomEvent("user-is-logged-in", {
        detail: {
          user: {
            name: this._finalName
          }
        }
      }))
    }
  }

  keyPressed(e) {
    if (13 === e.charCode) {
      this.signIn();
    }
  }
}

window.customElements.define(LoginRegister.is, LoginRegister);
