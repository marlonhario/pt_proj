import React from "react"
import { BlocklyDev } from "./components/component/dev-index"

export const BlocklyPage = () => {
    return (
        <>
            <div style={{ height: 600, width: 800 }} id="blockly">
                <BlocklyDev />
                <textarea
                    id="code"
                    style={{ height: 200, width: 400, marginTop: 20 }}
                    defaultValue=""
                ></textarea>
            </div>
        </>
    )
}