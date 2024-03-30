import styled from "styled-components";

const Wrapper = styled.section`
  .form-display {
    align-items: center;
  }
  @media (min-width: 992px) {
    .form-display {
      display: grid;

      grid-template-columns: 30% 70%;
      gap: 1rem;
      padding: 70px;
    }
  }
`;

export default Wrapper;