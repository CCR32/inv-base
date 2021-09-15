const Inventory = require('../../models/Inventory/Inventory');


/*Registrar o actualizar nuevo artículo */
async function InventoryRegister(req, res) {
    let inventory = new Inventory();
    try {
        let parameters = [req.body.code, req.body.description, req.body.category, req.body.subcategory,
            req.body.stock, req.body.exist, req.body.status
        ];
        let result = await inventory.create("CALL QryInsert_ItemInventory(?,?,?,?,?,?,?)", parameters);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

/* Eliminar artículo */
async function InventoryDelete(req, res) {
    let inventory = new Inventory();
    try {
        let result = await inventory.delete("Call QryDelete_Inventory(?)", parameters);
        return res.status(200).json({ result });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

/* Actualizar artículo */
async function InventoryUpdate(req, res) {
    let inventory = new Inventory();
    try {
        let parameters = [req.body.code, req.body.description, req.body.category, req.body.subcategory,
            req.body.stock, req.body.exist, req.body.status
        ];
        let result = await inventory.create("CALL QryInsert_ItemInventory(?,?,?,?,?,?,?)", parameters);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}

/* Lista artícullos (api) */
async function list(req, res) {
    let inventory = new Inventory();
    try {
        let parameters = {};
        let result = await inventory.get("Call QrySelect_Inventory", parameters);
        return res.status(200).json({ result });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


/// Controlador de las vistas 
async function View(req, res) {
    let inventory = new Inventory();
    try {
        let parameters = {};
        let result = await inventory.get("Call QrySelect_Inventory", parameters);
        console.log(result instanceof Array);
        res.render('Inventory/list', { items: result });
    } catch (err) {
        console.log(err);
    }
}


module.exports = { InventoryRegister, InventoryUpdate, InventoryDelete, list, View };