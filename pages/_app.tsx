import "../styles/global.css";

import App from "next/app";
import Head from "next/head";
import React from "react";
import { Toaster } from "react-hot-toast";

import Layout from "../components/Layout/Layout";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Layout>
        <Head>
          <title>AUTOLOG</title>
        </Head>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    );
  }
}

export default MyApp;
