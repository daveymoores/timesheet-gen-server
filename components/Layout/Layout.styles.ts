import css from "styled-jsx/css";

export default css`
  .page-layout {
    padding: 25px;
  }

  @media screen and (min-width: 900px) {
    .page-layout {
      padding: 50px;
    }
  }

  main {
    padding: 25px 0;
  }

  @media screen and (min-width: 900px) {
    main {
      padding: 50px 0;
    }
  }
`;
