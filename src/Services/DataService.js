class DataService {
  constructor(filename) {
    this.filename = filename;
    this.json = require('../Components/data.json');
    console.log('Hello');
    console.log(filename);
    console.log(this.json);
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
console.log(__dirname);
export let dataService = new DataService('res/data.json');
