import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import ChevronDownIcon from "mdi-react/ChevronDownIcon";
import HamburgerIcon from "mdi-react/HamburgerIcon";
import FileIcon from "mdi-react/FileIcon";
import ArrowLeftBoldIcon from "mdi-react/ArrowLeftBoldIcon";
import ArrowRightBoldIcon from "mdi-react/ArrowRightBoldIcon";
import CloudUploadIcon from "mdi-react/CloudUploadIcon";
import CloseIcon from "mdi-react/CloseIcon";
import CogIcon from "mdi-react/CogIcon";
// interface Props {
//   onFileChange: any;
//   downloadFile: any;
// }

export const EditorDropdownBtn = ({
  onFileChange,
  downloadFile,
  fileRef,
}): any => {
  return (
    <UncontrolledDropdown>
      <DropdownToggle className="icon icon--right">
        <p>
          <HamburgerIcon /> <ChevronDownIcon />
        </p>
      </DropdownToggle>
      <DropdownMenu className="dropdown__menu" style={{ width: "250px" }}>
        {/* <DropdownItem>
          <FileIcon />
          <input type="file" onChange={(e) => onFileChange(e)} />
          Upload Strategy
        </DropdownItem> */}
        <DropdownItem>
          {/* <label htmlFor="file-upload" className="custom-file-upload">
            <i className="fa fa-cloud-upload"></i> Upload Strategy
          </label>
          <input id="file-upload" type="file" /> */}
          {/* <FileIcon /> */}
          {/* <label htmlFor="file-upload" className="custom-file-upload">
            <i className="fa fa-cloud-upload"></i> Upload Strategy
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={onFileChange}
            ref={fileRef}
          /> */}
        </DropdownItem>
        <DropdownItem onClick={downloadFile}>
          <FileIcon /> Download Strategy
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <ArrowRightBoldIcon /> Load next from the Collection
        </DropdownItem>
        <DropdownItem>
          <ArrowLeftBoldIcon /> Load previous from the Collection
        </DropdownItem>
        <DropdownItem>
          <CloudUploadIcon /> Import an Expert Advisor back
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <CloseIcon /> Remove current version
        </DropdownItem>
        <DropdownItem>
          <CloseIcon /> Remove other versions
        </DropdownItem>
        <DropdownItem>
          <CloseIcon /> Remove all versions
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem>
          <CogIcon /> Set as preset indicator
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
