

var express = require('express'),

    app = express();

app.configure(function() {
    app.use(express.static(__dirname, '/'));
});

app.get('/navbar', function(req, res) {
    res.json(navBar);
});

app.get('/blogCategories', function(req, res) {
    res.json(blogCats);
});

app.get('/blogs', function(req, res) {
    res.json(blogs);
});

app.get('/blogs/:cat', function(req, res) {
    res.json(blogs);
});

app.get('/blogs/:cat/:id', function(req, res) {
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

<<<<<<< HEAD
        var findCatByID = function(id) {
            for(var i=0; i < blogCats.length; i++) {
                if(blogCats[i].id == id)
                    return i;
            }
            
            return -1;
        };
        
        // Load the items for the nav bar
=======
        // Load the main blog categories for the nav bar
>>>>>>> 03e5731523dec7e36da1b55c92cd401ebfa537f4
        conn.query(
            'SELECT displayName, link, bgImg FROM navbar ORDER BY displayOrder ASC', 
            function(err, rows, fields) {
                if (err) throw err;
<<<<<<< HEAD
                
                navBar = rows;
            }
        );
        
        conn.query(
            'SELECT * FROM categories',
            function(err, rows, fields) {
                if(err) throw err;
                
                for(var i=0; i < rows.length; i++) {
                    rows[i].subCats = [];
                }

                blogCats = rows;
            }
        );
        
        conn.query(
            'SELECT * FROM subcats',
            function(err, rows, fields) {
                if(err) throw err;

                for(var i=0; i < rows.length; i++) {
                    var p = findCatByID(rows[i].parent);
                    var c = findCatByID(rows[i].child);
                    
                    if(p > -1 && c > -1) {
                        p = blogCats[p];
                        c = blogCats[c];

                        p.subCats.push(c.filterID);
                    }
                    else {
                        console.log("BAD SUB CAT ID");
                    }
                }
=======
                blogCats = rows;
                
                for(var i=0; i < blogCats.length; i++) {
                    blogSubCats[blogCats[i].displayName] = [];
                }
            }
        );
        
        
>>>>>>> 03e5731523dec7e36da1b55c92cd401ebfa537f4

            }
        );
    }
});

navBar = [];
blogCats = [];
blogSubCats = {};
blogs = [];
