export function updateObjectByKey (key, value, obj) {
    if (!obj) throw new Error('Please pass the object where the key needs to be changed as third argument');
    var newObj = { ...obj }
    const keyChain = key.split(".")
    const currentKey = keyChain[0]
    const lastKey = keyChain.length === 1
    var arrIndex = -1;
    var arrKey = null;
    if (currentKey.includes("[") && currentKey.includes("]")) {
        arrKey = currentKey.split("[")[0]
        arrIndex = parseInt(currentKey.split("[")[1].slice(0, -1));
    }
    if (keyChain.length === 0) return newObj
    if (newObj instanceof Object) {
        if (currentKey in newObj || arrKey in newObj) {
            if (arrIndex !== -1 && arrKey !== null) {
                if (lastKey) {
                    newObj[arrKey] = newObj[arrKey].map((o, i) => i === arrIndex ? value : o)
                    return newObj
                } 
                newObj = { 
                            ...newObj, 
                            [arrKey]: updateByKey(keyChain.slice(1).join("."), value, newObj[arrKey][arrIndex]
                            )
                        
                }
            } else {
                if (lastKey) { 
                    newObj[currentKey] = value
                    return newObj
                }

                newObj = { ... newObj, [currentKey]: updateByKey(keyChain.slice(1).join("."), value, newObj[currentKey]) }
                
            }
        }
        return newObj
    } else {
        return newObj
    }
}