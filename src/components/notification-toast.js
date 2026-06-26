import { LitElement, html, css } from 'lit';

export class NotificationToast extends LitElement {

    static properties = {
        message: { type: String },
        type: { type: String },
        duration: { type: Number },
        fading: { type: Boolean, reflect: true },
        closable: { type: Boolean }
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            .toast {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                padding: 12px 20px;
                border-radius: 6px;
                color: white;
                font-family: sans-serif;
                font-size: 14px;
                margin-bottom: 8px;
                min-width: 260px;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-6px); }
                to   { opacity: 1; transform: translateY(0); }
            }

            :host([fading]) .toast {
                opacity: 0;
            }

            .toast.success { background-color: #4caf50; }
            .toast.error   { background-color: #f44336; }
            .toast.warning { background-color: #ff9800; }
            .toast.info    { background-color: #2196f3; }

            .close-btn {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 14px;
                padding: 0;
                opacity: 0.8;
                transition: opacity 0.2s;
            }

            .close-btn:hover {
                opacity: 1;
            }
        `
    ];

    constructor() {
        super();
        this.message = '';
        this.type = 'info';
        this.duration = 3000;
        this.fading = false;
        this.closable = true;
    }

    render() {
        return html`
            <div class="toast ${this.type}">
                <span>${this.message}</span>
                ${this.closable ? html`
                    <button class="close-btn" @click=${this._close}>✕</button>
      ` : ''}
            </div>
        `;
    }

    _close() {
        console.log('close clicked');
        this.dispatchEvent(new CustomEvent('toast-close', { bubbles: true, composed: true }));
    }
}
customElements.define('notification-toast', NotificationToast);
