const { response } = require('express');
const FB = require('fb');

//const ACCESS_TOKEN =  'EAAV3MtWh5XwBAHpIYlYlhjcvlgnVOXjcF8PXPEOfWf8lpEOkftXm8khe23thKoRodZAZAmXntQ6J4JVBzlfewXa8XQnVBfpm0EYZACiilLNJicVDTRyUGRYpZAk3Q2IsJzYgC3b5gdLUhvZBf80zPzXMbKnCkwPr42U0VVObQOaKbJOAsZCY6EwLciZBmQTE4Adngo079XphQ5yt8EzKxNeYCmdH1JGLZCZBwyzHMwk70JIJOzbdeViAR66qg30tFF3MZD';
const ACCESS_TOKEN = 'EAAI6bcBHj5sBAKS8ghf6Gl1BPa0W0Kx8rvKmTOvKcG2UN9Myk8NAf6NPZBwiGAJGRVAaz3Cik5HRpamJHJju8WFfMjXUtoHWKz3qF4Ok2vUhtkayFAZBHXzP2FIPqqjsWlzYvaG9TmPEcIrApNW3j0WxCvBCwxxU5js0iJsmZCf5xZBmi86EBO78J5nL1ZCjCHcw94qDt3HzfoNaGvMrPeRhA6PzZBlfyhQMjFj0ZB6x7GdCyO05rG4FdRF1T0ZCZBQMZD';

//const ACCESS_TOKEN = '627193005182875|AbyDMtaTgWAAPUNh6qvuC8RnsNw';

async function getInfo(){
    FB.setAccessToken(ACCESS_TOKEN);
    FB.api('/1306676879447808', function(response) {
        console.log(response);
      });
}

async function getMeAccounts(){
    FB.setAccessToken(ACCESS_TOKEN);
    FB.api('/me/accounts')
    .then((response)=>{
        console.log(response);
        return response;
    })
    .catch((error)=>{
        console.log('error occurred: ' + error.message)
        return error.message;
    });

}

async function getMe(){
    FB.setAccessToken(ACCESS_TOKEN);
    FB.api('/me', {fields: 'last_name'})
    .then((response)=>{
        console.log(response);
        return response;
    })
    .catch((error)=>{
        console.log('error occurred: ' + error.message)
        return error.message;
    });

}

async function showFacebook(){
    FB.setAccessToken(ACCESS_TOKEN);
    //console.log(FB);
    await FB.api('/1306676879447808/feed', 'POST',
        { "message": "Hay un gran poder en conocer a tu enemigo." },
    )
    .then((response)=>{
        console.log('successfully posted to page!');
        console.log(response);
        return response;
    })
    .catch((error)=>{
        console.log('error occurred: ' + error.message)
        return error.message;
    });
}

/*
        function (response) {
            console.log(response);
            if (response.error) {
                console.log('error occurred: ' + response.error.message)
                return response.error.message;
            }            
            console.log('successfully posted to page!');
            console.log(response);
            return response;
        }

*/
module.exports = {
    showFacebook:
    function (){
        return showFacebook();
    },
    getMe:
    function (){
        return getMe();
    },
    getInfo:
    function (){
        return getInfo();
    },
    getMeAccounts:
    function (){
        return getMeAccounts();
    },
}

/*var Facebook = require('facebook-node-sdk');

var facebook = new Facebook({ appID: '1538435099780476', secret: '4188d2efad7d0fc7d0e0feac21b3556a' });

// instantiating an object
async function showFacebook(){
    await facebook.api('/jcdaguila', function(err, data) {
        console.log(data); // => { id: ... }
        return data;
      });
}

module.exports = {
    showFacebook:
    function (){
        return showFacebook();
    },
}*/