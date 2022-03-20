import React from 'react'
import Link from 'next/link'
import HeaderDashboard from '../../components/HeaderDashboard'

function eth2() {
  return (
    <div>
        <HeaderDashboard />
        <div className="banner flex justify-center items-center py-10 px-2">
            <div className="md:flex container justify-between items-center space-y-5">
                <div>
                    <h2 className="text-lg md:text-4xl font-bold text-white">Binance Staking - BNB 2.0</h2>
                    <p className="text-gray-400 font-medium text-base md:text-xl my-5">Safe and secure BNB staking. Up to 200% APY.</p>
                    <Link href={'/dashboard/account-overview'}>
                    <button className="px-12 py-2.5 rounded-md text-sm font-semibold text-gray-700 bg-primary">Stake Now</button>
                    </Link>
                </div>
                <div className="w-full md:w-96 h-40 flex justify-center items-center border-t-2 border-primary2 bg-[#0b0e11cf]">
                    <div className="w-[90%] flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 font-medium font-med my-2">Cumulative Yield <br /><span className="text-white">0.00000000 BETH</span></p>
                            <p className="text-primary_dim underline text-sm">BETH Position</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-medium font-med my-2">Last Day Yield <br /><span className="text-green-600">0.00000000 BETH</span></p>
                            <p className="text-primary_dim underline text-sm">Distribution Record</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        {/* CONTENT BODY --------------------------------------------------------------------------------- */}
        <div className="content py-10 bg-gray-50">
            <div className="container px-5">
                <h2 className="text-2xl font-bold text-gray-700 mt-5">Process</h2>
                <ul className="pb-2 max-w-5xl">
                    <li className="list_item">
                        <div className="list_header">
                            <span className="list_number_container">
                                <span className="list_number">1</span>
                            </span>
                            <p className="text-xl font-semibold">Stake BNB</p>
                        </div>
                        <p className="list_text_content">
                            Seamless one-click BNB 2.0 staking with minimal requirements 
                            and maximum returns. Your stake cannot be redeemed during the 
                            first phase, it may take more than 2 years. Binance tokenizes 
                            BETH as the only proof of your staked BNB in a 1:1 ratio.
                        </p>
                    </li>
                    <li className="list_item">
                        <div className="list_header">
                            <span className="list_number_container">
                                <span className="list_number">2</span>
                            </span>
                            <p className="text-xl font-semibold">Rewards Distribution</p>
                        </div>
                        <p className="list_text_content">
                            We regularly distribute on-chain rewards to all participants 
                            based on their BETH position. The on-chain rewards will be 
                            distributed in the form of BETH to users' Spot accounts.
                        </p>
                    </li>
                    <li className="list_item">
                        <div className="list_header">
                            <span className="list_number_container">
                                <span className="list_number">3</span>
                            </span>
                            <p className="text-xl font-semibold">Redeem BNB <br /><span className="text-gray-600 font-normal text-sm">To be  confirmed.</span></p>
                        </div>
                        <p className="list_text_content">
                            We regularly distribute on-chain rewards to all participants 
                            based on their BETH position. The on-chain rewards will be 
                            distributed in the form of BETH to users' Spot accounts.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
        {/* FAQ ----------------------------------  */}
        <div className="content py-10">
            <div className="container">
                <h2 className="text-3xl text-gray-800 font-semibold my-6">FAQ</h2>
                <div className="content_body mt-10">
                    <ol className='my-7'>
                        <li>
                            <h2 className="text-gray-700 font-medium"><strong>1.</strong> What is ETH2.0?</h2>
                            <p className="text-sm text-gray-500 my-2">
                                BNB 2.0 is the long-awaited upgrade to the Ethereum
                                network that promises, among other things, to improve
                                the network’s scalability, speed, efficiency, and
                                sustainability without sacrificing security and decentralization.
                                The BNB community aims to achieve this by rolling out several
                                updates in three phases.
                            </p>
                        </li>
                        <li className="divider my-5"></li>
                        <li>
                            <h2 className="text-gray-700 font-medium"><strong>2.</strong> When can I redeem my staked BNB?</h2>
                            <p className="text-sm text-gray-500 my-2">
                                Staked BNB cannot be redeemed until Shard Chains are
                                fully implemented. This means that your BNB will remain
                                staked during Phase One until complete. However, Binance
                                tokenizes BETH for users that represents your staked BNB
                                on a 1:1 basis, to keep using your locked assets for trading
                                and withdrawals. You can change BETH back to BNB when BNB 2.0
                                Phase One goes live, then you'll receive the amount of BNB equal
                                to your current BETH holdings.
                            </p>
                        </li>
                        <li className="divider my-5"></li>
                        <li>
                            <h2 className="text-gray-700 font-medium"><strong>3.</strong> How is the APY calculated?</h2>
                            <p className="text-sm text-gray-500 my-2">
                                The APY isn't calculated by Binance. The whole staking process
                                including staking rewards depends on the BNB network. The more
                                BNB is staked, the lower the APY will be. We will redistribute
                                100% of all on-chain rewards to our users.
                            </p>
                        </li>
                        <li className="divider my-5"></li>
                        <li>
                            <h2 className="text-gray-700 font-medium"><strong>4.</strong> What is BETH, and how does it work?</h2>
                            <p className="text-sm text-gray-500 my-2">
                                BETH is a tokenized asset representing your staked BNB on a 1:1 basis.
                                You can swap your staked BNB to BETH and leverage your earnings potential.
                                BETH can do everything that BNB does, and you can use it for trading, withdrawals, etc.
                                You can swap your BETH holdings back to BNB when BNB 2.0 mainnet goes live, and you'll
                                receive BNB equal to your BETH holdings.
                            </p>
                        </li>
                        <li className="divider my-5"></li>
                        <li>
                            <h2 className="text-gray-700 font-medium"><strong>5.</strong> Where can I view my staking balance?</h2>
                            <p className="text-sm text-gray-500 my-2">
                                Your staked BNB balance can be viewed after logging in to your
                                Binance account and navigating to the Spot wallet.
                            </p>
                        </li>
                        <li className="divider my-5"></li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
  )
}

export default eth2