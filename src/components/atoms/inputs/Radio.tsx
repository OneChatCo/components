import { Circle } from "@styled-icons/boxicons-solid";
import styled, { css } from "styled-components";

interface Props {
    children: React.ReactChild;
    title?: React.ReactChild;
    description?: React.ReactChild;

    value?: boolean;
    onSelect?: () => void;

    disabled?: boolean;
}

interface BaseProps {
    selected: boolean;
}

const Base = styled.label<BaseProps>`
    border: 1px solid grey;
    padding: 10px;
    gap: 8px;
    display: flex;
    cursor: pointer;
    user-select: none;
    transition: 0.2s ease all;
    border-radius: 4px;
    color: var(--secondary-foreground);

    .info {
        display: flex;
        gap: 2px;
        flex-direction: column;
    }

    .circle {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border: 1px solid grey;
        border-radius: var(--border-radius-half);
        height: 20px;
        width: 20px;

        .innerCircle {
            border-radius: inherit;
            flex-shrink: 0;
            background: var(--accent);
            height: 10px;
            width: 10px;

            visibility: hidden;
        }
    }

    > input {
        display: none;
    }

    ${(props) =>
        props.selected &&
        css`
            color: white;
            cursor: default;
            background: var(--accent);
            border: 1px solid var(--accent);

            .circle {
                border: 1px solid white;
                background: white;

                .innerCircle {
                    visibility: visible;
                }
            }
        `}

    ${(props) =>
        !props.selected &&
        css`
            &:hover {
                background: var(--hover);

                .innerCircle {
                    visibility: visible;
                    background: grey;
                }
            }
        `}
`;

const Title = styled.div<BaseProps>`
    font-size: 15px;
    font-weight: 600;
    color: var(--secondary-foreground);

    ${(props) =>
        props.selected &&
        css`
            color: white;
        `}
`;

const Description = styled.div<BaseProps>`
    font-size: 12px;
    font-weight: 400;
    color: var(--secondary-foreground);

    ${(props) =>
        props.selected &&
        css`
            color: white;
        `}
`;

export function Radio({
    children,
    title,
    description,
    value,
    onSelect,
    disabled,
}: Props) {
    const selected = value ?? false;
    return (
        <Base selected={selected}>
            <div className="circle">
                <div className="innerCircle" />
            </div>
            <input
                type="radio"
                checked={selected}
                onChange={(e) =>
                    e.currentTarget.value === "on" && !disabled && onSelect?.()
                }
            />
            <div className="info">
                {title && <Title selected={selected}>{title}</Title>}
                {description && (
                    <Description selected={selected}>{description}</Description>
                )}
            </div>
        </Base>
    );
}