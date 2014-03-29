

var express = require('express'),
    app = express();

app.configure(function() {
    app.use(express.static(__dirname, '/'));
});

app.get('/customers/:id', function(req, res) {
    var customerId = parseInt(req.params.id);
    var data = {};

    for(var i=0, len=customers.length; i < len; i++) {
        if(customers[i].id === customerId) {
            data = customers[i];
            break;
        }
    }
    res.json(data);
});

app.get('/customers', function(req, res) {
    res.json(customers);
});

app.get('/orders', function(req, res) {
    var orders = [];

    for(var i=0, len=customers.length; i < len; i++) {
        for(var j=0, oLen=customers[i].orders.length; j < oLen; j++) {
            orders.push(customers[i].orders[j]);
        }
    }
    res.json(orders);
});

app.delete('/customers/:id', function (req, res) {
    var customerId = parseInt(req.params.id);
    var data = { status: false };

    for(var i=0, len=customers.length; i < len; i++) {
        if(customers[i].id === customerId) {
            customers.splice(i, 1);
            data.status = true;
            break;
        }
    }
    res.json(data);
});

app.listen(8080);

console.log('Express listening on port 8080');

mysql = require('./mysqlConn');
mysql.open(function(err) {

    if(err) {
        console.error('Mysql fail: '+err);
    }
    else {
        console.log('MySQL connection established.');



    }
});

var customers = [
    {
        id: 1,
        joined: '2000-12-02',
        name: 'John',
        city: 'Stockton',
        orderTotal: 9.99,
        orders: [
            {
                id: 1,
                product: 'Shoes',
                total: 9.99
            }
        ]
    },
    {
        id: 2,
        joined: '2013-01-02',
        name: 'Able',
        city: 'Orem',
        orderTotal: 19.99,
        orders: [
            {
                id: 2,
                product: 'Baseball',
                total: 10.00
            },
            {
                id: 3,
                product: 'Bat',
                total: 9.99
            }
        ]
    },
    {
        id: 3,
        joined: '2011-03-22',
        name: 'Jane',
        city: 'Savannah',
        orderTotal: 29.99,
        orders: [
            {
                id: 4,
                product: 'Headphones',
                total: 29.99
            }
        ]
    },
    {
        id: 4,
        joined: '1946-12-02',
        name: 'Zeffer',
        city: 'Albany',
        orderTotal: 329.9,
        orders: [
            {
                id: 5,
                product: 'Nexus A\'million',
                total: 329.90
            }
        ]
    }
];
