import { Items } from "../../Entities/Items";
import { ErrorKeys } from "../../Utils/errors";
import { addToWallet, getUserCurrency } from "../Currency/functions";
import { addItemToInventory, getUserItem } from "../Inventory/functions";

export async function getItemShop() {
  return await Items.find({
    where: { shop: 1 },
    order: {
      price: "ASC",
    },
  });
}

export async function getItemsList(items: [string]) {
  try {
    const filter: any = [];

    items.forEach(async (item) => {
      filter.push({ id: item });
    });

    const list = await Items.find({
      where: filter,
    });

    return list;
  } catch (error) {
    console.log(error);
  }
}

export async function getItem(item: string) {
  return await Items.findOne({
    where: [{ id: item }, { name: item }],
  });
}

export async function buyItem(user_id: string, item: string, amount?: number) {
  try {
    const balance: any = await getUserCurrency(user_id);
    const shopItem: any = await getItem(item);

    if (!shopItem) return new Error(ErrorKeys.ITEM_NOT_FOUND);
    if (!balance) return new Error(ErrorKeys.NOT_ENOUGH_MONEY);
    if (!amount) amount = 1;
    if (shopItem.shop) {
      const newBalance = balance.wallet - shopItem.price * amount;
      if (newBalance >= 0) {
        await addToWallet(user_id, -(shopItem.price * amount));
        await addItemToInventory(user_id, shopItem.id, amount);
        return shopItem;
      } else return new Error(ErrorKeys.NOT_ENOUGH_MONEY);
    } else return new Error(ErrorKeys.NOT_FOR_SALE);
  } catch (err) {
    return new Error(ErrorKeys.UNKNOWN_ERROR);
  }
}

export async function sellItem(user_id: string, item: string, amount?: number) {
  try {
    const shopItem = await getItem(item);
    if (!shopItem) return new Error(ErrorKeys.ITEM_NOT_FOUND);

    const sellItem = await getUserItem(user_id, shopItem.id);
    if (!sellItem) return new Error(ErrorKeys.NOT_ENOUGH_ITEMS);
    if (!amount) amount = 1;

    if (shopItem && shopItem.price) {
      if (amount <= sellItem.amount) {
        await addItemToInventory(user_id, shopItem.id, -amount);
        await addToWallet(user_id, (shopItem.price * amount) / 2);
        return shopItem;
      } else return new Error(ErrorKeys.NOT_ENOUGH_ITEMS);
    } else return new Error(ErrorKeys.CANT_SELL);
  } catch (err) {
    return new Error(ErrorKeys.UNKNOWN_ERROR);
  }
}
