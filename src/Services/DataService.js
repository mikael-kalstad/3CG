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

  getSampleLength() {
    return this.json.samples.I.length;
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

  getNumberOfSamples() {
    return this.json.samples.length;
  }

  getSamplesInTimeframe(start, end) {
    if (start < 0 || start > this.getDuration()) {
      return 'ERROR';
    }
    if (end < 0 || end > this.getDuration()) {
      return 'ERROR';
    }
    let samples = this.getSamples();
    let sampleKeys = this.getChannelNamesArray();
    let channelSamples = [];
    for (let i in sampleKeys) {
      channelSamples[i] = samples[sampleKeys[i]].slice(
        Math.round(this.getSampleRate() * start),
        Math.round(this.getSampleRate() * end)
      );
    }
    return channelSamples;
  }

  getPointsNearestTime(time) {
    let index = Math.round(this.getSampleRate() * time);
    let points = [];
    let samples = this.getSamples();
    let sampleKeys = this.getChannelNamesArray();
    for (let i in sampleKeys) {
      points.push(samples[sampleKeys[i]][index]);
    }
    return points;
  }

  getNumOfSamplesInTimeframe(start, end) {
    if (start < 0 || start > this.getDuration()) {
      return 'ERROR';
    }
    if (end < 0 || end > this.getDuration()) {
      return 'ERROR';
    }
    return (
      Math.round(this.getSampleRate() * end) -
      Math.round(this.getSampleRate() * start)
    );
  }

  getSamplesByChannel(channel) {
    return this.json.samples[channel];
  }

  getSamplesByChannelInTimeframe(channel, start, end) {
    if (start < 0 || start > this.getDuration()) {
      return 'ERROR';
    }
    if (end < 0 || end > this.getDuration()) {
      return 'ERROR';
    }
    let samples = this.getSamplesByChannel(channel);
    let channelSamples = samples.slice(
      Math.round(this.getSampleRate() * start),
      Math.round(this.getSampleRate() * end)
    );
    return channelSamples;
  }

  formatDataToPoints = () => {
    let data = this.getJSON();
    console.log('data', data);
    let points = [];

    // Samples contains relevant point data
    let samples = data['samples'];

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

        channelPoints.push([
          i,
          channelData[i],
          -channel * 10 + (10 * (samplesKeys.length - 1)) / 2,
        ]);
      }

      points.push(channelPoints);
    }

    return points;
  };
}

export let dataService = new DataService('../data/data.json');
