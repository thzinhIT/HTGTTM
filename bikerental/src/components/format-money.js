export const rxFormatMoney = /\B(?=(\d{3})+(?!\d))/g;

export default function formatMoney(value) {
  return value.toString().replace(rxFormatMoney, ",");
}
