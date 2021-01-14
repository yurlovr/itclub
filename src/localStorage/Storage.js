export default class LocalStorageDB {
  constructor(dbPrefix) {
    this.dbPrefix = `${dbPrefix}@`;
  }

  save(key, value) {
    const _value = JSON.stringify(value);
    localStorage.setItem(this.dbPrefix + key, _value);
    return true;
  }

  fetch(key) {
    const data = localStorage.getItem(this.dbPrefix + key);
    if (data === null) return false;
    let _data = false;
    try {
      _data = JSON.parse(data);
    } catch (e) {
      console.error(e);
    }
    return _data;
  }

  remove(key) {
    localStorage.removeItem(this.dbPrefix + key);
  }
}
