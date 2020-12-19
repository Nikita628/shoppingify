import React from "react";

export interface AnimationProps {
    isIn: boolean;
    inTransition: string;
    outTransition: string;
    timeoutMs: number;
    children: React.ReactNode;
}

export const Animation = (props: AnimationProps) => {
    const [isRendered, setIsRendered] = React.useState(true);
    const elRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (props.isIn) {
            elRef.current.style.transform = props.inTransition;
            setIsRendered(true);
        } else {
            elRef.current.style.transform = props.outTransition;
            setTimeout(() => setIsRendered(false), props.timeoutMs);
        }
    }, [props.isIn]);

    return (isRendered || props.isIn ? <div ref={elRef}>{props.children}</div> : null);
}

