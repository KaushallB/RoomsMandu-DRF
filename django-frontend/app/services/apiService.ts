import { resolve } from "path";

const apiService= {

    get: async function (url:string): Promise<any> {
        console.log('get', url);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response', json);

                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },

    post: async function(url:string, data:any): Promise<any> {
        console.log('POST', url, data);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`,{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(async (response) => {
                    const text = await response.text();
                    console.log('Response status:', response.status);
                    console.log('Response text:', text);
                    
                    let json;
                    try {
                        json = JSON.parse(text);
                    } catch {
                        json = { error: text };
                    }
                    
                    console.log('Parsed JSON:', json);
                    resolve(json);
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                    reject(error);
                })
        })
    }

}

export default apiService;