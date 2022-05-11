//var request = require('request');

module.exports = function(app){
    const TableRowsCont = require ("../controllers/table.controller.js");
    //const cors = require ("cors");

    var db = {sequelize:null, Sequelize:null, tablename:"", structure:{}, row:{}};
    
    var router = require("express").Router();
    app.use('/api', router);

    router.route('/facebook/auth')
    .get(TableRowsCont.authFacebook());

    router.route("/facebook/:opt")
    .get(TableRowsCont.getFacebook());

    router.route("/imgtotxt/:paramstring")
    .get(TableRowsCont.getTextFromImage());

    router.route("/wooc/getproductinfo/:prodid/:opt")
    .get(TableRowsCont.getInfoWooCProduct());
    
    router.route("/wooc/compareproducts")
    .get(TableRowsCont.compareWooCProducts());

    router.route("/wooc")
    .get(TableRowsCont.getwooCProducts());

    router.route("/wooc/add/:itemid")
    .get(TableRowsCont.createWooCList());

    router.route("/wooc/revise/:itemid/:woocid")
    .get(TableRowsCont.reviseWooCList());

    router.route("/wooc/remove/:itemid/:woocid")
    .get(TableRowsCont.removeWooCList());

    router.route("/ebay/add/:paramstring")
    .get(TableRowsCont.createEbayItem());

    router.route("/ebay/revise/:paramstring")
    .get(TableRowsCont.reviseEbayItem());

    router.route("/prueba/:paramstring")
    .get(TableRowsCont.getPrueba(db));

    router.route("/delete/:tablename/:parent")
    .delete(TableRowsCont.loadStructure(db), TableRowsCont.deleteAllParent(db));

    router.route("/pics")
    .get(TableRowsCont.getListofPictures());

    router.route("/sp/:paramstring")
    .get(TableRowsCont.execStoredProcedure());

    router.route("/listado")
    .get(TableRowsCont.getAllTables());
    
    router.route("/:tablename/st")
    .get(TableRowsCont.loadStructure(db), TableRowsCont.getTableStructure(db));

    router.route("/:tablename")
    .post(TableRowsCont.loadStructure(db), TableRowsCont.create(db))    //Create a new TableRow
    .get(TableRowsCont.loadStructure(db), TableRowsCont.findAll(db))    //Retrieve all TableRows
    .put(TableRowsCont.loadStructure(db), TableRowsCont.updateAll(db))  //Update a Table
    .delete(TableRowsCont.loadStructure(db), TableRowsCont.deleteAll(db));    //Delete All TableRows

    router.route("/:tablename/:id")
    .get(TableRowsCont.loadStructure(db), TableRowsCont.findOne(db)) //Retrieve a single TableRow with id
    .put(TableRowsCont.loadStructure(db), TableRowsCont.update(db))  //Update a TableRow with id
    .delete(TableRowsCont.loadStructure(db), TableRowsCont.delete(db));  //Delete a TableRow with id

    router.route("/:tablename/:id/:value")
    .get(TableRowsCont.loadStructure(db), TableRowsCont.findOne(db)) //Retrieve a single TableRow with id
    .put(TableRowsCont.loadStructure(db), TableRowsCont.update(db))  //Update a TableRow with id
    .delete(TableRowsCont.loadStructure(db), TableRowsCont.delete(db));  //Delete a TableRow with id
};