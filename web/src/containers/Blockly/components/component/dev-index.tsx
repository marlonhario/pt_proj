import React from "react";
import Blockly from "blockly";

import ReactBlockly from "./index";
import ConfigFiles from "./content/content";
import parseWorkspaceXml from "./BlocklyHelper";

declare global {
  interface Window {
    ActiveXObject: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      xml: any;
      sep: any;
      search: any;
      value: any;
      field: any;
      statement: any;
      mutation: any;
      next: any;
      shadow: any;
      block: any;
      category: any;
    }
  }
}

declare module 'react' {
  interface Attributes {
    text?: string;
    callbackkey?: any;
  }
}

export const BlocklyDev = () => {
  const [toolboxCategories, setToolboxCategories] = React.useState<any>(
    parseWorkspaceXml(ConfigFiles.INITIAL_TOOLBOX_XML)
  );

  React.useEffect(() => {
    window.setTimeout(() => {
      setToolboxCategories(
        toolboxCategories.concat([
          {
            blocks: [
              { type: "text" },
              {
                type: "text_print",
                values: {
                  TEXT: {
                    type: "text",
                    shadow: true,
                    fields: {
                      TEXT: "abc",
                    },
                  },
                },
              },
            ],
          },
        ])
      );
    }, 2000);

    window.setTimeout(() => {
      setToolboxCategories([
        ...toolboxCategories.slice(0, toolboxCategories.length - 1),
        {
          ...toolboxCategories[toolboxCategories.length - 1],
          blocks: [{ type: "text" }],
        },
      ]);
    }, 4000);

    window.setTimeout(() => {
      setToolboxCategories(
        toolboxCategories.slice(0, toolboxCategories.length - 1)
      );
    }, 10000);
  }, []);

  const workspaceDidChange = (workspace) => {
    workspace.registerButtonCallback("myFirstButtonPressed", () => {
      alert("button is pressed");
    });
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    // document.getElementById('generated-xml').innerText = newXml;

    const code = (Blockly as any).JavaScript.workspaceToCode(workspace);
    (document.getElementById("code") as HTMLInputElement).value = code;
  };

  return (
    <>
      <ReactBlockly
        toolboxCategories={toolboxCategories}
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: "#ccc",
            snap: true,
          },
        }}
        initialXml={ConfigFiles.INITIAL_XML}
        wrapperDivClassName="fill-height"
        workspaceDidChange={workspaceDidChange}
      />
    </>
  );
};
