import { CURRENCY_TYPE } from ".";
import { Currency } from "../../Entities/Currency";

export async function initiateCurrency(
  user_id: string,
  type?: CURRENCY_TYPE,
  amount?: number
) {
  type === CURRENCY_TYPE.BANK
    ? await Currency.insert({
        user_id,
        bank: amount || 0,
        wallet: 0,
      })
    : await Currency.insert({
        user_id,
        bank: 0,
        wallet: amount || 0,
      });

  return await Currency.findOne({
    user_id,
  });
}

export async function addToBank(user_id: string, amount: number) {
  const currency = await Currency.findOne({
    user_id,
  });

  if (currency) {
    await Currency.update({ user_id }, { bank: currency.bank + amount });
    return await Currency.findOne({
      user_id,
    });
  } else return initiateCurrency(user_id, CURRENCY_TYPE.BANK, amount);
}

export async function addToWallet(user_id: string, amount: number) {
  const currency = await Currency.findOne({
    user_id,
  });

  if (currency) {
    await Currency.update({ user_id }, { wallet: currency.wallet + amount });
    return await Currency.findOne({
      user_id,
    });
  } else return initiateCurrency(user_id, CURRENCY_TYPE.WALLET, amount);
}

export async function getUserCurrency(user_id: string) {
  const currency = await Currency.findOne({
    user_id,
  });

  if (currency) {
    return await Currency.findOne({
      user_id,
    });
  } else return initiateCurrency(user_id);
}
