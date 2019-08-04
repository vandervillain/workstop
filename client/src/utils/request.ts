import auth from './auth';

export async function get(url: string) {
  var token = auth.getToken(),
    payload = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

  if (token) payload.headers['Authorization'] = "Bearer " + token;

  var rawResponse = await fetch(url, payload);
  return await rawResponse.json();
}

export async function post(url: string, body: any) {
  var token = auth.getToken(),
    payload = { 
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

  if (token) payload.headers['Authorization'] = "Bearer " + token;
  
  const rawResponse =  await fetch(url, payload);
  return await rawResponse.json();
}

export async function postFormData(url: string, formData: FormData) {
  var token = auth.getToken(),
    payload = { 
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
      },
      body: formData
    };

  if (token) payload.headers['Authorization'] = "Bearer " + token;
  
  return await fetch(url, payload).then(r => r.json());
}