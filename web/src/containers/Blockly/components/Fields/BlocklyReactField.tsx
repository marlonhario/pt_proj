import React from 'react'
import Blockly from 'blockly/core'

class BlocklyReactField extends Blockly.Field {

    static fromJson(options: any) {
        return new BlocklyReactField(options['text'])
    }

    render() {
        return <FieldRenderComponent />
    }
}

const FieldRenderComponent = () => {
    return (
        <div style={{ color: '#fff' }}>
            Hello from React!
        </div>
    )
}

Blockly.fieldRegistry.register('field_react_component', BlocklyReactField)

export default BlocklyReactField