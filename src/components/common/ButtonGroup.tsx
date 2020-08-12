import styled, { css } from 'styled-components';
import React from 'react';

const ButtonGroupBlock = styled.div`
  display: flex;
  ${(props: ButtonGroupProps) =>
    css`
      background-color: ${props.direction};
    `}

  ${(props: ButtonGroupProps) =>
    props.rightAlign &&
    css`
      justify-content: flex-end;
    `}
    button + button {
    ${(props: ButtonGroupProps) =>
      props.direction === 'row' &&
      css`
        margin-left: props.gap;
      `}
    ${(props: ButtonGroupProps) =>
      props.direction === 'column' &&
      css`
        margin-top: props.gap;
      `}
  }
`;

export type ButtonGroupProps = {
  /** 버튼을 보여줄 방향 */
  direction: 'row' | 'column';
  /** 버튼을 우측에 보여줍니다. */
  rightAlign?: boolean;
  /** 버튼과 버튼사이의 간격을 설정합니다. */
  gap: number | string;
  /** 버튼 그룹에서 보여줄 버튼들 */
  children: React.ReactNode;
  /* 스타일 커스터마이징 하고싶을 때 사용 */
  className?: string;
};

/**
 * 여러개의 `Button` 컴포넌트를 보여주고 싶거나, 버튼을 우측에 정렬하고 싶을 땐 `ButtonGroup` 컴포넌트를 사용하세요.
 */
const ButtonGroup = (props: ButtonGroupProps) => {
  return <ButtonGroupBlock {...props} />;
};

export default ButtonGroup;
