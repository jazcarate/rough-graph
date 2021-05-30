import styled from "styled-components";

const BigButton = styled.a`
 display:inline-block;
 padding:0.7em 1.4em;
 margin:0 0.3em 0.3em 0;
 border-radius:0.15em;
 box-sizing: border-box;
 text-decoration:none;
 font-family:'Roboto',sans-serif;
 text-transform:uppercase;
 font-weight:400;
 color:#FFFFFF;
 background-color:#3369ff;
 box-shadow:inset 0 -0.6em 0 -0.35em rgba(255,255,255,0.37);
 text-align:center;
 position:relative;
}
&:active{
 top:0.1em;
} 
`;

export default BigButton;