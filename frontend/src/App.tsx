import "./App.css";
// import Input from "./components/Create/Input";
import MainHeader from "./components/Header/Header";
import List from "./components/List/List";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin: auto;
`;

function App() {
  return (
    <Container>
      <MainHeader />
      {/* <Input /> */}
      <List />
    </Container>
  );
}

export default App;
