let Web3=require('web3');
let express=require("express");
let bodyParser=require('body-parser');
var app=express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/',(req,res)=>{

return res.sendfile("index.html");


});
app.post('/',(req,res)=>{
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // Set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}



web3.eth.defaultAccount = web3.eth.accounts[0];
var CoursesContract = web3.eth.contract([
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "string"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]);


var Courses = CoursesContract.at('0xdb9e9518dd826f7d0f2bc1a21ee26784e4ed8f8c');
Courses.set(req.body.user);
console.log(Courses.get())/**/;
return res.send("Gotcha");
});
app.listen(3000,function(){console.log("Server lsitening on 3000");})
