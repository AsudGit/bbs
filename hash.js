const crypto = require('crypto');
function getDateSign(data,eliminates){
    const sortArr = [];
    for (const key in data) {
        if(eliminates.indexOf(key)===-1){
            sortArr.push(key);
        }
    }
    sortArr.sort();
    const items = [];
    for (const key of sortArr) {
        items.push(`${key}=${data[key]}`);
    }
    const str = items.join('&');
    return crypto.createHash('md5').update(Buffer.from(str)).digest('hex');
}

let data = {startTime:1580169600000,endTime:1595894400000,timestamp:1595057668375,signature:'89ec3ec8c9bf97993b1a3af3dad67b38'};
console.info(getDateSign(data,['signature']));
