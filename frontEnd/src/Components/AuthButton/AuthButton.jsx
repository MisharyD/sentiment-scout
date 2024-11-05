import React from "react";
import Button from "@mui/material/Button";
function AuthButton(props) {
  return (
    <Button
      variant="contained"
      disabled={!props.canSubmit}
      type="submit"
      sx={{
        width: "79%", // Set the width of the input field
        height: "6.34%",
        borderTopLeftRadius: "30px", // Top-left corner radius
        borderTopRightRadius: "20px", // Top-right corner radius
        borderBottomLeftRadius: "20px", // Bottom-left corner radius
        borderBottomRightRadius: "30px", // Bottom-right corner radius
        marginBottom: "3.7%",
        marginTop: props.marginTop,
        fontSize: "22px", // Set the text size to 22px
        color: "white", // Set text color
        textTransform: "none",
        backgroundImage: "linear-gradient(45deg, #7b2ff7, #4bb0ff)", // Set button background color
        fontWeight: 600,

        // Optional: Add transition for smoother state changes
        transition: "background 0.3s ease, color 0.3s ease",

        "&:hover": {
          // Change background color on hover
          backgroundColor: "#6792c7fc",
          color: "white",
        },

        "&:focus": {
          outline: "none", // Remove the default focus outline
          boxShadow: "none", // Remove box-shadow on focus
        },
        "&:active": {
          // Apply linear gradient on active state
          backgroundImage: "linear-gradient(45deg, #7b2ff7, #4bb0ff)",
          backgroundColor: "transparent", // Ensure backgroundColor doesn't override the gradient
          color: "white",
          // Optional: Remove box-shadow or add specific styles if needed
          boxShadow: "none",
        },

        "&.Mui-disabled": {
          backgroundImage: "linear-gradient(45deg, rgba(123, 47, 247, 0.2), rgba(75, 176, 255, 0.2))", // Custom disabled background color
          color: "black", // Custom disabled text color
        },
      }}
    >
      {props.text}
    </Button>
  );
}

export default AuthButton;
