const express = require('express');

const createRouter = function(data){
const router = express.Router();


//GET ALL Data
    router.get('/', (req,res) => {
        //when hit 'api/countries' return Data
        res.json(data);
    })

return router;
};
module.exports = createRouter;