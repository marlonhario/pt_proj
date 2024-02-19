import React, { useContext } from "react"
import { ContextMarketDetail } from "../../../hooks/context/Context"

export const DetailFinancial: React.FC = () => {
    const { marketDetailState } = useContext(ContextMarketDetail);

    return (
        <iframe
            width={620}
            height={1000}
            frameBorder={0}
            style={{ marginLeft: -8 }}
            srcDoc={`
                <!DOCTYPE html>
                <html>
                    <head></head>
                    <body>
                        <div class="tradingview-widget-container">
                            <div class="tradingview-widget-container__widget"></div>
                            <script 
                                type="text/javascript" 
                                src="https://s3.tradingview.com/external-embedding/embed-widget-financials.js" 
                                async
                            >
                            {
                                "symbol": "NASDAQ:${marketDetailState.input_symbols}",
                                "width": 595,
                                "height": 800,
                                "colorTheme": "light",
                                "isTransparent": false,
                                "locale": "en"
                            }
                            </script>
                        </div>
                    </body>
                </html>
            `}
        />
    )
}