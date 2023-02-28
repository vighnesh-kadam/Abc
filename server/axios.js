const axios = require('axios');

async function doPostRequest() {

    let payload = { id: "63fcba70e3e4d5170ff3f084", reply:"herfgfge we go" };

    let res = await axios.post('http://localhost:5000/listings/recordSwipe', payload);

    let data = res.data;
    console.log(data);
}

doPostRequest();