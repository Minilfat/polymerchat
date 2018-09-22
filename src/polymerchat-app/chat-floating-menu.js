import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

import './user-profile-ava.js';

class ChatFloatingMenu extends PolymerElement {
  
  static get template() {
    return html`
        <style>
            .wrapper {
                display: flex;
                justify-content: center;
                flex-direction: column;
            }

            .header {
                box-sizing: border-box;
                background: green;
                color: white;
                height: 100px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }

            .user-name {
                color: black;
                margin: 10px auto;
                font-family: 'Droid serif', serif;
                font-size: 24px;
                font-weight: 400;
                font-style: italic;
                line-height: 30px;
                text-align: center;
            }

            .menu-content {}
        </style>
        <div class="wrapper">
            <div class="header">
                <user-profile-ava name="{{name}}"></user-profile-ava>
            </div>
            <div class="user-name">
                Welcome, {{name}}!
            </div>
            <div class="menu-content">

            </div>
        </div>
`;
  }

  static get is() {
      return 'chat-floating-menu';
  }
  static get properties() {
      return {
          name: {
              type: String,
              value: 'A'
          }
      };
  }
}

window.customElements.define(ChatFloatingMenu.is, ChatFloatingMenu);
