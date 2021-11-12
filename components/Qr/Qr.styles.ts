import css from "styled-jsx/css";

export default css`
  .qr {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin: 100px auto 25px;
    max-width: var(--max-content-width);
  }

  @media screen and (min-width: 900px) {
    .qr {
      flex-direction: row;
    }
  }
`;
