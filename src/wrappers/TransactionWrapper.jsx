import styled from "styled-components";

const Wrapper = styled.section`
  .form-display {
    // align-items: center;
  }
  .icon-img {
    height: 45px;
    width: 65px;
    margin: auto;
  }
  @media (min-width: 992px) {
    .form-display {
      display: grid;

      grid-template-columns: 40% 60%;
      gap: 1rem;
      padding: 70px;
    }
  }
`;

export default Wrapper;
