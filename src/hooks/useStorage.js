import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getItem = async () => {
    try {
      const password = await AsyncStorage.getItem("Key");

      return JSON.parse(password) || [];
    } catch (error) {
      console.log("Erro ao buscar, aqui ", error);
      return [];
    }
  };

  const saveItem = async (Key, value) => {
    try {
      let passwords = await getItem(Key);

      passwords.push(value);
      await AsyncStorage.setItem("Key", JSON.stringify(passwords));
    } catch (error) {
      console.log("Erro ao salvar ", error);
    }
  };

  const removeItem = async (Key, item) => {
    try {
      let passwords = await getItem(Key);

      let myPasswords = passwords.filter((password) => {
        return password !== item;
      });

      await AsyncStorage.setItem(Key, JSON.stringify(myPasswords));
      return myPasswords;
    } catch (error) {
      console.log("Erro ao Deletar ", error);
    }
  };
  return { getItem, saveItem, removeItem };
};

export default useStorage;
