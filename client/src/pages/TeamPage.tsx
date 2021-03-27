import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import Title from "../components/Title";
import { team } from "../util/constants";

const Section = styled.div`
  font-family: 'Rubik', sans-serif;
  text-align: center;
  font-weight: 300;
`;

const TeamPage = () => {
    return (
        <Section>
            <Title title="Meet the Team"/>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                {team.map(({ avatarURL, name, role }) => (
                    <Grid item lg={3} md={4} sm={6} xs={12} key={name}>
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
