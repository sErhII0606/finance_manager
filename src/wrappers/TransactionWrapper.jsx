import styled from "styled-components";

const Wrapper = styled.section`
  .form-display {
    // align-items: center;
  }
  .add-transaction-form {
    max-width: 550px;
    margin-left: auto;
    margin-right: auto;
  }
  .icon-img {
    height: 45px;
    width: 65px;
    margin: auto;
  }
  @media (min-width: 992px) {
    .form-display {
      display: grid;

      grid-template-columns: 70% 30%;
      gap: 1rem;
      padding: 10px;
    }
  }
`;

export default Wrapper;
