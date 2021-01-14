import LocalStorageDB from '../localStorage/Storage';
import { KEYS } from '../const/storageKeys';
import { ROUTERS } from '../const/routers';

const storage = new LocalStorageDB(KEYS.IT);

export default function saveData(key, value, currentRoute) {
  const saveKey = currentRoute === ROUTERS.HOME
    ? KEYS.MAIN
    : KEYS.SAVE;
  let save = storage.fetch(saveKey);
  if (save) {
    save = {
      ...save,
      [key]: value,
    };
  } else {
    const defaultObj = {
      route: currentRoute,
      name: null,
      lastName: null,
      email: null,
      fullName: null,
      cardNumber: null,
      expiryDate: null,
      accountName: null,
      accountNumber: null,
      bsb: null,
      currentContact: null,
      currentMethod: null,
      amount: null,
    };
    save = {
      ...defaultObj,
      [key]: value,
    };
  }
  storage.save(saveKey, save);
}
