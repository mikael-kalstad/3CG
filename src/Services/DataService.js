export class DataService {
  constructor(json) {
    this.json = json;
  }

  setJSON(json) {
    this.json = json;
  }

  getJSON() {
    return this.json;
  }

  getDuration() {
    return this.json.duration;
  }

  getSampleLength() {
    return this.json.samples[Object.keys(this.json.samples)[0]].length; // Getting from first object-variable
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

  getSamples() {
    return this.json.samples;
  }

  getSamplesByChannel(channel) {
    return this.json.samples[channel];
  }

  // Formats data to array with shape (channels X samplelength X dimensions), normally 12 x samplelength x 3
  formatDataToPoints = () => {
    let points = [];

    // Samples contains relevant point data
    let samples = this.getSamples();

    // Samples contains several channels with different "key"names
    let samplesKeys = Object.keys(samples);

    for (let channel in samplesKeys) {
      // Get channel data from samples
      let channelData = samples[samplesKeys[channel]];

      let channelPoints = [];

      // let MAX_NUM_OF_POINTS = 400;
      // let SCALE = 0.4;

      // MAX_NUM_OF_POINTS =
      //   MAX_NUM_OF_POINTS > channelData.length
      //     ? channelData.length
      //     : MAX_NUM_OF_POINTS;

      for (let i in channelData) {
        // if (i > MAX_NUM_OF_POINTS) break;

        channelPoints.push([Number(i), channelData[i], 0]);
      }

      points.push(channelPoints);
    }
    return points;
  };
}

let input = {};
try {
  input = require('../data/data.json');
} catch (e) {}

export let dataService = new DataService(input);
