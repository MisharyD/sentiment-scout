import React from "react";
import Button from "@mui/material/Button";
function AuthButton(props) {
  return (
    <Button
      variant="contained"
      disabled={!props.canSubmit}
      type='submit'
      sx={{
        width: "79%", // Set the width of the input field
        height: "6.34%",
        borderTopLeftRadius: "30px", // Top-left corner radius
        borderTopRightRadius: "20px", // Top-right corner radius
        borderBottomLeftRadius: "20px", // Bottom-left corner radius
        borderBottomRightRadius: "30px", // Bottom-right corner radius
        marginBottom: "3.7%",
        marginTop: props.marginTop,
        fontSize: "20px", // Set the text size
        color: "#1D1D1F", // Set text color
        textTransform: "none",
        backgroundColor: "#D8E9F8", // Set button background color
        fontSize: "22px", // Set the text size to 22px
        fontWeight: 600,
        
        "&:hover": {
          // Change background color on hover
          backgroundColor: "#6EBAFF",
        },

        "&:focus": {
          outline: "none", // Remove the default focus outline
          boxShadow: "none", // Remove box-shadow on focus
        },
        "&:active": {
          outline: "none", // Remove the default active outline
          boxShadow: "none", // Remove box-shadow on active
        },
      }}
    >
      {props.text}
    </Button>
  );
}

export default AuthButton;
