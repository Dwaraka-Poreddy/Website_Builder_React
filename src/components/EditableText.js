import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft";
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter";
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InputBase from "@material-ui/core/InputBase";
// import TextField from "@material-ui/core/TextField";

const useStylesVerticalDividors = makeStyles((theme) => ({
  root: {
    margin: "0 auto",
    width: "fit-content",
    color: "inherit",
    backgroundColor: "inherit",
    borderColor: "inherit",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: theme.palette.background.paper,
    // color: theme.palette.text.secondary,
    "& svg": {
      margin: theme.spacing(0.0)
    },
    "& hr": {
      margin: theme.spacing(0, 0)
    }
  }
}));

const EditableInput = (props) => {
  // We use hooks to declare "initial" states
  const inputRef = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState(props.text);
  const [isMousedOver, setMouseOver] = useState(false);
  const [VD, setVD] = useState(false);
  const classesVerticalDividors = useStylesVerticalDividors();
  const [isbold, SetIsBold] = useState(false);
  const [isItalic, SetIsItalic] = useState(false);
  const [isUnderLine, SetIsUnderLine] = useState(false);
  const [isLeftAlign, SetIsLeftAlign] = useState(false);
  const [isCenterAlign, SetIsCenterAlign] = useState(false);
  const [isRightAlign, SetIsRightAlign] = useState(false);

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  function handleClick() {
    setInputVisible(true);
    setVD(!VD);
  }
  function HandleBold() {
    SetIsBold(!isbold);
  }
  function HandleItalic() {
    SetIsItalic(!isItalic);
  }
  function HandleUnderLine() {
    SetIsUnderLine(!isUnderLine);
  }
  function HandleLeftAlign() {
    SetIsLeftAlign(true);
    SetIsCenterAlign(false);
    SetIsRightAlign(false);
  }
  function HandleCenterAlign() {
    SetIsCenterAlign(true);
    SetIsRightAlign(false);
    SetIsLeftAlign(false);
  }
  function HandleRightAlign() {
    SetIsRightAlign(true);
    SetIsCenterAlign(false);
    SetIsLeftAlign(false);
  }

  function onClickOutSide(e) {
    // Check if user is clicking outside of <input>
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setInputVisible(false);
      setMouseOver(false);
      setVD(false);
      // Disable text input
    }
  }

  useEffect(() => {
    // Handle outside clicks on mounted state
    if (inputVisible) {
      document.addEventListener("mousedown", onClickOutSide);
    }

    // This is a necessary step to "dismount" unnecessary events when we destroy the component
    return () => {
      document.removeEventListener("mousedown", onClickOutSide);
    };
  });

  return (
    <React.Fragment>
      {VD === true ? (
        <div>
          <Grid
            container
            alignItems="center"
            className={classesVerticalDividors.root}
          >
            <FormatAlignLeftIcon onClick={HandleLeftAlign} />
            <FormatAlignCenterIcon onClick={HandleCenterAlign} />
            <FormatAlignRightIcon onClick={HandleRightAlign} />
            <Divider orientation="vertical" flexItem />
            <FormatBoldIcon onClick={HandleBold} />
            <FormatItalicIcon onClick={HandleItalic} />
            <FormatUnderlinedIcon onClick={HandleUnderLine} />
          </Grid>
        </div>
      ) : null}

      {inputVisible ? (
        <InputBase
          // id="outlined-multiline-static"
          multiline
          variant="outlined"
          fullWidth
          // size="medium"
          style={{
            fontSize: "inherit",
            backgroundColor: "inherit",
            color: "inherit",
            border: "0.001px solid ",
            borderRadius: "5px"
          }}
          ref={inputRef} // Set the Ref
          value={text} // Now input value uses local state
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      ) : (
        <span
          style={{ border: isMousedOver ? "1.25px dashed " : null }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
        >
          {text}
        </span>
      )}
    </React.Fragment>
  );
};

export default EditableInput; // We got our component!
