import { Container, Heading } from "@chakra-ui/react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Chat } from "../components/Chat";
import { getMessages } from "../lib/messages";

import styles from "../styles/Home.module.css";

const Home: NextPage = (props: any) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS + Socket IO</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container as="main" padding={["3rem", "2rem"]}>
        <Heading mb="2rem">A simple chat</Heading>
        <Chat messages={props.messages} />
      </Container>

      {/* <footer className={styles.footer}>Footer</footer> */}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const messages = await getMessages();

  return { props: { messages }, revalidate: 5 };
};

export default Home;
