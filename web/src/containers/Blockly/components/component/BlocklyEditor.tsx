import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import BlocklyToolbox from './BlocklyToolbox'
import BlocklyWorkspace from './BlocklyWorkspace'

const BlockPropType = PropTypes.shape({
    type: PropTypes.string,
    shadow: PropTypes.bool,
    fields: PropTypes.object,
    values: PropTypes.object,
    statements: PropTypes.object,
    next: PropTypes.object,
    mutation: PropTypes.shape({
        attributes: PropTypes.object,
        innerContent: PropTypes.string,
    }),
});

const categoryPropsNonRecursive = {
    type: PropTypes.string,
    name: PropTypes.string,
    custom: PropTypes.string,
    colour: PropTypes.string,
    blocks: PropTypes.arrayOf(BlockPropType),
};

const CategoryPropType = PropTypes.shape({
    ...categoryPropsNonRecursive,
    categories: PropTypes.arrayOf(PropTypes.shape(categoryPropsNonRecursive)),
});


const propTypes = {
    initialXml: PropTypes.string,
    workspaceConfiguration: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    wrapperDivClassName: PropTypes.string,
    toolboxCategories: PropTypes.arrayOf(CategoryPropType.isRequired),
    toolboxBlocks: PropTypes.arrayOf(BlockPropType.isRequired),
    xmlDidChange: PropTypes.func,
    workspaceDidChange: PropTypes.func,
    onImportXmlError: PropTypes.func,
    processToolboxCategory: PropTypes.func,
};

const defaultProps = {
    initialXml: null,
    workspaceConfiguration: null,
    wrapperDivClassName: null,
    toolboxCategories: null,
    toolboxBlocks: null,
    xmlDidChange: null,
    workspaceDidChange: null,
    onImportXmlError: null,
    processToolboxCategory: null,
};

export const BlocklyEditor = (props) => {
    const [toolbox, setToolbox] = React.useState<any>()
    const [workspace, setWorkspace] = React.useState<any>()

    React.useEffect(() => {
        toolboxDidUpdate()

        if (props.xmlDidChange) {
            if (typeof console !== 'undefined') {
                // eslint-disable-next-line no-console
                console.error('Warning: xmlDidChange is deprecated and will be removed in future versions! Please use workspaceDidChange instead.')
            }
        }

        if (workspace) {
            if ((props.toolboxBlocks
                && !Immutable.fromJS(props.toolboxBlocks).equals(Immutable.fromJS(workspace.toolboxBlocks))
            ) || (
                    props.toolboxCategories
                    && !Immutable.fromJS(props.toolboxCategories).equals(Immutable.fromJS(workspace.toolboxCategories))
                )
            ) {
                toolboxDidUpdate()
            }
        }

    }, [workspace])

    const toolboxDidUpdate = () => {
        const workspaceConfiguration = props.workspaceConfiguration || {}
        if (workspace && !workspaceConfiguration.readOnly) {
            workspace.toolboxDidUpdate(toolbox.getRootNode())
        }
    }

    const xmlDidChange = (newXml) => {
        if (props.xmlDidChange) {
            props.xmlDidChange(newXml)
        }
    }

    const workspaceDidChange = (workspace) => {
        if (props.workspaceDidChange) {
            props.workspaceDidChange(workspace)
        }
    }

    const importFromXml = (xml) => workspace.importFromXml(xml)

    const resize = () => {
        workspace.resize()
    }

    let toolboxMode
    if (props.toolboxCategories) {
        toolboxMode = 'CATEGORIES'
    } else if (props.toolboxBlocks) {
        toolboxMode = 'BLOCKS'
    }

    return (
        <div className={props.wrapperDivClassName}>
            <BlocklyToolbox
                ref={(toolbox) => {
                    console.log(toolbox)
                    setToolbox(toolbox)
                }}
                categories={Immutable.fromJS(props.toolboxCategories)}
                blocks={Immutable.fromJS(props.toolboxBlocks)}
                didUpdate={toolboxDidUpdate}
                processCategory={props.processToolboxCategory}
            />
            <BlocklyWorkspace
                ref={(workspace) => {
                    setWorkspace(workspace)
                }}
                initialXml={props.initialXml}
                onImportXmlError={props.onImportXmlError}
                toolboxMode={toolboxMode}
                xmlDidChange={xmlDidChange}
                workspaceDidChange={workspaceDidChange}
                wrapperDivClassName={props.wrapperDivClassName}
                workspaceConfiguration={props.workspaceConfiguration}
            />
        </div>
    )
}

BlocklyEditor.propTypes = propTypes
BlocklyEditor.defaultProps = defaultProps

export default BlocklyEditor
