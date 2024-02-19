import React from 'react'
import PropTypes from 'prop-types'

interface Props {
    text: any
    callbackKey: any
}

class BlocklyToolboxButton extends React.PureComponent<Props> {
    static propTypes = {
        text: PropTypes.string.isRequired,
        callbackKey: PropTypes.string.isRequired,
    }

    static renderButton = (button, key) => {
        return (
            <BlocklyToolboxButton
                key={key}
                text={button.get('text')}
                callbackKey={button.get('callbackKey')}
            />
        )
    }

    render = () => (
        <button
            text={this.props.text}
            callbackkey={this.props.callbackKey}
        />
    )
}

export default BlocklyToolboxButton
