import Driver from '../classes/Driver.js';
import GossipCalculator from '../classes/GossipCalculator.js';

const drivers = [
  new Driver([3, 1, 2, 3]),
  new Driver([3, 2, 3, 1]),
  new Driver([4, 2, 3, 4, 5]),
];
const AllGossips = new GossipCalculator(drivers);
console.log(
  `after, ${AllGossips.calculateMinutesToShareAllGossips()}, all gossips are shared with all drivers`
);
