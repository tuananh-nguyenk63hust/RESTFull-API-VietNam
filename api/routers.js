module.exports = function(app) {
    let productsCtrl = require('./controllers/ProductsController');
  
    // todoList Routes
    app.route('/vn_data/total')
      .get(productsCtrl.get_total)
  };