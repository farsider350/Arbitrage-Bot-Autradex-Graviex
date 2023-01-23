# Arbitrage-Bot-Autradex-Graviex
An Arbitrage Bot to Arb the Markets between Autradex Exchange and Graviex Exchange

# autradex-js
A libary for autradex API written in JS
# graviex-js
A libary for graviex API written in JS

Here is a full implementation of the autradex and graviex exchange API in a nodejs NPM package.


> accessKey secretKey listMarkets allMarketsTicker ticker account
> allDeposits deposits deposit depositAddress orders ordersAll
> createOrder order cancelOrder clearAllOrdersSide clearAllOrders
> orderBook depth trades myTrades kLine timestamp

    //listMarkets
    //Get all available markets
    /*
    listMarkets(function(res){
    	if(!res.error){
    		//console.log(res);
    		for (var key in res) {
    			if (res.hasOwnProperty(key)) {
    				console.log(res[key]);
    			}
    			}
    	}else{
    		console.log(res)
    	}
    });
    */  

    //createOrder    
    //Create a Sell/Buy order    
    /*    
    createOrder("onzbtc", "buy", "5.0", "0.000000200", function(res){    
        if(!res.error){    
            console.log(res);    
        }else{    
           console.log("ERROR: " + res)    
        }    
    });
    
    */

Example:

        //Import module
        var  autradex  =  require("./autradex.js"); 
	    //Settings / Config  
        autradex.accessKey  =  "";    
        autradex.secretKey  =  ""
        
        autradex.allMarketsTicker(function(res){
	        if(!res.error){        
	            console.log(res)
	        }else{        
	            console.log(res)
	        }        
        });

For a more detailed example, please see "marketmaker.js" in the git directory.

# Setup and Run the Arbitrage Bots
Install:

    sudo apt update
    sudo apt install nodejs
    npm install pm2 -g
    git clone https://github.com/nightanticipate/Arbitrage-Bot-Autradex-Graviex
    cd Arbitrage-Bot-Autradex-Graviex
    npm install
    nano dogebtcarb.js
    Input your API Keys, adjust volume and allowed spread and loop time 
    Ctrl + X to save
    pm2 start dogebtcarb.js
    pm2 log
	
Available Bots as of latest commit:
    -------------------
    dogebtcarb.js
    dgbbtcarb.js
    rvnbtcarb.js
    -------------------
    marketmaker.js