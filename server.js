

var express = require('express'),
    app = express();

app.configure(function() {
    app.use(express.static(__dirname, '/'));
});

app.get('/blogCategories', function(req, res) {
    res.json(blogCats);
});

app.get('/blogs', function(req, res) {
    res.json(blogs);
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

app.listen(8080);

console.log('Express listening on port 8080');

mysql = require('./mysqlConn');
mysql.open(function(conn, err) {

    if(err) {
        console.error('Mysql fail: '+err);
    }
    else {
        console.log('MySQL connection established.');

        // Load the main blog categories for the nav bar
        conn.query('SELECT displayName, link, bgImg FROM navbar ORDER BY displayOrder ASC', function(err, rows, fields) {
            if (err) throw err;
            blogCats = rows;
        });

    }
});

blogCats = [];
blogs = [];
