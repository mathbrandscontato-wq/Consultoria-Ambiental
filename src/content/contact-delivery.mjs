/** Envio de teste autorizado por Matheus; recebimento depende da confirmação pela destinatária. */
export const contactDelivery = Object.freeze({
  enabled: true,
  verification: 'recipient-activated-by-client',
  deliveryVerified: false,
  recipient: 'lara@ykeizumi.com.br',
  endpoint: 'https://formsubmit.co/lara@ykeizumi.com.br',
});
