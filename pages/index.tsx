import type { NextPage } from "next"
import useWindowSize from "react-use/lib/useWindowSize"
import Header from "../components/Header"
import { useMoralis } from "react-moralis"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import Confetti from "react-confetti"
import { Moralis } from "moralis"
import { Button } from "@mui/material"
import BeccaNFT from "../components/BeccaNFT"

const Home: NextPage = () => {
    const { width, height } = useWindowSize()
    const { isWeb3Enabled, chainId } = useMoralis()
    const isMainnet = chainId == "0x1"
    return (
        <div className={styles.container}>
            <Header />
            {isWeb3Enabled ? (
                <div>
                    <Confetti width={width} height={height} />
                    <Head>
                        <title>Bex NFT</title>
                        <meta name="description" content="Becca Boooooooooo" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    {isMainnet ? (
                      <div className="flex flex-wrap justify-center">
                        <BeccaNFT/>
                        </div>
                    ) : (
                        <div>
                            Please connected to a supported chain (Mainnet)!
                            <Button
                                onClick={() => {
                                    Moralis.switchNetwork("0x1")
                                    window.location.reload()
                                }}
                                variant="contained"
                            >
                                Change to Mainnet
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="p-5 flex flex-row justify-between items-center font-montserrat">
                    Please Install and Connect to Wallet
                </div>
            )}
        </div>
    )
}

export default Home
