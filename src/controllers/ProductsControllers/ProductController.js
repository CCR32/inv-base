const mssql = require('mssql');
const product = require('../models/product');

async function list(req, res) {
    let tempproduct = new product();
    try {
        let result = await tempproduct.get("select * from producto");
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }

}


module.exports = { list };