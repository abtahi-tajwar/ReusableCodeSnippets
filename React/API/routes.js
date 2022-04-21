const base = 'http://localhost:8000'


export const routes = {
}

export const callApi = async (url) => {
    let data = null
    try {
        let res = await fetch(url, {
            headers: {
                "Authorization": authToken
               
            }
        })
        const contentType = res.headers.get("content-type");
        
        if(contentType.indexOf("application/json") === -1) {
            data = await res.text()
        } else {
            data = await res.json()
        }
        return data
    } catch (e) {
        return e
    }    
}
export const postValue = async (url, data) => {
    let result = null
    console.log(JSON.parse(data))
    try {
        let res =  await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": authToken
            },
            body: data
        })
        
        const contentType = res.headers.get("content-type");
        
        if(contentType.indexOf("application/json") === -1) {
            result = await res.text()
        } else {
            result = await res.json()
        }
        return result
    } catch (e) {
        console.log(e)
    }
}
export const postFormValue = async (url, data) => {
    console.log(data)
    let result = null
    let formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
        console.log(key, value)
        formData.append(key, value)
    }

    try {
        let res =  await fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": authToken
            },
            body: formData
        })
        
        const contentType = res.headers.get("content-type");
        
        if(contentType.indexOf("application/json") === -1) {
            result = await res.text()
        } else {
            result = await res.json()
        }
        return result
    } catch (e) {
        return e
    }
}
export const deleteReq = async (url) => {
    let data = null;
    try {
        let res = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Authorization": authToken
            }
        })
        const contentType = res.headers.get("content-type");

        if(contentType.indexOf("application/json") === -1) {
            data = await res.text()
        } else {
            data = await res.json()
        }
        
        return data
    } catch (e) {
        return e
    }   
}