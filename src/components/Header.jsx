import React, { useState, useEffect, createContext } from 'react';
import ReactDOM from 'react-dom';
import { connectors } from './connectors';
import { useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { toHex, truncateAddress } from "./utils";
import TreasuryABI from './treasuryAbi.json';
import './style.css';

function Header() {
    const [showModal, setShowModal] = useState(false);
    const { activate, deactivate, account, chainId, active} = useWeb3React();
    const [referValid, setreferValid] = useState(null);
    
    const [refer, setRefer] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const Web3 = require("web3");
    const CONTRACT_ADDRESS = '0x59a7Dc57EF280a69408a17F064721fB664ec9c31';     
    const CONTRACT_ABI = TreasuryABI;     
    const web3 = new Web3("https://bsc-dataseed.binance.org/");
    const contractInstance = new web3.eth.Contract( CONTRACT_ABI, CONTRACT_ADDRESS );  
    
    useEffect(() => {
        checkParent();
    },[account]);

    const checkParent = async() => {
        var wAddress = account;
        if(wAddress) {
            await contractInstance.methods         
            .fetchUserDetails(wAddress)
            .call({}, async function (error, res) {           
                console.log(res);
                if (res.parent === "0x0000000000000000000000000000000000000000") {   
                    console.log("No parent Found:"); 
                    setreferValid(0);         
                    return 0;
                } else {
                    console.log("Parent Found: "+res.parent);
                    setreferValid(1);
                    return 1;
                }
            });
        }
    }
    
    const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
    };
  
    const disconnect = () => {
        window.localStorage.setItem("provider", undefined);
        deactivate();
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ referer: refer, email: email })
            };
            const response = await fetch('https://airdrop-api.onrender.com/registerairdrop', requestOptions);
            const data = await response.json();
            console.log(data);
            if (data.code === 200) {
                setRefer("");
                setEmail("");
                setMessage(data.message);
                console.log("Success");
            } else {
                setMessage(data.detail);
                console.log("Some error occured: "+ data.detail);
            }
            /*let res = await fetch("https://airdrop-api.onrender.com/registerairdrop", {
                method: "POST",
                headers:{"Content-Type":"application/json","accept":"application/json"},
                body: JSON.stringify({
                referer: refer,
                email: email,
                }),
            });
            let resJson = await res.json();
            if (res.status === 200) {
                setRefer("");
                setEmail("");
                console.log("Success");
            } else {
                console.log("Some error occured");
            }*/
            console.log("Refer Code: "+refer);
            console.log("Email: "+ email);
        }  catch(err) {
            console.log(err);
        }
    };

    return(
        <>
        <div className="bg-[#0f1015] items-center justify-between h-16">
            <div className='flex items-center pl-8 pt-8'>
                <img style={{ height: '30px' }} src="/egold_logo_new.png" />
                <p className='hidden sm:block px-1 w-full text-xs text-[#fff]'></p>
            </div>
            <div className='relative flex flex-col items-center min-h-screen overflow-hidden h-full g-6 bg-[#0f1015]'>
            <div className="bg-[#25252f] flex flex-col items-center rounded-[20px] p-[30px] sm:w-[80%] md:w-[50%] lg:w-[50%] m-6">
                {
                    !active ? (
                        <button onClick={() => setShowModal(true)} className='text-white bg-[#3d3d73] px-6 py-2 rounded-lg'>Connect Wallet</button>
                    ) : (
                        <>
                        <div className='flex items-center'>
                            <p className='text-white mr-1 pr-1 font-bold text-[15px]'>Wallet: {truncateAddress(account)}</p>
                            <button onClick={() => {disconnect();}} className='text-white bg-[#3d3d73] px-6 py-2 rounded-lg'>Disconnect</button>
                        </div>
                        <div>
                            {
                                referValid ? (
                                    <>
                                        <h3 className='text-[#c4d2fa] mt-4'>ACCESS DENIED</h3>
                                    </>
                                ) : (
                                    <>
                                        <form onSubmit={handleSubmit}>
                                            <div className='flex flex-col mt-8'>
                                                <input 
                                                value={refer}
                                                type="text" 
                                                id="refer_code" 
                                                onChange={(e) => setRefer(e.target.value)}
                                                className='text-[#c4d2fa] bg-[#383855] rounded-lg p-2' placeholder="Enter your refer code" required />
                                                <input 
                                                value={email}
                                                type="email" 
                                                id="email" 
                                                onChange={(e) => setEmail(e.target.value)}
                                                className='text-[#c4d2fa] bg-[#383855] rounded-lg p-2 mt-4' placeholder="Enter your email" required />
                                                <button type="submit" className='text-white bg-[#3d3d73] px-6 py-2 rounded-lg mt-4'>Submit</button>
                                            </div>
                                        </form>
                                    </>
                                )
                            }
                        </div>
                        </>
                    )
                }
            </div>
            <h3 className='text-center text-[#c4d2fa] mt-4'>{message}</h3>
        </div>
        </div>
        {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-2xl text-center font-semibold">
                    Connect Using
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-[#aaa] text-[0.75rem] block outline-none focus:outline-none">
                      Close
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <ul>
                    <li className='popup_wallet_list'><a onClick={() => {activate(connectors.Injected);setProvider("Injected");setShowModal(false);}} className='popup_walletconnect popup_wallet_icon cursor-pointer'>Metamask <img src='/metamaxicon.png' /></a></li>
                    <li className='popup_wallet_list'><a onClick={() => {activate(connectors.walletConnect);setProvider("WalletConnect");setShowModal(false);}} className='cursor-pointer popup_walletconnect popup_wallet_icon'>WalletConnect <img src='/walletconnecticon.png' /></a></li>
                    <li className='popup_wallet_list'><a onClick={() => {activate(connectors.Injected);setProvider("Injected");setShowModal(false);}} className='popup_walletconnect popup_wallet_icon'>TrustWallet <img src='/trustwallet.png' /></a></li>
                    <li className='popup_wallet_list'><a onClick={() => {activate(connectors.bsc);setProvider("bsc");setShowModal(false);}} className='cursor-pointer popup_walletconnect popup_wallet_icon'>Binance chain Wallet <img src='/binanceicon.png' /></a></li>
                    <li className='popup_wallet_list'><a onClick={() => {activate(connectors.Injected);setProvider("Injected");setShowModal(false);}} href='#' className='popup_walletconnect popup_wallet_icon'>SafePal Wallet <img src='/safewallet.png' /></a></li>
                    <li className='popup_wallet_list'><a onClick={() => {activate(connectors.Injected);setProvider("Injected");setShowModal(false);}} href='#' className='popup_walletconnect popup_wallet_icon'>TokenPocket <img src='/tokenpocketicon.png' /></a></li>
                    <li className='popup_wallet_list'><a onClick={() => {activate(connectors.Injected);setProvider("Injected");setShowModal(false);}} href='#' className='popup_walletconnect popup_wallet_icon'>Other Web3 Wallets <img src='/webwalleticon.png' /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        </>
    )
}

export default Header;