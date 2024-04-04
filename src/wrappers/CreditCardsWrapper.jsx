import styled from "styled-components";

const Wrapper = styled.section`
  .form-display {
  }
  .title {
    padding: 5px;
  }
  .add-new-card-btn-container {
    padding-top: 10px;
  }
  .cards-list-container {
    overflow: auto;
    height: 500px;
  }
  @media (min-width: 1301px) {
    .form-display {
      display: grid;

      grid-template-columns: 30% 70%;
      gap: 1rem;
      padding: 70px;
    }
  }
  @media (min-width: 946px) {
    .form-display-mini {
      display: grid;

      grid-template-columns: auto auto;
      gap: 1rem;
      padding: 70px;
    }
  }
`;

export default Wrapper;
