import React from "react";
import {
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const LoginContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "64px",
});

const LoginTitle = styled(Typography)({
  marginBottom: "16px",
});

const LoginForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "300px",
});

const LoginInput = styled("input")({
  marginBottom: "16px",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  fontSize: "16px",
});

const LoginButton = styled(Button)({
  backgroundColor: "#1976d2",
  color: "#fff",
});

function LoginPage() {
  return (
    <LoginContainer>
      <LoginTitle variant="h4">Login</LoginTitle>
      <LoginForm>
        <LoginInput type="text" placeholder="Username" />
        <LoginInput type="password" placeholder="Password" />
        <LoginButton variant="contained">Login</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default LoginPage;
