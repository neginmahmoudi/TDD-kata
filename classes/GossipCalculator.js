export default class GossipCalculator {
  constructor(drivers) {
    this.drivers = drivers;
  }

  shareGossips() {
    for (let i = 0; i < this.drivers.length; i++) {
      for (let j = i + 1; j < this.drivers.length; j++) {
        if (
          this.drivers[i].getCurrentStop() === this.drivers[j].getCurrentStop()
        ) {
          this.drivers[i].gossipWith(this.drivers[j]);
          this.drivers[j].gossipWith(this.drivers[i]);
        }
      }
    }
  }

  moveAllDrivers() {
    for (let i = 0; i < this.drivers.length; i++) {
      this.drivers[i].moveToNextStop();
    }
  }

  hasAllGossips() {
    return this.drivers.every(
      (driver) => driver.gossips.size === this.drivers.length
    );
  }

  calculateMinutesToShareAllGossips() {
    let minutes = 0;
    while (minutes < 480) {
      this.shareGossips();
      this.moveAllDrivers();
      minutes++;
      if (this.hasAllGossips()) {
        return minutes;
      }
    }
    return "never";
  }
}
