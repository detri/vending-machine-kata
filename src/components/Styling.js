import styled from 'styled-components';

export const MachineHousing = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 75vh;
  width: 50vw;
  padding: 10px;
  border-radius: 5px;
  background: #654321;
  color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 767px) {
    height: 100vh;
    width: 100vh;
    border-radius: 0;
  }
`;

export const Screen = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: 60%;
  padding: 10px;
  border-radius: 3px;
  display: flex;
  margin-right: 10px;
  background: #000044;
`;

export const Item = styled.button`
  box-sizing: border-box;
  border: none;
  border-radius: 3px;
  font-size: 12pt;
  background: darkgray;
  padding: 10px;
  height: 50px;
  flex-grow: 1;
  margin: 5px;
  
  :hover {
    background: lightgray;
  }

  :active {
    background: gray;
  }
`;

export const Menu = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  flex-direction: column;
`;

export const Display = styled.div`
  background: black;
  color: red;
  height: 100px;
  font-size: 16pt;
  line-height: 100px;
  text-align: center;
  text-transform: capitalize;
`;

export const Option = styled.button`
  background: inherit;
  border: none;
  border-radius: 3px;
  width: 100%;
  height: 50px;
  padding: 10px;
  color: white;
  font-weight: bold;
  margin-top: 10px;

  :hover {
    background: #765432
  }
`;

export const CoinReturn = styled.div`
  background: darkgray;
  color: black;
  flex-grow: 1;
  overflow-y: scroll;
`;