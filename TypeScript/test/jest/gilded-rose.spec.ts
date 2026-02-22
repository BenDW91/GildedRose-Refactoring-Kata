import { ItemName } from '@/constants';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });

  it('defaults to an empty item list', () => {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(items).toEqual([]);
  });

  describe('Normal items', () => {
    it('degrades quality by 1 before sell date', () => {
      const gildedRose = new GildedRose([new Item('foo', 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(9);
      expect(items[0].sellIn).toBe(4);
    });

    it('degrades quality by 2 after sell date has passed', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
      expect(items[0].sellIn).toBe(-1);
    });

    it('quality never goes below 0 before sell date', () => {
      const gildedRose = new GildedRose([new Item('foo', 5, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it('quality never goes below 0 after sell date', () => {
      const gildedRose = new GildedRose([new Item('foo', 0, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe('Aged Brie', () => {
    it('increases quality by 1 before sell date', () => {
      const gildedRose = new GildedRose([new Item(ItemName.AGED_BRIE, 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
    });

    it('increases quality by 2 after sell date has passed', () => {
      const gildedRose = new GildedRose([new Item(ItemName.AGED_BRIE, 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12);
    });

    it('quality never exceeds 50', () => {
      const gildedRose = new GildedRose([new Item(ItemName.AGED_BRIE, 5, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });

    it('quality never exceeds 50 after sell date', () => {
      const gildedRose = new GildedRose([new Item(ItemName.AGED_BRIE, 0, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Sulfuras', () => {
    it('never changes quality', () => {
      const gildedRose = new GildedRose([new Item(ItemName.SULFURAS, 5, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
    });

    it('never changes sellIn', () => {
      const gildedRose = new GildedRose([new Item(ItemName.SULFURAS, 5, 80)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(5);
    });
  });

  describe('Backstage passes', () => {
    it('increases quality by 1 when more than 10 days remain', () => {
      const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASS, 15, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
    });

    it('increases quality by 2 when 10 days or fewer remain', () => {
      const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASS, 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12);
    });

    it('increases quality by 2 when exactly 6 days remain', () => {
      const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASS, 6, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12);
    });

    it('increases quality by 3 when 5 days or fewer remain', () => {
      const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASS, 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13);
    });

    it('increases quality by 3 when 1 day remains', () => {
      const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASS, 1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13);
    });

    it('drops quality to 0 after the concert', () => {
      const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASS, 0, 30)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it('quality never exceeds 50', () => {
      const gildedRose = new GildedRose([new Item(ItemName.BACKSTAGE_PASS, 5, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe('Conjured items', () => {
    it('degrades quality by 2 before sell date', () => {
      const gildedRose = new GildedRose([new Item(ItemName.CONJURED, 5, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
      expect(items[0].sellIn).toBe(4);
    });

    it('degrades quality by 4 after sell date has passed', () => {
      const gildedRose = new GildedRose([new Item(ItemName.CONJURED, 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(6);
      expect(items[0].sellIn).toBe(-1);
    });

    it('quality never goes below 0 before sell date', () => {
      const gildedRose = new GildedRose([new Item(ItemName.CONJURED, 5, 1)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });

    it('quality never goes below 0 after sell date', () => {
      const gildedRose = new GildedRose([new Item(ItemName.CONJURED, 0, 3)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });
});
