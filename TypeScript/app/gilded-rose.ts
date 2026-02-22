import { ItemName } from "./constants";

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

  private getBackstageIncrement(sellIn: number): number {
    if (sellIn < 6)  return 3;
    if (sellIn < 11) return 2;
    return 1;
  }

  updateItem(item: Item) {
    switch (item.name) {
      case ItemName.AGED_BRIE: {
        item.sellIn -= 1;

        const increment = item.sellIn < 0 ? 2 : 1;
        item.quality = Math.min(50, item.quality + increment);

        break;
      }
      case ItemName.BACKSTAGE_PASS: {
        const increment = this.getBackstageIncrement(item.sellIn);

        item.quality = Math.min(50, item.quality + increment);
        item.sellIn -= 1;

        if (item.sellIn < 0) item.quality = 0;

        break;
      }
      case ItemName.CONJURED: {
        item.sellIn -= 1;
        const decrement = item.sellIn < 0 ? 4 : 2;
        item.quality = Math.max(0, item.quality - decrement);

        break;
      }
      case ItemName.SULFURAS: {
        break;
      }
      default: {
        item.sellIn -= 1;
        const decrement = item.sellIn < 0 ? 2 : 1;
        item.quality = Math.max(0, item.quality - decrement);
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
