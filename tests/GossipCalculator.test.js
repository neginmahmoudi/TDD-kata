import Driver from '../classes/Driver.js';
import GossipCalculator from '../classes/GossipCalculator.js';

describe("GossipCalculator", () => {
  let drivers;
  let gossipCalculator;

  beforeEach(() => {
    drivers = [
      new Driver(["A", "B", "C"]),
      new Driver(["C", "B", "E"]),
      new Driver(["E", "F", "G"]),
    ];
    gossipCalculator = new GossipCalculator(drivers);
  });

  describe("gossip()", () => {
    it("should gossip between two drivers when they are at the same stop", () => {
      const driver1 = drivers[0];
      const driver2 = drivers[1];
      
      gossipCalculator.moveAllDrivers();
      gossipCalculator.shareGossips();
      expect(driver1.gossips.has([...driver2.gossips][0])).toBe(true);
    });

    it("should not gossip when two drivers are at different stops", () => {
      const driver1 = drivers[0];
      const driver2 = drivers[2];

      gossipCalculator.moveAllDrivers();

      expect(driver1.gossips.has([...driver2.gossips][0])).toBe(false);
      expect(driver2.gossips.has([...driver1.gossips][0])).toBe(false);
    });
  });

  describe("drive", () => {
    it("should move drivers to the next stop", () => {
      const driver1 = drivers[0];
  
      gossipCalculator.moveAllDrivers();
      
      expect(driver1.getCurrentStop()).toEqual("B");
    });
  });

  describe("hasAllGossips", () => {
    it("should return 1 gossip for each driver when initializing ", () => {
      drivers.forEach((driver) => {
        expect(driver.gossips.size).toEqual(1);
      });
    });
    it("should return false when no drivers have all gossips", () => {
      expect(gossipCalculator.hasAllGossips()).toBe(false);
    });

    it("should return false when some drivers have all gossips", () => {
      drivers[0].gossipWith(drivers[1]);
      drivers[1].gossipWith(drivers[0]);

      expect(gossipCalculator.hasAllGossips()).toBe(false);
    });

    it("should return true when all drivers have all gossips", () => {
      drivers[0].gossipWith(drivers[1]);
      drivers[1].gossipWith(drivers[0]);

      drivers[1].gossipWith(drivers[2]);
      drivers[2].gossipWith(drivers[1]);

      drivers[0].gossipWith(drivers[2]);
      drivers[2].gossipWith(drivers[0]);

      expect(gossipCalculator.hasAllGossips()).toBe(true);
    });
  });
  describe("time calculation", () => {
    it("should calculate the minutes to share all gossips", () => {
      const driver1 = new Driver([3, 1, 2, 3]);
      const driver2 = new Driver([3, 2, 3, 1]);
      const driver3 = new Driver([4, 2, 3, 4, 5]);
      const calculator = new GossipCalculator([driver1, driver2, driver3]);
      const minutes = calculator.calculateMinutesToShareAllGossips();
      expect(minutes).toBe(5);
    });

    it("should return 'never' if all gossips cannot be shared within 8 hours", () => {
      const driver1 = new Driver([1, 2]);
      const driver2 = new Driver([3, 4]);
      const driver3 = new Driver([5, 6]);
      const calculator = new GossipCalculator([driver1, driver2, driver3]);
      const minutes = calculator.calculateMinutesToShareAllGossips();
      expect(minutes).toBe("never");
    });
  });
});
