# Expat

Requirements:
.NET 
SQL Server
Node server
Ganache server (or any other blockchain simulator)
Metamask wallet (for testing)

Server side - build and run project (database migrations will be applied automatically on first run)
Client side - 'npm install' in order to install packages
			  then 'npm serve' to start the node server
			  and then open 'http://localhost:4200'

Deploy the smart contract:
1. Access https://remix.ethereum.org and add existing smart contract from git project
2. Compile the smart contract and then deploy it using ganache provider (you will be asked to enter the 
ganache endpoint which is usually http://127.0.0.1:7545)
PS: You can use another environment in remix but when using Ganache you'll be able to see all the transactions
3. Copy the address where the smart contract was deployed and paste it on the client side (in user-service)