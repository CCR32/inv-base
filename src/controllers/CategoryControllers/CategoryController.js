const Category = require('../../models/Categorys/Category');


async function CategoryRegister(req, res) {
    let category = new Category();
    try {
        let parameters = [req.body.code, req.body.name, req.body.sdescription, req.body.ldescription,
            req.body.status
        ];
        let result = await category.create("CALL QryInsert_Category(?,?,?,?,?)", parameters)
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json(err);
    }
}

/* eliminar categorias para api */
async function CateogryDelete(req, res) {
    let category = new Category();
    try {
        let parameters = [req.body.code, req.body.name, req.body.sdescription, req.body.ldescription,
            req.body.status, req.body.status
        ];
        let result = await category.delete("CALL QryDelete_Category(?)", parameters);
        res.status(200).json(result);

    } catch (err) {
        res.status(500).json(err);
    }
}
/* Lista de categorias para api */
async function CategoryList(req, res) {
    let category = new Category();
    try {
        let parameters = {};
        let result = await category.get("CALL QrySelect_Category", parameters);
        return res.status(200).json({ result });

    } catch (err) {
        res.status(500).json(err);
    }
}




module.exports = { CategoryRegister, CateogryDelete, CategoryList };