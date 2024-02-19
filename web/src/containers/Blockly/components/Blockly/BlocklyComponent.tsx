import React from "react"
import Blockly from "blockly/core"
import locale from 'blockly/msg/en'
import 'blockly/blocks'
import './Blockly.css'

Blockly.setLocale(locale)

interface Props {
    readOnly: boolean
    trashcan: boolean
    media: string
    move: {
        scrollbars: boolean
        drag: boolean
        wheel: boolean
    }
    initialXml: any
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            xml: any
        }
    }
}

export const BlocklyComponent: React.FC<Props> = (props) => {
    const { children } = props
    let blocklyDiv = React.useRef()
    let toolbox = React.useRef()

    React.useEffect(() => {
        const { initialXml, ...rest } = props
        let primaryWorkspace = Blockly.inject(
            blocklyDiv.current,
            {
                toolbox: toolbox.current,
                ...rest
            },
        )

        if (initialXml) {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), primaryWorkspace)
        }
    }, [])

    return (
        <React.Fragment>
            <div ref={blocklyDiv} id="blocklyDiv" />
            <xml
                xmlns="https://developers.google.com/blockly/xml"
                is="blockly"
                style={{ display: 'none' }}
                ref={toolbox}
            >
                {children}
            </xml>
        </React.Fragment>
    )
}