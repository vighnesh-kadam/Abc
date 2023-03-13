const axios = require('axios');

async function doPostRequest() {

    let payload = { id: "63fe2a720bd5d2be19414530", reply:"The dffd gtg dfdf befef gbgb sun" };

    let res = await axios.post('http://localhost:3000/tweets/reply', payload);

    let data = res.data;
    console.log(data);
}

doPostRequest();