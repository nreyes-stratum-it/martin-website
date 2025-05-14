'use client';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
    language: string;
    code: string;
    as?: keyof JSX.IntrinsicElements;
    [key: string]: any;
};

const CodeBlock = ({language, code, as: Wrapper = 'div', ...props}: CodeBlockProps) => (
    <Wrapper className="relative my-4">
        <SyntaxHighlighter style={dark} PreTag="div" language={language} {...props}>
            {code}
        </SyntaxHighlighter>
    </Wrapper>
);

export default CodeBlock;
