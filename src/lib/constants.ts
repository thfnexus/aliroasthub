export const CONTACT_INFO = {
    whatsapp: "923414270742",
    whatsappLink: "https://wa.me/923414270742",
    email: "help@aliroasthub.com",
    phone: "+92 341 4270742",
};

export const getWhatsAppLink = (message: string) => {
    return `${CONTACT_INFO.whatsappLink}?text=${encodeURIComponent(message)}`;
};
