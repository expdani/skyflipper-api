import { Inventory } from "../../Entities/Inventory";
import { ErrorKeys } from "../../Utils/errors";

export async function getInventory(user_id: string) {
  const inventory = await Inventory.findOne({
    user_id,
  });

  if (inventory) return inventory;
  else return await initiateInventory(user_id);
}

export async function initiateInventory(user_id: string) {
  await Inventory.insert({
    user_id,
    inventory: { items: [] },
  });

  return await Inventory.findOne({
    user_id,
  });
}

export async function addItemToInventory(
  user_id: string,
  item: string,
  amount?: number
) {
  if (!amount) amount = 1;

  // Make sure item is in lowercase
  const filterItem = item.toLowerCase();

  // Check if the user has an inventory, else create it.
  const inventoryObj = await getInventory(user_id);

  if (!inventoryObj) return;
  const inventory = JSON.parse(JSON.stringify(inventoryObj.inventory));

  // Create an array if the inventory has no items yet.
  if (!inventory.items) {
    inventory.items = [];
  }

  // Update the amount if the item is in the inventory already.
  let currentItem;
  if ((currentItem = inventory.items.find((x: { id: any }) => x.id === item))) {
    if (currentItem.amount + amount < 0)
      return new Error(ErrorKeys.NOT_ENOUGH_ITEMS);
    if (currentItem.amount + amount > 0) {
      currentItem.amount = currentItem.amount + amount;
    } else {
      inventory.items = inventory.items.filter(
        (x: { id: any }) => x.id != filterItem
      );
    }
  } else {
    if (amount < 0) return new Error(ErrorKeys.NOT_ENOUGH_ITEMS);
    inventory.items.push({
      id: filterItem,
      amount: amount,
    });
  }

  await Inventory.update({ user_id }, { inventory });

  return getInventory(user_id);
}

/**
 * Get a specific item from the user's inventory.
 */
export async function getUserItem(user_id: string, name: string) {
  const inv: any = await getInventory(user_id);
  const invItem = await inv.inventory.items.find(
    (item: any) => item.id === name || item.name === name
  );

  return invItem;
}
