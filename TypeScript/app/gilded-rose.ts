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


  hasMaxQuality(item) {
    return item.quality === 50;
  }

  updateItem(item: Item) {
    switch (item.name) {
      case ItemNames.AGED_BRIE:
        item.sellIn = item.sellIn - 1;

        if (!this.hasMaxQuality(item)) {
          item.quality = item.quality + 1;
        }

        if(!this.hasMaxQuality(item) && item.sellIn < 0) {
          item.quality = item.quality + 1
        }

        break;
      case ItemNames.BACKSTAGE_PASS:
        if (!this.hasMaxQuality(item)) {
          item.quality = item.quality + 1
        }

        if (item.sellIn < 11) {
          if (!this.hasMaxQuality(item)) {
            item.quality = item.quality + 1
          }
        }
        if (item.sellIn < 6) {
          if (!this.hasMaxQuality(item)) {
            item.quality = item.quality + 1
          }
        }
        item.sellIn = item.sellIn - 1;

        if(item.sellIn < 0) {
          item.quality = 0
        }

        break;
      case ItemNames.SULFURAS:
        break;
      default:
        if (item.quality > 0) {
          if (item.name != ItemNames.SULFURAS) {
            item.quality = item.quality - 1
          }
        }
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0 && item.quality > 0) {
          item.quality = item.quality - 1
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
