class IdMapping {
  constructor() {
    this.intIds = new Map();
  }

  static genId() {
    return new Date().getTime() + Math.floor(Math.random() * 1000);
  }

  tryIntifyId(payload) {
    if (!payload.id) {
      payload.id = IdMapping.genId();
      return;
    }
    if (typeof payload.id !== 'number') {
      const newId = IdMapping.genId();
      this.intIds.set(newId, payload.id);
      payload.id = newId;
    }
  }

  tryRestoreId(payload) {
    const id = this.tryPopId(payload.id);
    if (id) {
      payload.id = id;
    }
  }

  tryPopId(id) {
    const originId = this.intIds.get(id);
    if (originId) {
      this.intIds.delete(id);
    }
    return originId;
  }
}

module.exports = IdMapping;
