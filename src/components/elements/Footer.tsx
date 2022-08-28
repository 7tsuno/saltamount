import { Calculate, List } from "@mui/icons-material";
import {
  BottomNavigation,
  BottomNavigationAction,
  Divider,
  styled,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { PAGE, Page } from "../../constants/page";

const FooterArea = styled("div")({
  position: "fixed",
  bottom: "0",
  width: "100%",
});

const Footer: React.FC<FooterProps> = ({ page }) => {
  const router = useRouter();
  const onChange = useCallback(
    (_event: any, newValue: any) => {
      router.push(newValue);
    },
    [router]
  );

  return (
    <FooterArea>
      <Divider sx={{ bgcolor: "#888", opacity: "0.5" }} />
      <BottomNavigation showLabels value={page.path} onChange={onChange}>
        <BottomNavigationAction
          value={PAGE.index.path}
          icon={
            <Calculate
              sx={{
                fontSize: page.path === PAGE.index.path ? 30 : 20,
                color:
                  page.path === PAGE.index.path ? "secondary.main" : "#AAA",
              }}
            />
          }
        />
        <BottomNavigationAction
          value={PAGE.sources.path}
          icon={
            <List
              sx={{
                fontSize: page.path === PAGE.sources.path ? 30 : 20,
                color:
                  page.path === PAGE.sources.path ? "secondary.main" : "#AAA",
              }}
            />
          }
        />
      </BottomNavigation>
    </FooterArea>
  );
};

export interface FooterProps {
  page: Page;
}

export default Footer;
