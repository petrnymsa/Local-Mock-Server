import "./ReqForm.css";

import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import ExpandIcon from "../../images/Expand.png";
import JSONViewer from "react-json-view";
import Label from "../../components/Label";
import MinimizeIcon from "../../images/Minimize.png";
import Sheet from "../../components/Sheet";
import TextArea from "../../components/TextArea";
import TextBox from "../../components/TextBox";
import { isStringifiedJSON } from "../../helpers";

const ReqForm = ({
  onsubmit,
  reqMethodProp,
  reqPathProp,
  resStatusProp,
  resBodyProp,
  createMockState,
  setCreateMockState
}) => {
  const [reqMethod, setReqMethod] = useState(reqMethodProp ?? "");
  const [reqPath, setReqPath] = useState(reqPathProp ?? "");
  const [resStatus, setResStatus] = useState(resStatusProp ?? "");
  const [resBody, setResBody] = useState(resBodyProp ?? JSON.stringify({}));
  const [formError, setFormError] = useState("");
  const [activeTab, setActiveTab] = useState("textview");
  const [goFullScreen, setGoFullScreen] = useState(false);
  const isObject = isStringifiedJSON(resBody);

  const onButtonClick = () => {
    if (reqMethod && reqPath && resStatus && resBody) {
      try {
        onsubmit({
          reqMethod,
          reqPath,
          resStatus,
          resBody
        });
        setFormError("");
      } catch (err) {
        setFormError("* Response Body JSON format not valid");
        setCreateMockState({
          successMessage: "",
          errorMessage: "",
          isLoading: false
        });
      }
    } else {
      setFormError("* All Fields are mandatory");
    }
  };

  useEffect(() => {
    setReqMethod(reqMethodProp);
    setReqPath(reqPathProp);
    setResStatus(resStatusProp);
    setResBody(resBodyProp);
  }, [reqMethodProp, reqPathProp, resStatusProp, resBodyProp]);

  return (
    <Sheet className="right-wrapper-sheet">
      <div className="sheet-inner">
        <div className="sheet-req-wrapper">
          <Label fontSize={"24px"} color={"white"}>
            Request :
            <span className="sheet-inner-info">
              (To acces mock server hit port 80 Ex:
              http://localhost:80/users)
            </span>
          </Label>
          <div className="sheet-request">
            <div>
              <TextBox
                placeholder="Method"
                onChange={e => {
                  setReqMethod(e.target.value);
                }}
                value={reqMethod}
              ></TextBox>
            </div>
            <div>
              <TextBox
                placeholder="Path (starting from / for ex: /users)"
                onChange={e => {
                  setReqPath(e.target.value);
                }}
                value={reqPath}
              ></TextBox>
            </div>
          </div>
        </div>
        <div className="sheet-response-code">
          <Label fontSize={"24px"} color={"white"}>
            Response Code :
          </Label>
          <TextBox
            placeholder="code"
            onChange={e => {
              setResStatus(e.target.value);
            }}
            value={resStatus}
          ></TextBox>
        </div>
        <div className="sheet-response-body">
          <Label fontSize={"24px"} color={"white"}>
            Response Body :
          </Label>
          <div className="response-body-wrapper">
            <div className="response-body-tabs">
              <span
                className={`${activeTab === "textview" ? "active" : ""}`}
                onClick={() => setActiveTab("textview")}
              >
                Text View
              </span>
              {isObject && (
                <span
                  className={`${activeTab === "treeview" ? "active" : ""}`}
                  onClick={() => setActiveTab("treeview")}
                >
                  Tree View
                </span>
              )}
            </div>
            <div
              className={`response-body ${
                goFullScreen ? "response-boy-full-screen" : ""
              }`}
            >
              <img
                className="go-full-screen-button"
                src={goFullScreen ? MinimizeIcon : ExpandIcon}
                alt="+"
                title={goFullScreen ? "Minimize" : "Maximize"}
                onClick={() => setGoFullScreen(!goFullScreen)}
              />
              {activeTab === "textview" ? (
                <TextArea
                  placeholder="Paste the response JSON Body here"
                  onChange={e => {
                    setResBody(e.target.value);
                  }}
                  value={resBody}
                ></TextArea>
              ) : (
                <div className="tree-view-wrapper">
                  <JSONViewer
                    src={JSON.parse(resBody)}
                    theme="ocean"
                    displayDataTypes={false}
                    // enableClipboard={false}
                    displayObjectSize={false}
                    collapsed={1}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="sheet-button">
          <div className="sheet-error">
            {formError && <span>{formError}</span>}
            {createMockState.successMessage && (
              <span className="sheet-success">
                {createMockState.successMessage}
              </span>
            )}
            {createMockState.errorMessage && (
              <span>{createMockState.errorMessage}</span>
            )}
          </div>
          <Button onClick={onButtonClick}>{`CREATE/UPDATE${
            createMockState.isLoading ? "...." : ""
          }`}</Button>
        </div>
      </div>
    </Sheet>
  );
};

export default ReqForm;
