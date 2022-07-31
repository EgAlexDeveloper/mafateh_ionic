import { Storage } from '@capacitor/storage';

export const saveData = async (data: {}, name: string) => {
    await Storage.set({
        key: name,
        value: JSON.stringify(data)
    });
}


export const fetchData = async (name: string): Promise<any> => {
    const results = await Storage.get({ key: name });
    const data = JSON.parse(results.value!);

    return await data;
}