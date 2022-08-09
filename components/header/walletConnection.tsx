import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { setAddress, toggleModal } from "../../redux/slices/walletSlice";

export const getShortAddress = (address: string) => {
	if (address.length === 42 && address.slice(0, 2) === "0x") {
		const length = address.length;
		return address.slice(0, 5) + "..." + address.slice(length - 4, length);
	} else {
		return address;
	}
};

const ConnectWallet = () => {
	const dispatch = useAppDispatch();
	const { address } = useAppSelector((state) => state.wallet);

	const toggleWallet = async () => {
		if (address === "") {
			const providerOptions = {
				walletconnect: {
					package: WalletConnectProvider, // required
					options: {
						infuraId: process.env.INFURA_ID, // required
					},
				},
			};
			// A Web3Provider wraps a standard Web3 provider, which is
			// what MetaMask injects as window.ethereum into each page
			const web3Modal = new Web3Modal({
				network: "mainnet", // optional
				cacheProvider: true, // optional
				providerOptions, // required
			});
			const instance = await web3Modal.connect();
			const provider = new ethers.providers.Web3Provider(instance);
			// subscribeToEvents(provider);
			const signer = provider.getSigner();
			const newAddress = await signer.getAddress();
			const ensName = await provider.lookupAddress(newAddress);
			if (ensName) {
				dispatch(setAddress(ensName));
			} else {
				dispatch(setAddress(newAddress));
			}
		} else {
			dispatch(toggleModal());
		}
	};

	return (
		<div
			className="absolute right-6 top-6 sm:relative sm:right-0 sm:top-0 flex justify-center items-center cursor-pointer bg-blue-500 hover:bg-blue-400 px-8 h-12 rounded-full"
			onClick={toggleWallet}
		>
			<h2 className="text-white text-md lg:text-lg">
				{address !== "" ? getShortAddress(address) + "" : "Connect Wallet"}
			</h2>
		</div>
	);
};

export default ConnectWallet;
