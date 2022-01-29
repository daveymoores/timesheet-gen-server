import "../styles/global.css";

import App from "next/app";
import Head from "next/head";
import React from "react";

import Layout from "../components/Layout/Layout";
import { SocketIoProvider } from "../context/SocketIoContext";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <SocketIoProvider>
        <Layout>
          <Head>
            <title>My new cool app</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </SocketIoProvider>
    );
  }
}

export default MyApp;
