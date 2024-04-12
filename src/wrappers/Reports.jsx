import styled from "styled-components";

const Wrapper = styled.section`
  .form-display {
    // align-items: center;
  }
  .calendar-cell {
    height: 5rem;
  }
  .icon-img {
    height: 45px;
    width: 65px;
    margin: auto;
  }
  .bg-gray {
    background-color: rgba(242, 242, 242, 0.3);
  }
  @media (min-width: 992px) {
    .form-display {
      display: grid;

      grid-template-columns: 60% 40%;
      gap: 1rem;
      padding: 10px;
    }
  }
`;

export default Wrapper;
