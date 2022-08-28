import { Box, makeStyles, styled } from "@mui/material";
import React from "react";
import { Page } from "../../constants/page";
import Footer from "../elements/Footer";
import Header from "../elements/Header";

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const Content = styled("div")(({ theme }) => ({
  paddingBottom: "150px",
}));

const MainTemplate: React.FC<MainTemplateProps> = ({ page, children }) => {
  return (
    <Root>
      <Header name={page.name} />
      <Content>{children}</Content>
      <Footer page={page} />
    </Root>
  );
};

export interface MainTemplateProps {
  page: Page;
  children: React.ReactNode;
}

export default MainTemplate;
