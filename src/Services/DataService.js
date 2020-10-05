class DataService {
  constructor(filename) {
    this.filename = filename;
    this.json = require("../data/data.json");
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
      return "ERROR";
    }
    if (end < 0 || end > this.getDuration()) {
      return "ERROR";
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
      return "ERROR";
    }
    if (end < 0 || end > this.getDuration()) {
      return "ERROR";
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
      return "ERROR";
    }
    if (end < 0 || end > this.getDuration()) {
      return "ERROR";
    }
    let samples = this.getSamplesByChannel(channel);
    let channelSamples = samples.slice(
      Math.round(this.getSampleRate() * start),
      Math.round(this.getSampleRate() * end)
    );
    return channelSamples;
  }
}

export let dataService = new DataService("../data/data.json");
