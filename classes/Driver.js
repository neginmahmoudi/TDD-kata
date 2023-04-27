export default class Driver {
  constructor(route) {
    this.route = route;
    this.currentStopIndex = 0;
    this.gossips = new Set([Math.random().toString(36).substring(10)]);
  }
  getCurrentStop() {
    return this.route[this.currentStopIndex];
  }

  gossipWith(driver) {
    driver.gossips.forEach((gossip) => {
      this.gossips.add(gossip);
    });
  }
  moveToNextStop() {
    return (this.currentStopIndex =
      (this.currentStopIndex + 1) % this.route.length);
      
  }
}
