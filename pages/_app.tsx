import "../styles/global.css";

import App from "next/app";
import Head from "next/head";
import React from "react";

import Layout from "../components/Layout/Layout";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <Head>
          <title>My new cool app</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
