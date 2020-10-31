import React from "react";
import styled from "styled-components";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

const StyledBreadcrumbesWrapper = styled.div`
  width: 465px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 46px;
  margin-bottom: 46px;
`;

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
}

function Breadcrumb() {
  return (
    <StyledBreadcrumbesWrapper>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Home
        </Link>
        <Link color="inherit" href="/" onClick={handleClick}>
          Courses
        </Link>
        <Link color="inherit" href="/" onClick={handleClick}>
          Restrictions
        </Link>
        <Link color="inherit" href="/" onClick={handleClick}>
          Lectures
        </Link>
        <Link color="inherit" href="/" onClick={handleClick}>
          Labs
        </Link>
        <Link color="inherit" href="/" onClick={handleClick}>
          Generate
        </Link>
      </Breadcrumbs>
    </StyledBreadcrumbesWrapper>
  );
}

export default Breadcrumb;
