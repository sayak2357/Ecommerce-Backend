const express = require('express');
const app = express();
const serverConfig = require('./config/server.config.js');
const db = require("./models");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

function init(){
    db.role.create({
        id: 1,
        name:"customer"
    })
    db.role.create({
        id: 2,
        name:"admin"
    })
    var categoriesData = [
        {name: "Electronics", 
        description: "This category contains electrical appliances"},
        {name: "Vegetables", 
        description: "This category contains vegetables"},
    ]

    var productsData = [
        {name: "Samsung", 
        price: 1000},
    ]
    
    db.category.bulkCreate(categoriesData).then(() =>{
        console.log("category table is initialized with category data");
    }).catch((err) =>{
        console.log("Error in initializing categories table", err);
    })
    db.product.bulkCreate(productsData).then(() =>{
        console.log("category table is initialized with product data");
    }).catch((err) =>{
        console.log("Error in initializing products table", err);
    })
}

//Set the One to Many relationship between Category and Product
db.category.hasMany(db.product);
db.sequelize.sync({force:true}).then(() =>{
    //authenticate
    //drop all tables
    //recreate all tables
    console.log("models/tables are dropped and recreated");
    init();
})

require('./routes/category.routes')(app);
require('./routes/product.routes')(app);
require('./routes/auth.routes')(app);
require('./routes/cart.routes')(app);
app.listen(serverConfig.PORT, () => {
    console.log("my server is working");
});



