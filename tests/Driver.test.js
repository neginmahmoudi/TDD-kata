import Driver from '../classes/Driver.js';

describe("Driver", () => {
  let driver1;
  let driver2;

  beforeEach(() => {
    const route = ["A", "B", "C"];
    driver1 = new Driver(route);
    driver2 = new Driver(route);
  });
  
  describe("getCurrentStop", () => {
    it("should return the current stop of the driver", () => {
      expect(driver1.getCurrentStop()).toEqual("A");
    });
  });

  describe("gossipWith", () => {
    it("should add the gossips of the other driver to the current driver", () => {
      driver2.gossips.add("new gossip");
      driver1.gossipWith(driver2);
      expect(driver1.gossips.has("new gossip")).toBe(true);
    });
  });

  describe("moveToNextStop", () => {
    it("should move the driver to the next stop", () => {
      driver1.moveToNextStop();
      expect(driver1.getCurrentStop()).toEqual("B");
    });
    it("should move to the first stop when the driver is at the last stop", () => {
      const driver = new Driver(["A", "B", "C"]);
      driver.currentStopIndex = 2;

      driver.moveToNextStop();

      expect(driver.currentStopIndex).toBe(0);
    });
  });
});
