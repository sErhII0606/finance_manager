import styled from "styled-components";

const Wrapper = styled.section`
  .form-display {
  }
  @media (min-width: 840px) {
    .form-display {
      display: grid;

      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      padding: 70px;
    }
  }
`;

export default Wrapper;
