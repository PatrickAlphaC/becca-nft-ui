import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
    return (
        <nav className="p-5 flex flex-row justify-between items-center font-montserrat bg-gradient-to-r from-yellow-200 to-red-600  rounded-lg">
            <Link href="/">
                <a>
                    <h1 className="py-4 px-4 font-bold text-3xl">Happy Birthday Becca!</h1>
                </a>
            </Link>
            <div className="flex flex-row">
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
