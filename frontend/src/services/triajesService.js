import { API_URL } from "../constants";

export const postTriaje = async (object) => {
    const url = `${API_URL}/triajes`;
    const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  });
    const resp_data = await res.json()
    return resp_data;
}


export const getTriajes = async () => {
  const url = `${API_URL}/triajes`;
  const res = await fetch(url)
  const jsonData = await res.json()
  console.log(jsonData);
  return jsonData
}

