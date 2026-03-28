import { CONFIG } from './config.js';
import { Attribution } from './attribution.js';
import { Billing } from './billing.js';

/**
 * order-engine: handles checkout logic, validation and whatsapp payload generation.
 */
export const OrderEngine = {
    generateWhatsAppUrl(data) {
        const teaActive = this.isTea(data.product);
        const utmPayload = Attribution.getSuffix();
        const currency = Billing.getCurrency();

        // 1. Human Readable Section (What the client sees/sends)
        let fullMessage = `✨ *NUEVO PEDIDO STAYFIT* ✨\n\n`;
        fullMessage += `👋 Hola, quiero iniciar mi tratamiento. Aquí están mis datos:\n`;
        fullMessage += `👤 *Nombre:* ${data.name}\n`;
        fullMessage += `📍 *Ciudad:* ${data.city}\n`;
        fullMessage += `🏘️ *Dirección:* ${data.address}\n`;
        fullMessage += `📦 *Producto:* ${data.product}\n`;
        if (data.flavor) fullMessage += `🍵 *Sabor:* ${data.flavor}\n`;
        fullMessage += `💰 *Total a pagar:* ${data.totalFormatted}\n\n`;
        fullMessage += `🚚 *Entrega:* 2 a 4 días hábiles.\n`;
        fullMessage += `⚠️ *Nota:* Pago contra entrega solo en Villavicencio/Yopal. Otros destinos requieren pago previo.\n\n`;
        fullMessage += `Quedo atento(a) a las instrucciones de pago. 🚀\n`;
        
        // 2. Machine Readable Section (Strictly for n8n AI Agent Parsing)
        fullMessage += `\n--- 🤖 NO BORRAR ESTA SECCIÓN ---\n`;
        fullMessage += `[SYSTEM_DATA_START]\n`;
        fullMessage += `INTENT=NEW_ORDER\n`;
        fullMessage += `CUSTOMER_NAME=${data.name}\n`;
        fullMessage += `CUSTOMER_PHONE=${data.phone}\n`;
        fullMessage += `CUSTOMER_CITY=${data.city}\n`;
        fullMessage += `PRODUCT_NAME=${data.product}\n`;
        if (data.flavor) fullMessage += `PRODUCT_FLAVOR=${data.flavor}\n`;
        fullMessage += `PRICE_TOTAL=${data.totalFormatted}\n`;
        fullMessage += `CURRENCY_CODE=${currency}\n`;
        fullMessage += `${utmPayload}\n`;
        fullMessage += `[SYSTEM_DATA_END]`;
        
        return `https://wa.me/${CONFIG.WHATSAPP.PHONE}?text=${encodeURIComponent(fullMessage)}`;
    },

    isTea(name) {
        return name && (name.toLowerCase().includes('tea') || name.toLowerCase().includes('té') || name.toLowerCase().includes('te '));
    }
};
