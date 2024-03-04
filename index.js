process.env.HTTP_PROXY = 'http://localhost:33210';
process.env.HTTPS_PROXY = 'http://localhost:33210';
const Web3 = require('web3');
const axios = require('axios');
console.log('web3版本号',Web3.version)
// 连接到以太坊节点
//主网地址
// const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/xxx');
//测试网地址
const web3 = new Web3('https://eth-goerli.g.alchemy.com/v2/xxx');
//主网浏览器
// var etherscan = 'https://api.etherscan.io/api';
//测试网浏览器
var etherscan = 'https://api-goerli.etherscan.io/api';
// 账户地址
const address = '钱包';
// 获取账户余额
function getBalance(address) {
	web3.eth.getBalance(address, (err, balance) => {
	if (err) {
	   console.log('Error:', err);
	} else {
	   console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
	 }
	});
}
//获得交易记录
function getTxLogs() {
	const apiKey = 'VJ31T96AWHBYCNQFQT7JFV3TJ5JT45F5X3'; // Replace with your Etherscan API key
	axios.get(etherscan, {
	    params: {
	        module: 'account',
	        action: 'txlist',
	        address: address,
	        page: 1,
	        offset: 100,
	        startblock: 0,
	        endblock: 27025780,
	        sort: 'desc',
	        apikey: apiKey
	    }
	})
	.then((response) => {
	    if(response.data.status && response.data.result.length > 0) {
	        response.data.result.forEach((transaction) => {
	            var date = new Date(transaction.timeStamp * 1000);
	            console.log(`Transaction Date for ${transaction.hash}: ${date.toISOString()}`);
	        });
	    } else {
	        console.log('No transactions found or error in the response');
	    }
	})
	.catch((error) => {
	    console.error('Error fetching transactions:', error);
	});
}
module.exports = getTxLogs;
module.exports = getBalance;
