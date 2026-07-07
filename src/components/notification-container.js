import { LitElement, html, css } from 'lit';
import './notification-toast.js';

export class NotificationContainer extends LitElement {

    static properties = {
        notifications: { type: Array }
    }

    static styles = [
        css`
            :host {
                display: block;
            }
        `
    ];

    constructor() {
        super();
        this.notifications = [];
        this.addEventListener('toast-close', (e) => {
            console.log('toast-close recibido', e.target);
            console.log('composedPath:', e.composedPath());
            const el = e.composedPath()[0]; // e.target; // composePath para obtener el elemento que disparó el evento
            console.log('dataset:', el.dataset);
            const id = parseInt(el.dataset.id);
            this.removeNotification(id);
        });
    }

    addNotification(message, type = 'info', duration = 3000) {
        const id = Date.now();
        const fadeDuration = 500;
        this.notifications = [...this.notifications, { id, message, type, fading: false }];

        setTimeout(() => {
            this.notifications = this.notifications.map(n =>
                n.id === id ? { ...n, fading: true } : n
            );
            setTimeout(() => this.removeNotification(id), fadeDuration);
        }, duration - fadeDuration);
    }

    removeNotification(id) {
        this.notifications = this.notifications.filter(n => n.id !== id);
    }

    render() {
        return html`
            ${this.notifications.map(n => html`<notification-toast
              data-id=${n.id}
              .message=${n.message}
              .type=${n.type}
              .fading=${n.fading}
            ></notification-toast>`)}
        `;
    }
}
customElements.define('notification-container', NotificationContainer);
