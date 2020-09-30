const onsetToMillis = (onset) => {
  let split = onset.split(':');
  let millis = Number(split[0]) * 3.6 * Math.pow(10, 6);
  millis += Number(split[1]) * 60000;
  millis += Number(split[2]) * 1000;
  return millis;
};

class AnnotationService {
  constructor(filename) {
    this.filename = filename;
    this.json = require('../data/annotations.json');
    this.annotations = this.json.map((obj) => {
      let start = onsetToMillis(obj.onset);
      let newObj = {
        start,
        end: start + obj.duration * 1000,
        code: obj.code,
        text: obj.text,
      };
      return newObj;
    });
  }

  getAnnotations() {
    return this.annotations;
  }

  getAnnotationsOnlyInTimeframe(start, end) {
    let result = [];
    start = start * 1000;
    end = end * 1000;
    for (let i in this.annotations) {
      let ann = this.annotations[i];
      if (ann.start >= start && ann.end <= end) {
        result.push(ann);
      }
    }
    return result;
  }

  getAnnotationsInTimeframe(start, end) {
    let result = [];
    start = start * 1000;
    end = end * 1000;
    for (let i in this.annotations) {
      let ann = this.annotations[i];
      if (ann.start <= end && start <= ann.end) {
        result.push(ann);
      }
    }
    return result;
  }
}

export let annotationService = new AnnotationService(
  '../data/annotations.json'
);
