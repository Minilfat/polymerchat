import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-toolbar/paper-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-badge/paper-badge.js';
import '@polymer/app-layout/app-layout.js';

import './user-profile-ava.js';
import './message-box-single.js';
import './login-register.js';
import './chat-floating-menu.js';


class PolymerchatApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }

        :host([is-left-menu-opened]) #footerId {
          opacity: 0;
          visibility: hidden;
          transition: visibility 0s;
        }

        .content-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .header {
          background: #4184F4;
          color: white;
        }

        .messages-box {
          padding: 5px;
          flex: 1;
          overflow: auto;
        }

        .footer {
          padding: 0 5px 5px 5px;
          visibility: visible;
          transition: visibility 0s linear 0.3s, opacity 2s;
        }


        .card-flex-box {
          display: flex;
          align-items: center;
        }

        .card-flex-box paper-input {
          flex-grow: 2;
        }

        .submit-message-btn {
          width: 60px;
          height: 35px;
          margin: auto 10px;
        }

        .message-text-input {
          margin: 5px 5px 5px 10px;
        }

        .user-info {
          margin: auto;
        }

        .message-ava {
          margin: 5px;
        }

        paper-button {
          background: #8FB996;
          color: white;
          font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
          font-weight: 600
        }
      </style>


      <div class="content-container">

        <div class="header">
          <app-header reveals="">
            <app-toolbar>
              <paper-icon-button icon="menu" on-tap="toggleLefttMenu"></paper-icon-button>
              <div main-title="">RosssaChat</div>
              <paper-icon-button icon="exit-to-app" on-tap="logOut"></paper-icon-button>
            </app-toolbar>
          </app-header>
          <app-drawer id="drawer" opened="{{isLeftMenuOpened}}">
            <chat-floating-menu name="{{storedUser.name}}"></chat-floating-menu>
          </app-drawer>
        </div>



        <div class="messages-box" id="scrollableDiv">
          <template is="dom-repeat" items="{{messagesHistory}}">
            <message-box-single is-mine="{{item.isMine}}" text-data="{{item.text}}" message-time="{{item.time}}" sender-name="{{item.author}}"></message-box-single>
          </template>
        </div>


        <div class="footer" id="footerId">
          <paper-card class="card-flex-box">
            <user-profile-ava class="message-ava" name="{{storedUser.name}}"></user-profile-ava>
            <paper-input label="Type message" no-label-float="" class="message-text-input" type="text" value="{{textMessage}}" on-tap="sendMessage" on-keypress="_keyPressed"></paper-input>
            <paper-button class="submit-message-btn" raised="" on-tap="sendMessage">Send</paper-button>
          </paper-card>
        </div>

      </div>
    `;
  }

  static get is() {
    return 'polymerchat-app';
  }
  static get properties() {
    return {
      textMessage: {
        type: String,
        value: ""
      },

      _connection: {
        type: Object,
        value: {}
      },

      storedUser: {
        type: Object,
        value: {}
      },

      messagesHistory: {
        type: Array,
        value: []
      },

      isLeftMenuOpened: {
        type: Boolean,
        value: false,
        reflectToAttribute: true
      }
    };
  }


  _onOpen() {
    console.log("Connection with socket server was established");
    console.log("Sending username: ", this.storedUser.name);
    this._connection.send(this.storedUser.name);
  }

  _onMessage(event) {
    console.log('this comes here');
    this._showMessage(event.data);
  }

  _onClose() {
    console.log("Connection with socket server was closed");
  }

  _onError(event) {
    console.log("Error happened", event);
  }

  _keyPressed(e) {
    if (13 === e.charCode) {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (this.textMessage !== "") {
      this._connection.send(this.textMessage);
      this.textMessage = "";
    }
  }

  _showMessage(messageObject) {
    let mes = JSON.parse(messageObject)
    if (mes.type === 'history') {
      console.log(mes.data);
      mes.data.forEach(item => {
        item.isMine = item.author === this.storedUser.name;
      });
      this.set('messagesHistory', mes.data);
    } else {
      console.log(mes.data)
      console.log(this.storedUser.name)
      mes.data.isMine = this.storedUser.name === mes.data.author ? true : false;
      this.push('messagesHistory', mes.data)
    }

    this._scrollDown();
  }

  _scrollDown() {
    afterNextRender(this, () => {
      this.$.scrollableDiv.scrollTop = this.$.scrollableDiv.scrollHeight;
    });
  }

  logOut() {
    this.storedUser = {}
    this._connection.close();
    this.dispatchEvent(new CustomEvent("user-is-logged-out"));

  }

  establishConnection() {
    this._connection = new WebSocket("ws://127.0.0.1:1337");
    this._connection.onopen = this._onOpen.bind(this);
    this._connection.onmessage = this._onMessage.bind(this);
    this._connection.onerror = this._onError.bind(this);
    this._connection.onclose = this._onClose.bind(this);
    this.set('messagesHistory', []);
  }

  toggleLefttMenu() {
    this.$.drawer.toggle();
  }
}

window.customElements.define(PolymerchatApp.is, PolymerchatApp);
