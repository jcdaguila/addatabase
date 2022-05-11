const { default: Restful } = require("@hendt/ebay-api/lib/api/restful");
const ebayModule = require('../models/ebay');
const facebook = require('../models/facebook');
const Tesseract = require('tesseract.js');
const request = require('request');
const fs = require('fs');

const OAuth2 = require('oauth2').OAuth2;



const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const { response } = require("express");
const { param } = require("express/lib/request");

const woocapi = new WooCommerceRestApi({
    url: 'https://appliancesdepot.net',
    consumerKey: 'ck_3f07f1d4c79885f2ced7e5569748ccaa13cb4154',
    consumerSecret: 'cs_d04abbd0019c573a2e10297b3358705aaf929691',
    version: "wc/v3"
});

function isEbayField(comment){
    var properties = comment.split(',');
    var theobject = {};
    properties.forEach(function(property) {
        var tup = property.split(':');
        theobject[tup[0]] = tup[1];
    });
    let result = false;
    if(theobject.isebayfield)result=true;
    return result;
}

async function executeStoredProcedure(spname, theparams){
    let db = {sequelize:null, Sequelize:null, tablename:''};
    let result = [];
    require("../models/index.js")(db);
    await db.sequelize
    .query('CALL ' + spname + ' (:params)',
        {replacements: { params: theparams}, type:db.sequelize.QueryTypes.SELECT, raw : true })
    .then(data => {
        for(key in data[0]){
            result.push(data[0][key]);
        }
    })
    .catch(err=>{
        result.push(err.message);
    });
    return result;
}

function isEmpty(arg) {
    for (var item in arg) {
      return false;
    }
    return true;
}

function createtablerow(db, req){
    let rows = [];
    for(rowitem in req.body){
        let row = {};
        for(item in db.row){
            if(req.body[rowitem][item]){
                if(row.lenght == 0){
                    row={[item]:req.body[rowitem][item]};
                }
                else{
                    row[item]=req.body[rowitem][item];
                }
            }
        }
        rows.push(row);
    }
    return rows;
}

async function createStructure(db, tablename){
    let obj01={};
    let obj03={};
    if(db.tablename !== tablename){
    db.tablename=tablename;
    require("../models/index.js")(db);
    let spname = 'sp_getstructure';
    let theparams = [db.tablename];
    await db.sequelize
    .query('CALL ' + spname + ' (:params)', { replacements: {params: theparams}, type:db.sequelize.QueryTypes.SELECT })
    .then(data => {
        let i = 0;
        db.TableStructure = data[0];
        data.forEach(element => {
            if(i==0){
                let j = 0;
                for(subelement in element) {
                    let field = element[subelement].Field;
                    let typedata = element[subelement].Type;
                    let sqtypedata = getSeqDataType(typedata, db);
                    let primaryKey = element[subelement].Key == 'PRI'?true:false;
                    let autoIncrement = element[subelement].Extra.indexOf('auto_increment') !== -1?true:false;
                    let comment = element[subelement].Comment;
                    let obj02 = {type:sqtypedata, primaryKey:primaryKey, autoIncrement:autoIncrement, comment};

                    //if(field!=='id'){
                        if (j==0){
                            obj01 = {[field]:obj02};
                            obj03 = {[field]:''};
                        }
                        else{
                            obj01[field] = obj02;
                            obj03[field] = '';
                        }
                        j++;
                    //}                            
                }
                db.structure = obj01;
                db.row = obj03;
                db.TableRows = db.sequelize.define(db.tablename, 
                    obj01, 
                    {
                        // don't add the timestamp attributes (updatedAt, createdAt)
                        timestamps: false,
                        // If don't want createdAt
                        createdAt: false,
                        // If don't want updatedAt
                        updatedAt: false,
                        // your other configuration here
                    }
                );
            }
            i++;
        });                
    })
    }
}

function getSeqDataType(typedata, db){
    typedata = typedata.toString();
    let sqtypedata = db.Sequelize.STRING;
    if(typedata.search('double')!== -1){sqtypedata = db.Sequelize.FLOAT;return sqtypedata;} 
    if(typedata.search('char')!== -1){sqtypedata = db.Sequelize.STRING;return sqtypedata;} 
    if(typedata.search('bit')!== -1) {sqtypedata = db.Sequelize.BOOLEAN;return sqtypedata;}
    if(typedata.search('tiny')!== -1) {sqtypedata = db.Sequelize.BOOLEAN;return sqtypedata;}
    if(typedata.search('int')== 0) {sqtypedata = db.Sequelize.INTEGER;return sqtypedata;}
    if(typedata.search('bool')!== -1) {sqtypedata = db.Sequelize.BOOLEAN;return sqtypedata;}
    if(typedata.search('date')!== -1 || typedata.search('time')!== -1) {sqtypedata = db.Sequelize.DATE;return sqtypedata;}
    return sqtypedata;
}

module.exports = {
    //Get Table Structure
    getTableStructure:
    function(db){
            return function(req, res){
                res.send(db.TableStructure);
                /*                
                let spname='sp_getstructure';
                let theparams=[db.tablename];
                db.sequelize
                .query('CALL ' + spname + ' (:params)',
                    { replacements: { params: theparams}, type:db.sequelize.QueryTypes.SELECT })
                .then(data => {
                    res.send(data[0]);
                })
                .catch(err=>{
                    res.status(500).send({
                        message:
                        err.message || "Some error ocurred while retrieving Rows on StoredProcedure."
                    });
                });
                */
        };
    },    
    
    //Retrieve all Row on Table from the database
    loadStructure: 
    function(db){
        return async function(req, res, next){
            //Elements of Structure of the table
            await createStructure(db, req.params.tablename);
            next();
        };
    },

    //Create and SAve a New Row on Table
    create: 
    function(db){
        return function(req, res){
            //Create Rows on Table
            const Rows = createtablerow(db, req);
            let resultRows = [];
            for(rowitem in Rows){
                db.TableRows.create(Rows[rowitem])
                .then(data => {
                    //res.send(data);
                    resultRows.push(data);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while creating the Row on Table."
                    });
                });
            }
            //Save Row on Table in the database
            /*db.TableRows.create(Row)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Row on Table."
                });
            });*/
            res.send(resultRows);
        };
    },

    //Retrieve all Row on Table from the database
    findAll: 
    function(db){
        return function(req, res){
            var precondition = {};
            for(item in req.query){
                precondition[item] =  {[db.Sequelize.Op.like]: `%${req.query[item]}%`};
            }
            var condition = isEmpty(precondition) ? null: precondition;

            db.TableRows.findAll({where:condition})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while retrieving Rows on Table."
                });
            });
        };
    },

    //Find a Single Row on Table with an id
    findOne: 
    function(db){
        return function(req, res){
        const id = req.params.id;
        db.TableRows.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({
                message: "Error retrieving Row on Table with id= " + id
            });
        });
        };
    },

    //Update a Row on Table by the id in the request
    update: 
    function(db){
        return function(req, res){
        const id = req.params.value;
        let KeyField = req.params.id;
        let condition = {};
        condition[KeyField] = id;
        db.TableRows.update(req.body, {where: condition})
        .then(num=> {
            if(num==1){
                res.send({
                    message: "Row on Table was updated successfully."
                });
            }else{
                res.send({
                    message: 'Cannot update Row on Table with id=${id}. Maybe Row on Table was not found or req.body is empty!'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({
                message: "Error updating Row on Table with id=" + id
            });
        });
        };
    },

    //Update a Table by the request
    updateAll: 
    function(db){
            return function(req, res){
            db.TableRows.update(req.body, {where: {}})
            .then(num=> {
                if(num==1){
                    res.send({
                        message: "Table was updated successfully."
                    });
                }else{
                    res.send({
                        message: 'Cannot update Table. Maybe Row on Table was not found or req.body is empty!'
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating on Table"
                });
            });
        };
    },
    
    //Delete a Row on Table with the specified id in the request
    delete: 
    function(db){
        return function(req, res){
            const id = req.params.value;
            let KeyField = req.params.id;
            let condition = {};
            condition[KeyField] = id;
            db.TableRows.destroy({
                where: condition
            })
            .then(num=>{
                if(num==1){
                    res.send({
                        message: "Row on Table was deleted successfully!"
                    });
                } else{
                    res.send({
                        message: 'Cannot delete Row on Table with id=${id}. Maybe Row on Table was not found!'
                    });
                }
            })
            .catch(err=> {
                res.status(500).send({
                    message: "Could not delete Row on Table with id=" + id
                });
            });
        };
    },

    //Delete All Row on Table from the Database.
    deleteAll: 
    function(db){
        return function(req, res){
        db.TableRows.destroy({
            where: {},
            truncate: false
        })
        .then(nums=>{
            res.send({message: '${nums} Row on Table were deleted successfully!'});
        })
        .catch(err=>{
            res.status(500).send({
                message:
                err.message || "Some error ocurred while removing all Row on Table."
            });
        });
        };
    },

    //Delete All Row on Table with Id Paent from the Database.
    deleteAllParent: 
    function(db){
        return function(req, res){

            const parentid = req.params.parent;
            let KeyField = 'parent';
            let condition = {};
            condition[KeyField] = parentid;
            db.TableRows.destroy({
                where: condition,
                truncate: false
            })
            .then(nums=>{
                res.send({message: '${nums} Row on Table were deleted successfully!'});
            })
            .catch(err=>{
                res.status(500).send({
                    message:
                    err.message || "Some error ocurred while removing all Row on Table."
                });
            });
        };
    },

    //get list of All Tables in DataBase
    getAllTables:
    function(){
        return function(req, res){
            let db = {sequelize:null, Sequelize:null, tablename:''};
            require("../models/index.js")(db);
            db.sequelize
            .query("SELECT * FROM listado;",
                {type:db.sequelize.QueryTypes.SELECT })
            .then(result => {
                res.send(result);
            })
            .catch(err=>{
                res.status(500).send({
                    message:
                    err.message || "Some error ocurred while retrieving Rows on listado."
                });
            });
        };
    },

    //Execute Stored Procedure with JSON Parameters
    execStoredProcedure:
    function(){
            return async function(req, res){
                let paramParse = JSON.parse(req.params.paramstring);
                const theparams = [];
                let spname='';              
                for(let key in paramParse){
                    if(key === 'spname') spname = paramParse[key];
                    else theparams.push(paramParse[key]);
                }
                let result = await executeStoredProcedure(spname, theparams);
                res.send(result);
        };
    },

    //Show List of pictures on Cloudinary
    getListofPictures:
    function(){
        return function(req, res){
            var cloudinary = require('cloudinary');

            cloudinary.config({
                cloud_name: "dleagle", // add your cloud_name
                api_key: "741229854568296", // add your api_key
                api_secret: "utAfIR2MnsE78blVY1VT_pmznfQ", // add your api_secret
                secure: true
            });

            cloudinary.v2.search.expression(
                'folder:appliancesdepot/*' // add your folder
            )
            .sort_by('uploaded_at','asc')
            .max_results(500)
            .execute()
            .then(result=>{
                res.send(result);
            })
            .catch(err=>{
                res.send({
                    message:
                    err.message || "Some error ocurred while retrieving Pictures."
                });
            });
        }
    },

    getwooCProducts:
    function(){
        return async function(req, res){
            let data;
            // GET example
            await woocapi.get('products', 
                function(err, data, result) {
                    res.send(result);
                }
            );
        }
    },

    getTextFromImage:
    function(){
        return async function(req, res){
            let paramParse = JSON.parse(req.params.paramstring);
            let pic = await executeStoredProcedure(paramParse.spname, paramParse.id);
            console.log('pic', pic);
            if(pic.length > 0){
                var url = pic[0].name;//'http://tesseract.projectnaptha.com/img/eng_bw.png';
                var filename = 'pic.png';
                var writeFile = fs.createWriteStream(filename);
                request(url).pipe(writeFile).on('close', function() {
                    console.log(url, 'saved to', filename);
                    Tesseract.recognize(filename)
                    .then(function (result) {
                        //console.log(result.data.text);
                        res.send(result.data);
                    })
                    .catch(err => {
                        console.error(err);
                        res.send(err);}
                    );
                });
                //res.send('nothing');
            }else res.send('Not Image Selected. Mark the Check "Readable" of one of the images.(Media Grid)')
        };
    },


    getInfoWooCProduct:
    function(){
        return async function(req, res){
            let opt = req.params.opt;
            let prodid = req.params.prodid;
            woocapi.get("products/" + prodid)
            .then((response) => {
                //console.log(response.data);
                let result = '';
                if(opt == 0) result = response.data.permalink;
                res.send(result);
            })
            .catch((error) => {
                console.log(error.response.data);
                res.send(error.response.data)
            });
        }
    },

    compareWooCProducts:
    function(){
        return async function(req, res){
            let product1 = woocapi.product1;
            let product2 = woocapi.product2;
            //console.log(product1, product2);
            for(let item1 in product1){
                let found = false;
                for(let item2 in product2){
                    if(item1 === item2) found=true;
                };
                if(!found) console.log(item1);
            };
            //res.write(JSON.stringify(product1));
            //res.write(JSON.stringify(product2));
            res.write(JSON.stringify(product1.images));
            res.write(JSON.stringify(product2.images));
            res.end();
            };
    },

    createWooCList:
    function(){
        return async function(req, res){
            let itemid = req.params.itemid;
            let item = await executeStoredProcedure('sp_getproduct', [itemid]);
            let pics = await executeStoredProcedure('sp_getpicsproduct', [itemid]);
            let images = [];
            let cont = 0;
            pics.forEach(element=>{
                if(cont < 5)images.push({"src":element.url, "position":cont})
                cont++;
            });
            let data = {
                    "name": item[0].brandname + ' ' + item[0].name + ' ' + item[0].model,
                    "type": "simple",
                    "regular_price": (item[0].pricestore.toString()),
                    "description": 'Model#:' + item[0].model + (item[0].serialnumber!==''?' Serial#:' + item[0].serialnumber:'') + ' Brand:' + item[0].brandname + ' ' + item[0].comments,
                    "dimensions":{
                        "height": (item[0].PackageDepth.toString()),
                        "length": (item[0].PackageLength.toString()),
                        "width": (item[0].PackageWidth.toString()),
                    },
                    "images": images,
                    "purchasable":true,
                    "weight": item[0].WeightMajor + 'Pounds',
                    "categories":[
                        {
                            id:item[0].wooccat
                        }
                    ]
            };
            console.log(data);
            // Create a product
            await woocapi.post("products", data)
            .then((response) => {
                // Successful request
                //console.log("Response Status:", response.status);
                //console.log("Response Headers:", response.headers);
                //console.log("Response Data:", response.data);
                res.send(response.data);
            })
            .catch((error) => {
                // Invalid request, for 4xx and 5xx statuses
                //console.log("Response Status:", error.response.status);
                //console.log("Response Headers:", error.response.headers);
                //console.log("Response Data:", error.response.data);
                res.send(error.response.data);
            })
            .finally(() => {
                // Always executed.
            });
        }
    },

    reviseWooCList:
    function(){
        return async function(req, res){
            let itemid = req.params.itemid;
            let woocid = req.params.woocid;
            let item = await executeStoredProcedure('sp_getproduct', [itemid]);
            let pics = await executeStoredProcedure('sp_getpicsproduct', [itemid]);
            let images = [];
            let cont = 0;
            pics.forEach(element=>{
                if(cont < 5)images.push({"src":element.url, "position":cont})
                cont++;
            });
            let data = {
                "name": item[0].brandname + ' ' + item[0].name + ' ' + item[0].model,
                "type": "simple",
                "regular_price": (item[0].pricestore.toString()),
                "description": 'Model#:' + item[0].model + ' Serial#:' + item[0].serialnumber + ' Brand:' + item[0].brandname,
                "dimensions":{
                    "height": (item[0].PackageDepth.toString()),
                    "length": (item[0].PackageLength.toString()),
                    "width": (item[0].PackageWidth.toString()),
                },
                //"images": images,
                "purchasable":true,
                "weight": item[0].WeightMajor + ' Pounds ' + item[0].WeightMinor + ' Oz'
            };
            // Edit a product
            await woocapi.put("products/" + woocid, {
                sale_price: "11.99", // See more in https://woocommerce.github.io/woocommerce-rest-api-docs/#product-properties
              })
            .then((response) => {
                // Successful request
                //console.log("Response Status:", response.status);
                //console.log("Response Headers:", response.headers);
                //console.log("Response Data:", response.data);
                res.send(response.data);
            })
            .catch((error) => {
                // Invalid request, for 4xx and 5xx statuses
                //console.log("Response Status:", error.response.status);
                //console.log("Response Headers:", error.response.headers);
                //console.log("Response Data:", error.response.data);
                res.send(error.response.data);
            })
            .finally(() => {
                // Always executed.
            });
        }
    },
    
    removeWooCList:
    function(){
        return async function(req, res){
            let itemid = req.params.itemid;
            let woocid = req.params.woocid;
            // Remove a product
            await woocapi.delete("products/" + woocid, {
                force: true, // Forces to delete instead of move to the Trash
                })
                .then((response) => {
                    // Successful request
                    //console.log("Response Status:", response.status);
                    //console.log("Response Headers:", response.headers);
                    //console.log("Response Data:", response.data);
                    res.send(response.data);
                })
                .catch((error) => {
                    // Invalid request, for 4xx and 5xx statuses
                    //console.log("Response Status:", error.response.status);
                    //console.log("Response Headers:", error.response.headers);
                    //console.log("Response Data:", error.response.data);
                    res.send(error.response.data);
                })
                .finally(() => {
                    // Always executed.
                });
        }
    },
    
    //Add ebay List
    createEbayItem:
    function(){
        return async function(req, res){
            let paramParse = JSON.parse(req.params.paramstring);
            let part = await executeStoredProcedure(paramParse.spebay, [paramParse.id]);
            let pics = await executeStoredProcedure(paramParse.spebaypics, [paramParse.id]);
            let result = await ebayModule.createEbayItem(part, pics);
            res.send(result);
        }
    },

    reviseEbayItem:
    function(){
        return async function(req, res){
            let paramParse = JSON.parse(req.params.paramstring);
            let part = await executeStoredProcedure(paramParse.spebay, [paramParse.id]);
            let pics = [];//await executeStoredProcedure(paramParse.spebaypics, [paramParse.id]);
            let result = await ebayModule.reviseEbayItem(part, pics, paramParse.ebayid);
            res.send(result);
        }
    },

    authFacebook:
    function(){
        return async function(req, res) {
            let oauth2 = new OAuth2("627193005182875", "d5f1d6f8a70785fbcb81ff01505e1813", "", "https://www.facebook.com/dialog/oauth", "https://graph.facebook.com/oauth/access_token", null);
            let redirect_uri = "Your App https://localhost:8443/api" +    "/facebook/0";
            // For eg. "http://localhost:3000/facebook/callback"
            let params = {'redirect_uri': redirect_uri, 'scope':'user_about_me,publish_actions'};
            console.log(oauth2);
            res.send('Llego');
            //res.redirect(oauth2.getAuthorizeUrl(params));
        }
    },

    getFacebook:
    function(){
        return async function(req, res){
            let opt = req.params.opt;
            if(opt ==0)res.send(facebook.showFacebook());
            if(opt ==1)res.send(facebook.getMe());
            if(opt ==2)res.send(facebook.getInfo());
            if(opt ==3)res.send(facebook.getMeAccounts());
        }
    },

    //Execute Prueba
    getPrueba:
    function(){
            return function(req, res){
                let paramParse = JSON.parse(req.params.paramstring);
                //let searchParams = new URLSearchParams(paramParse);
                //let TableName = searchParams.has('tablename')?searchParams.get('tablename'):'';
                //let id = searchParams.has('id')?searchParams.get('id'):'';

                const theparams = [];
                let spname='';              
                for(let key in paramParse){
                    if(key === 'spname') spname = paramParse[key];
                    else theparams.push(paramParse[key]);
                }

                let db = {sequelize:null, Sequelize:null, tablename:''};
                require("../models/index.js")(db);
                db.sequelize
                .query('CALL ' + spname + ' (:params)',
                    {replacements: { params: theparams}, type:db.sequelize.QueryTypes.SELECT, raw : true })
                .then(data => {
                    console.log('data: ', data);
                    let result = [];
                    for(key in data[0]){
                        result.push(data[0][key]);
                    }
                    //res.send(data[0]);
                    res.send(result);
                })
                .catch(err=>{
                    res.status(500).send({
                        message:
                        err.message || "Some error ocurred while retrieving Rows on StoredProcedure."
                    });
                });
        };
    },
}

