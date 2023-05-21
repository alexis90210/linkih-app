import RNSecureStorage, {ACCESSIBLE} from 'rn-secure-storage';

let secureStorage = {
  setKey: async (key: string, value: any) => {
    return await RNSecureStorage.set(key, value, {
      accessible: ACCESSIBLE.WHEN_UNLOCKED,
    });
  },

  getKey: async (key: string) => {
    return await RNSecureStorage.get(key);
  },

  removeKey: async (key: string) => {
    return await RNSecureStorage.remove(key);
  },

  keyExists: async (key: string) => {
    return await RNSecureStorage.exists(key);
  },
};
export default secureStorage;
