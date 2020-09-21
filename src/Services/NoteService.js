class NoteService {
  constructor(filename) {
    this.filename = filename;
    this.json = require('../data/annotations.json');
  }

  getAnnotations() {
    return this.json.annotations;
  }

  getAIAnnotations() {
    return this.json['ai-annotations'];
  }
}

export let noteService = new NoteService('../data/annotations.json');
