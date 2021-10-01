import { getArrivals } from "./arrivals";
import { getBags } from "./bags";
import { getFitness } from "./fitness";
import { getHousehold } from "./household";
import { getKitchen } from "./kitchen";
import { getLadies } from "./ladies";

const storeItems = [
  ...getArrivals(),
  ...getBags(),
  ...getFitness(),
  ...getHousehold(),
  ...getKitchen(),
  ...getLadies(),
];

export function getStoreItems() {
  return storeItems;
}
