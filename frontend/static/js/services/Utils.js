export default class Utils {
  constructor() {
    this.storage = window.localStorage;
  }

  removeStorageItem(item) {
    return this.storage.removeItem(item);
  }

  getStorageItem(item) {
    return this.storage.getItem(item);
  }

  setStorageItem(key, value) {
    this.storage.setItem(key, value);
  }

  updateStorageItem(key, value) {
    let existingItems = this.getStorageItem(key);
    if (existingItems == null) existingItems = [];

    existingItems.add(value);

    this.setStorageItem(key, existingItems);
  }

  parse(item) {
    return JSON.parse(item ?? "");
  }

  parseJwt(token) {
    if (!token) throw Error('Token cannot be empty');
    // console.log(token);
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return parse(jsonPayload);
  };
}