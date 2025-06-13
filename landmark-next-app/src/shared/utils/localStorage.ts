export const localStorage = {

  getValue: (key: string) => {
    const item = window.localStorage.getItem(key);

    // string versions of null and undefined 
    // since values stored as strings in local storage
    if (item === null || item === undefined || 
      item === "null" || item === "undefined")
    {
      return null;
    }
    try {
      const data = JSON.parse(item);
      return data;
    }
    catch (e) {
      return null;
    }
  },

  setValue: (key: string, value: any) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  
  deleteEntry: (key: string) => {
    window.localStorage.removeItem(key);
  }
}
