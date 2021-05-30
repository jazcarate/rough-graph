import { createGlobalStyle } from 'styled-components';

export const color = "#444";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 40px auto 0 auto;
        width: 66%;
        font: 18px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.6;
        font-size: 18px;
        padding: 0 10px;
        background-color: whitesmoke;
        color: ${color};
    }
`;

export default GlobalStyle;
