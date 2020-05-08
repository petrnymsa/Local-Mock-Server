import React, { useState, useEffect } from "react";
import Sheet from "../../components/Sheet";
import Label from "../../components/Label";
import TextBox from "../../components/TextBox";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";

import "./ReqForm.css";

const ReqForm = ({
  onsubmit,
  reqMethodProp,
  reqPathProp,
  resStatusProp,
  resBodyProp
}) => {
  const [reqMethod, setReqMethod] = useState(reqMethodProp ?? "");
  const [reqPath, setReqPath] = useState(reqPathProp ?? "");
  const [resStatus, setResStatus] = useState(resStatusProp ?? "");
  const [resBody, setResBody] = useState(resBodyProp ?? "");
  const [formError, setFormError] = useState("");

  const onButtonClick = () => {
    if (reqMethod && reqPath && resStatus && resBody) {
      try {
        const JSONResBody = JSON.stringify(JSON.parse(resBody), null, 2);
        onsubmit({
          reqMethod,
          reqPath,
          resStatus,
          resBody: JSONResBody
        });
        setFormError("");
      } catch (err) {
        setFormError("* Response Body JSON format not valid");
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
    <Sheet>
      <div className="sheet-inner">
        <Label fontSize={"24px"} color={"white"}>
          Request :
          <span className="sheet-inner-info">
            (To acces mock server hit port 8000 Ex: http://localhost:8080/users)
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
          <TextArea
            rows={25}
            placeholder="Paste the response JSON Body here"
            onChange={e => {
              setResBody(e.target.value);
            }}
            value={resBody}
          ></TextArea>
        </div>
        {formError && <div className="sheet-error">{formError}</div>}
        <div className="sheet-button">
          <Button onClick={onButtonClick}>CREATE/UPDATE</Button>
        </div>
      </div>
    </Sheet>
  );
};

export default ReqForm;