import { Card, Tooltip, Illustration } from "web3uikit"

import {useWeb3Contract} from "react-moralis"
import { useState, useEffect } from "react"
import nftAbi from "../constants/BasicNft.json"

export default function BeccaNFT() {
    const [imageURI, setImageURI] = useState<string | undefined>()

    // We just gonna hard code it
    const nftAddress = "0xe41b658481db72b02089bc514d18207a14aefbc5"

    const { runContractFunction: getTokenURI, data: tokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: 0,
        },
    })

    async function updateUI() {
        console.log(`TokenURI is: ${tokenURI}`)
        // We are cheating a bit here...
        if (tokenURI) {
            const requestURL = (tokenURI as string).replace("ipfs://", "https://ipfs.io/ipfs/")
            const tokenURIResponse = await (await fetch(requestURL)).json()
            const imageURI = (tokenURIResponse as any).image
            const imageURIURL = (imageURI as string).replace("ipfs://", "https://ipfs.io/ipfs/")
            setImageURI(imageURIURL)
        }
    }

    useEffect(() => {
        updateUI()
    }, [tokenURI])

    useEffect(() => {
        getTokenURI()
    }, [])

    return (
        <div className="p-2">
            <a href="https://opensea.io/assets/0xe41b658481db72b02089bc514d18207a14aefbc5/0">
            <Card title="Becca, Patrick, A Toaster... and an Alligator sometimes..." description="This NFT changes every year, check back next year!">
                <Tooltip content="View on Opensea" position="top">
                    <div className="p-2">
                        {imageURI ? (
                            <div className="flex flex-col items-end gap-2">
                                <img
                                    src={imageURI}
                                    height="500"
                                    width="500"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-1">
                                <Illustration height="180px" logo="lazyNft" width="100%" />
                                Loading...
                            </div>
                        )}
                    </div>
                </Tooltip>
            </Card>
            </a>
        </div>
    )
}
