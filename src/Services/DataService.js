class DataService {
  constructor(filename) {
    this.filename = filename;
    this.json = require('../data/data.json');
  }

  getJSON() {
    return this.json;
  }

  getDuration() {
    return this.json.duration;
  }

  getRecID() {
    return this.json.rec_id;
  }

  getSampleRate() {
    return this.json.sample_rate;
  }

  getChannelNamesArray() {
    return Object.keys(this.json.samples);
  }
}

export let dataService = new DataService('../data/data.json');
