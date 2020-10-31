import React, { useState } from "react";
import { Menu, Dropdown } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";

const StyledLandingPage = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const Title = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 30px;
`;

const InLineDropDown = styled(Dropdown)`
  display: inline-block;
`;

const Space = styled.div`
  height: 30px;
`;

const StyledA = styled.a`
  display: block;
  height: 50px;
  width: 428px;
  line-height: 50px;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
`;

function LandingPage() {
  const [session, setSession] = useState<string>("Choose session");
  const [term, setTerm] = useState<string>("Choose term");

  const sessions = ["2020W", "2020S", "2021W"];
  const terms = ["Term 1", "Term 2"];

  const sessionMenu = (
    <Menu>
      {sessions.map((session) => {
        return (
          <Menu.Item
            key={session}
            onClick={() => {
              setSession(session);
            }}
          >
            {session}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  const termMenu = (
    <Menu>
      {terms.map((term) => {
        return (
          <Menu.Item
            key={term}
            onClick={() => {
              setTerm(term);
            }}
          >
            {term}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <StyledLandingPage>
      <Title>Choose session and term</Title>
      <InLineDropDown overlay={sessionMenu} trigger={["click"]}>
        <StyledA
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
        >
          {session}
        </StyledA>
      </InLineDropDown>
      <Space></Space>
      <Dropdown overlay={termMenu} trigger={["click"]}>
        <StyledA
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
        >
          {term}
        </StyledA>
      </Dropdown>
    </StyledLandingPage>
  );
}

export default LandingPage;
