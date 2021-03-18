import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

interface GitHubUser {
    avatarURL: string;
    htmlURL: string;
    login: string;
    blog: string;
    name: string;
    role: string;
}

const Section = styled.div`
  font-family: 'Rubik', sans-serif;
  margin: 2rem;
  text-align: center;
  font-weight: 300;
`;

// GitHub usernames
const usernames = ["aldy97", "resurreccionl", "johnagl", "jacksonyuanjx", "yehee", "danielchen-pyc", "kvgagan98", "vinnie-wu", "hyunuk"];

const TeamPage = () => {
    const [team, setTeam] = useState<GitHubUser[]>([]);
    useEffect(() => {
        async function getTeamInfo() {
            const users = await Promise.all(usernames.map((username) =>
                fetch(`https://api.github.com/users/${username}`)
                    .then((res) => res.json())
                    .then((res) => ({
                        avatarURL: res.avatar_url,
                        login: res.login,
                        blog: res.blog,
                        htmlURL: res.html_url,
                        name: res.name,
                        role: "Developer",
                    }))
            ));
            setTeam(users);
        }
        getTeamInfo();
    }, []);
    return (
        <Section>
            <h2>Meet the team</h2>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {team.map(({ avatarURL, name, role }) => (
                    <Grid item xs={4} key={name}>
                        <img src={avatarURL} style={{ borderRadius: "50%", width: 150 }} />
                        <p style={{ margin: "0 auto", fontWeight: 500 }}>{name}</p>
                        <p style={{ marginTop: 0 }}>{role}</p>
                    </Grid>
                ))}
            </Grid>
        </Section>
    );
};

export default TeamPage;
