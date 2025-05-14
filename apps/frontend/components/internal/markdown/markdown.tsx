'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Markdown from 'react-markdown';

const CodeBlock = dynamic(() => import('./partials/code-block'), {
    loading: () => <></>,
    ssr: false,
});

type MarkdownProps = {
    text: string;
    classNames?: string;
    as?: keyof JSX.IntrinsicElements;
}

const MarkdownComponent = ({text, classNames, as}: MarkdownProps) => {
    const Wrapper = as ?? 'div';

    if (!Wrapper) {
        console.warn("Invalid wrapper element passed to MarkdownComponent.");
        return null;
    }

    return (
        <Wrapper className={`prose prose-a:text-default-600 dark:prose-invert ${classNames ?? ''}`}>
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    p: ({children}) => <>{children}</>,
                    code({inline, className, children, ...props}: any) {
                        const match = /language-(\w+)/.exec(className || '');
                        const codeString = String(children).replace(/\n$/, '');

                        return !inline && match ? (
                            <CodeBlock language={match[1]} code={codeString} {...props} />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {text}
            </Markdown>
        </Wrapper>
    );
};


export default MarkdownComponent;
