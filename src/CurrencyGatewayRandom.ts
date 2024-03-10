import Currencies from "./Currencies";
import CurrencyGateway from "./CurrencyGeteway";

export default class CurrencyGatewayRandom implements CurrencyGateway {
  async getCurrencies() {
    const currencies = new Currencies();
    currencies.addCurrency("USD", 3);
    currencies.addCurrency("BRL", 1);
    return currencies;
  }
}
