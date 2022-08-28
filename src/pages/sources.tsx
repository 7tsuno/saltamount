import { NextPage } from "next";
import Footer from "../components/elements/Footer";
import Header from "../components/elements/Header";
import MainTemplate from "../components/templates/MainTemplate";
import { PAGE } from "../constants/page";
import SourcesPageContainer from "../containers/pages/SourcesPageContainer";

const Sources: NextPage = () => (
  <MainTemplate page={PAGE.sources}>
    <SourcesPageContainer />
  </MainTemplate>
);

export default Sources;
