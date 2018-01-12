/* eslint-disable no-console */

class StorageService {
  constructor() {
    if (window.localStorage) {
      this.localStorage = window.localStorage;
    } else {
      console.error('No localStorage support');
    }
  }

  getIdentities() {
    if (!this.localStorage) return [];
    try {
      const identities = this.localStorage.getItem('identities');
      if (!identities) return [];
      return JSON.parse(identities);
    } catch (error) {
      console.error('Cannot read identities', error);
      return [];
    }
  }

  addIdentity(identity) {
    const identities = this.getIdentities();
    identities.push(identity);
    if (this.localStorage) {
      try {
        this.localStorage.setItem('identities', JSON.stringify(identities));
      } catch (error) {
        console.error('Cannot save identities', error);
      }
    }
  }
}

export default new StorageService();
