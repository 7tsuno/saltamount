import { NextPage } from "next";
import Footer from "../components/elements/Footer";
import Header from "../components/elements/Header";
import MainTemplate from "../components/templates/MainTemplate";
import { PAGE } from "../constants/page";
import IndexPageContainer from "../containers/pages/IndexPageContainer";

const Index: NextPage = () => (
  <MainTemplate page={PAGE.index}>
    <IndexPageContainer />
  </MainTemplate>
);

export default Index;
