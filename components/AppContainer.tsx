import React from "react";
import {
  ActionIcon,
  Anchor,
  AppShell,
  Footer,
  Group,
  Header,
  Text,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { BsGithub } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";

function AppContainer({ children }: any) {
  return (
    <AppShell
      styles={{
        main: {
          width: "100vw",
          paddingTop: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
          minHeight: "unset",
        },
      }}
      fixed
      header={
        <Header
          height={80}
          p="md"
          style={{
            borderBottom: "2px solid #1a1a1a",
            background: "#111111",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/renato-castro-b54b82249/"
          >
            <SiLinkedin size={30} fill='#0077b7' />
          </Link>
          <Link href="/">
            <Image
              src="https://logosmarcas.net/wp-content/uploads/2020/11/League-of-Legends-Logo.png"
              alt="League of Legends"
              width={150}
              height={80}
            />
          </Link>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/renatomcc"
          >
            <BsGithub size={30} fill='white'/>
          </Link>
        </Header>
      }
      footer={
        <Footer
          height={40}
          p="md"
          fixed
          style={{
            color: "white",
            borderTop: "2px solid #1a1a1a",
            background: "#111111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Group position="center" spacing="sm">
            <Text size="sm" weight={600}>
              All rights reserved to
              <Anchor
                href="https://www.riotgames.com/"
                target="_blank"
                color="red"
                underline={false}
                weight={700}
                style={{
                  marginLeft: "5px",
                }}
              >
                Riot Games®
              </Anchor>
            </Text>
          </Group>
        </Footer>
      }
    >
      {children}
    </AppShell>
  );
}

export default AppContainer;
