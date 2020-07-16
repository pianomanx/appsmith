import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SidebarComponent from "components/editorComponents/Sidebar";
import NavBarItem from "components/editorComponents/NavBarItem";
import { EDITOR_ROUTES, BuilderRouteParams } from "constants/routes";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  width: ${props => props.theme.sidebarWidth};
  box-shadow: 0px 1px 3px ${props => props.theme.colors.paneBG};
  z-index: 3;
`;

const NavBar = styled.div`
  background-color: ${props => props.theme.colors.navBG};
  color: ${props => props.theme.colors.textOnDarkBG};
  display: flex;
  flex-direction: column;
`;

const EditorSidebar = styled(SidebarComponent)`
  background-color: ${props => props.theme.colors.paneBG};
`;

const allowedRoutes = EDITOR_ROUTES.filter(route => {
  return route.allowed !== undefined ? route.allowed : true;
});

const TopBar = styled.div`
  border-bottom: 1px solid #4e5d78;
`;
const BottomBar = styled.div`
  display: flex;
  padding-bottom: 118px;
  height: 100%;
  align-items: flex-end;
`;

const Sidebar = () => {
  const params = useParams<BuilderRouteParams>();

  return (
    <Wrapper>
      <NavBar>
        <TopBar>
          {allowedRoutes.map(config => (
            <NavBarItem
              key={config.title}
              {...config}
              width={32}
              height={32}
              path={config.path(params.applicationId, params.pageId)}
            />
          ))}
        </TopBar>
        <BottomBar></BottomBar>
      </NavBar>
      <EditorSidebar />
    </Wrapper>
  );
};

Sidebar.whyDidYouRender = {
  logOnDifferentValues: false,
  customName: "MainSidebar",
};

export default Sidebar;
