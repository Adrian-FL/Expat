import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { Md5 } from 'ts-md5';

let tokenAbi = require('./expath-contract.json');

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService {
    public uploadDiploma(diplomaFormData: any) {
        return this.http.post(`${this.apiBaseUrl}/users/diploma`, diplomaFormData);
    }

    constructor(private http: HttpClient) {
        super();
    }

    public userTimestampCheck: boolean = false;
    public diplomaValidationCheck: boolean = false;

    private ethereum: any = (window as any).ethereum;

    public async getUserByMetamaskAddress(address: string): Promise<any> {
        //const wallet = await this.getConnectedWallet();
        return this.http.get(`${this.apiBaseUrl}/users?metamaskAddress=${address}`).toPromise();
    }

    public addUser(user: any) {
        return this.http.post(`${this.apiBaseUrl}/users`, user);
    }

    public transferStudent(transfer: any) {
        return this.http.post(`${this.apiBaseUrl}/users/transfer`, transfer);
    }

    public async saveNewUserHash(user: any) {
        const wallet = await this.getConnectedWallet();

        var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545/'));

        var contract = new web3.eth.Contract(tokenAbi, '0x3cEe924415BB1b5F7162e169d437A6F5eD484f56', {
            from: wallet.address,
            gas: 3000000
        });
        const data = `${user.metaMaskPublicAddress}-${user.timestamp}`;
        const userHash = Md5.hashStr(data);

        await contract.methods.addHistory(user.metaMaskPublicAddress, userHash).send().then(console.log);
    }

    public async saveNewDiplomaHash(userAddress: string, diploma: any) {
        const wallet = await this.getConnectedWallet();

        var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545/'));

        var contract = new web3.eth.Contract(tokenAbi, '0x3cEe924415BB1b5F7162e169d437A6F5eD484f56', {
            from: wallet.address,
            gas: 3000000
        });
        const file = `${diploma.file}-${diploma.timestamp}`;
        const diplomaHash = Md5.hashStr(file);

        await contract.methods.addHistory(userAddress, diplomaHash).send().then(console.log);
    }

    public async containsHash(user: any) {
        const wallet = await this.getConnectedWallet();

        var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545/'));

        var contract = new web3.eth.Contract(tokenAbi, '0x3cEe924415BB1b5F7162e169d437A6F5eD484f56', {
            from: wallet.address,
            gas: 3000000
        });
        const data = `${user.metaMaskPublicAddress}-${user.timestamp}`;
        const userHash = Md5.hashStr(data);

        await contract.methods.containsHash(user.metaMaskPublicAddress, userHash).call().then((result: boolean) => {
            console.log(result);
            this.userTimestampCheck = result;
            console.log(this.userTimestampCheck);
            return result;
        });
    }

    public async containsDiplomaHash(userAddress: string, diploma: any) {
        const wallet = await this.getConnectedWallet();

        var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545/'));

        var contract = new web3.eth.Contract(tokenAbi, '0x3cEe924415BB1b5F7162e169d437A6F5eD484f56', {
            from: wallet.address,
            gas: 3000000
        });

        const file = `${diploma.file}-${diploma.timestamp}`;
        const diplomaHash = Md5.hashStr(file);

        await contract.methods.containsHash(userAddress, diplomaHash).call().then((result: boolean) => {
            console.log(result);
            this.diplomaValidationCheck = result;
            console.log(this.diplomaValidationCheck);
            return result;
        });
    }

    public getConnectedWallet = async () => {
        if (this.ethereum) {
            try {
                const addressArray = await this.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const obj = {
                    address: addressArray[0],
                    status: "Success!"
                };
                return obj;
            } catch (err: any) {
                return {
                    address: "",
                    status: "😥 " + err.message,
                };
            }
        } else {
            return {
                address: "",
                status: " 🦊You must install Metamask, a virtual Ethereum wallet, in your browser."
            }
        }
    };
}

