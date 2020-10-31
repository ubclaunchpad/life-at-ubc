import React from "react";
import { Breadcrumb } from "antd";
import styled from "styled-components";

const StyledBreadcrumb = styled(Breadcrumb)`
  margin-top: 30px;
  text-align: center;
`;

const Item = styled(Breadcrumb.Item)`
  font-size: 20px;
  color: "#eee";
  margin-left: 10px;
  margin-right: 10px;
`;

function BreadCrumb() {
  return (
    <StyledBreadcrumb separator=">">
      <Item>Home </Item>
      <Item href="">Application Center </Item>
      <Item href="">Application List</Item>
      <span
        style={{
          marginLeft: 10,
          fontSize: 20,
          color: "rgba(0, 0, 0, 0.45)",
          cursor: "pointer",
        }}
      >
        Application
      </span>
    </StyledBreadcrumb>
  );
}

export default BreadCrumb;
