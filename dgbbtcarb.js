// Arb Bot
var autradex = require("./autradex.js");
var graviex = require("./graviex.js");


// Config Access Keys
autradex.accessKey = "";
autradex.secretKey = "";
graviex.accessKey = "";
graviex.secretKey = "";

/*
autradex.allMarketsTicker(function(res){
	if(!res.error){
		console.log(res);
	}else{
		console.log(res);
	}
})
*/


// Config Market
setInterval(function() {
	console.log("_________Beginning Arb Discovery For Digibyte vs Bitcoin_________");
	var theMarketAutx = "babtc";
	var theMarketGrav = "dgbbtc";
	var increase = "0.00000001";
	var volume = "36";
	var loop = "30";


//CLOSE ALL ORDERS
//

//	autradex.clearAllOrders(function(res){
//		if(!res.error){
//			console.log("Removing old orders...");
//			res.forEach(function(order){
//				console.log(order.id + "|" + order.state + "|" + order.side);
//			});


// Check Autradex Orders
			autradex.orderBook(theMarketAutx, function(res){
				if(!res.error){
					var sellingAutx = parseFloat(res.asks[0].price);
					var buyingAutx = parseFloat(res.bids[0].price);
					console.log("[Autradex Center Orders]");
					console.log("Autradex Selling At: " + sellingAutx.toFixed(9));
					console.log("Autradex Buying At: " + buyingAutx.toFixed(9));
// Check Graviex Orders
                        graviex.orderBook(theMarketGrav, function(res2){
                                if(!res.error){
                                        var sellingGrav = parseFloat(res2.asks[0].price);
                                        var buyingGrav = parseFloat(res2.bids[0].price);
                                        console.log("[Graviex Center Orders]");
                                        console.log("Graviex Selling At: " + sellingGrav.toFixed(9));
                                        console.log("Graviex Buying At: " + buyingGrav.toFixed(9));


//check if those orders are ours,
//					var oursSell = false;
//					var oursBuy = false;
//					autradex.orders(theMarket, function(res){
//						if(!res.error){
							//if not ours open orders + 1 and -1 each side of the market to try win spread
							//console.log(res);
//							res.forEach(function(order){
//								console.log(order.price);
//								if(order.price == selling){
//									oursSell = true;
//								}
//								if(order.price == buying){
//									oursBuy = true;
//								}
//							});



							var buyPriceAutx = sellingGrav.toFixed(9);
							var sellPriceAutx = buyingGrav.toFixed(9);
							var buyPriceGrav = sellingAutx.toFixed(9);
                                                        var sellPriceGrav = buyingAutx.toFixed(9);

// If Autradex buy is greater then Graviex sell
							if((buyingAutx - increase) > sellingGrav){
								console.log("Orders Have Arb Oportunity");
								console.log("Will Buy From Graviex At: " + buyingAutx);
                                                                console.log("Will Sell To Autradex At: " + sellingGrav);
// Buy From Graviex
								graviex.createOrder(theMarketGrav, "buy", volume, buyingAutx, function(res){
									if(!res.error){
// Sell To Autradex
								autradex.createOrder(theMarketAutx, "sell", volume, sellingGrav, function(res2){
									if(!res.error){
										console.log(res.id + "|" + res.state + "|" + res.side);
										console.log(res2.id + "|" + res2.state + "|" + res2.side);
									}else{
										console.log(res)
									}
								});
									}else{
										console.log(res)
									}
								});
                                                        }else{
                                                                console.log("Autradex Buy Is Less Then Graviex Sell - Doing nothing on this side");
                                                        }
// If Graviex buy is greater then Autradex sell
                                                        if((buyingGrav - increase) > sellingAutx){
                                                                console.log("Orders Have Arb Oportunity");
                                                                console.log("Will Buy From Autradex At: " + buyingGrav);
                                                                console.log("Will Sell To Graviex At: " + sellingAutx);
// Buy From Graviex
                                                                autradex.createOrder(theMarketAutx, "buy", volume, buyingGrav, function(res){
                                                                        if(!res.error){
// Sell To Autradex
                                                                graviex.createOrder(theMarketGrav, "sell", volume, sellingAutx, function(res2){
                                                                        if(!res.error){
                                                                                console.log(res.id + "|" + res.state + "|" + res.side);
                                                                                console.log(res2.id + "|" + res2.state + "|" + res2.side);
                                                                        }else{
                                                                                console.log(res)
                                                                        }
                                                                });
                                                                        }else{
                                                                                console.log(res)
                                                                        }
                                                                });
                                                        }else{
                                                                console.log("Graviex Buy Is Less Than Autradex Sell - Doing nothing on this side");
                                                        }

						}else{
							console.log(res)
						}
					});

				}else{
					console.log(res);
					console.log("Arb detection loop complete");
				}
			});

}, loop * 1000);
