import { ItemNames } from "./constants";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateItem(item: Item) {
    if (item.name != ItemNames.AGED_BRIE && item.name != ItemNames.BACKSTAGE_PASS) {
      if (item.quality > 0) {
        if (item.name != ItemNames.SULFURAS) {
          item.quality = item.quality - 1
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1
        if (item.name == ItemNames.BACKSTAGE_PASS) {
          if (item.sellIn < 11) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1
            }
          }
        }
      }
    }

    if (item.name != ItemNames.SULFURAS) {
      item.sellIn = item.sellIn - 1;
    }

    if (item.sellIn < 0) {
      if (item.name != ItemNames.AGED_BRIE) {
        if (item.name != ItemNames.BACKSTAGE_PASS) {
          if (item.quality > 0) {
            if (item.name != ItemNames.SULFURAS) {
              item.quality = item.quality - 1
            }
          }
        } else {
          item.quality = 0
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1
        }
      }
    }
  }

  updateQuality() {
    for (const item of this.items) {
     this.updateItem(item);
    }

    return this.items;
  }
}
