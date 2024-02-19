import React from 'react'
import { AlpacaProvider } from "../../context/Broker/Alpaca";
import { AlpacaContent } from "./components"

interface indexProps {

}

export const Alpaca: React.FC<indexProps> = ({ }) => {
	return (
		<AlpacaProvider>
			<AlpacaContent />
		</AlpacaProvider>
	);
}