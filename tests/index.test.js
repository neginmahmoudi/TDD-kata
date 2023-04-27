import Driver from '../classes/Driver.js';
import GossipCalculator from '../classes/GossipCalculator.js';

test("BusStop constructor creates instance with given drivers", () => {
  const drivers = [
    new Driver([1, 2, 3]),
    new Driver([4, 5, 6]),
    new Driver([7, 8, 9]),
  ];
  const bus = new GossipCalculator(drivers);
  expect(bus.drivers).toEqual(drivers);
});
