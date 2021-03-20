import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import { team } from "../util/constants";

const Section = styled.div`
  font-family: 'Rubik', sans-serif;
  margin: 2rem;
  text-align: center;
  font-weight: 300;
`;

const Title = styled.h1`
    color: #333;
    font-size: 1.25rem;
    font-weight: 400;
    letter-spacing: 1.25px;
    margin: 3.75rem;
`;

const TeamPage = () => {
    return (
        <Section>
            <Title>· Meet the team ·</Title>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                {team.map(({ avatarURL, name, role }) => (
                    <Grid item md={4} sm={6} xs={12} key={name}>
                        <img src={avatarURL} style={{ borderRadius: "50%", width: 150, height: 150, objectFit: "cover" }} alt={name} />
                        <p style={{ margin: "0 auto", fontWeight: 500 }}>{name}</p>
                        <p style={{ marginTop: 0 }}>{role}</p>
                    </Grid>
                ))}
            </Grid>
        </Section>
    );
};

export default TeamPage;
