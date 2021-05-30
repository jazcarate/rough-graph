import styled from 'styled-components';

export default function Footer() {

    return (
        <Wrapper>
            <List>
                <Item>
                    Made with <span role="img" title="love" aria-label="love">♥</span> by: <a href="https://florius.com.ar">Florius.com.ar</a>
                </Item>
                <Item>
                    Source: <a href="https://github.com/jazcarate/rough-graph">GitHub</a>
                </Item>
            </List>

        </Wrapper>
    );
}

const Wrapper = styled.footer`
    text-align: center;
    width: 100%;
    left: 0;
    font: 300 1rem/1.25rem SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    display: inline-flex;
`;

const Item = styled.li`
    display: inline-block;
    padding: 0 .4rem;
    border-right: 1px solid #414141;

    &:last-child {
        border-right: none;
    }
`;