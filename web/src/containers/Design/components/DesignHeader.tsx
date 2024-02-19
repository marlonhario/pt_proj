import React, { useContext, useState, useRef } from "react";
import {
  Button,
  Col,
  Label,
  Nav,
  NavItem,
  Navbar,
  NavbarToggler,
  Collapse,
  Input,
  FormGroup,
} from "reactstrap";
import { ContextDesign } from "../../../hooks/context/Context";
import { ActionDesign } from "./actionDesign";

export const DesignHeader: React.FC = () => {
  const { designState, designDispatch } = useContext(ContextDesign);
  let fileRef: any = useRef<HTMLInputElement>();
  const {
    handleDownloadStrategy,
    handleAddStrategy,
    handleNewStrategy,
  } = ActionDesign();

  const [isToggle, setIsToggle] = useState(false);
  const toggle = () => setIsToggle(!isToggle);

  const handleUploadStrategy = () => {
    let files = fileRef.current.files;

    if (files.length <= 0) {
      return false;
    }

    let fileReader = new FileReader();

    fileReader.onload = function (e: any) {
      const result = JSON.parse(e.target.result);

      designDispatch({
        type: "SET_ENTRY_EXIT_LIST",
        longEntryList: result["longEntryList"],
        longExitList: result["longExitList"],
        shortEntryList: result["shortEntryList"],
        shortExitList: result["shortExitList"],
      });
    };

    fileReader.readAsText(files.item(0));
  };

  return (
    <Col>
      <Navbar color="light" light expand="md">
        <h3>Design</h3>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isToggle} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <Nav className="justify-content-end" navbar>
            {/* Hide for this moment
            <NavItem className="nav-item-basket">
              <FormGroup style={{ margin: 0 }}>
                <Label
                  for="file-upload"
                  style={{
                    background: "#70bbfd",
                    border: "1px solid #transparent",
                    display: "inline-block",
                    paddingTop: 11,
                    paddingRight: 16,
                    paddingLeft: 16,
                    paddingBottom: 10,
                    cursor: "pointer",
                    color: "#fff",
                    fontSize: 14,
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 0,
                    lineHeight: 1.5,
                    borderRadius: 5,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  Upload Strategy
                </Label>
                <input
                  type="file"
                  name="file"
                  id="file-upload"
                  onChange={handleUploadStrategy}
                  ref={fileRef}
                />
              </FormGroup>
            </NavItem>
            <NavItem className="nav-item-basket">
              <Button
                className="icon"
                outline
                block
                onClick={handleDownloadStrategy}
              >
                Download Strategy
              </Button>
            </NavItem> */}
            <NavItem className="nav-item-basket">
              <Button
                className="icon"
                block
                onClick={handleAddStrategy}
                color="primary"
              >
                {designState.strategyId
                  ? "Update strategy in basket"
                  : "Add strategy to basket"}
              </Button>
            </NavItem>
            <NavItem className="nav-item-basket">
              <Button
                className="icon"
                block
                onClick={handleNewStrategy}
                color="danger"
              >
                New Strategy
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </Col>
  );
};
