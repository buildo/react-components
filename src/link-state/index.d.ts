import { ChangeEventHandler, ChangeTargetHTMLProps } from 'react';

type LinkState = {
  value: any,
  requestChange: (e: ChangeTargetHTMLProps<HTMLInputElement>) => void
};

export const linkState: (_this: React.Component, path: string) => LinkState

type ValueLinkProps = ({
  valueLink: LinkState
}) | ({
  value: any,
  onChange: (e: ChangeTargetHTMLProps<HTMLInputElement>) => void
});

export const getValueLink: (_this: React.Component, _props: ValueLinkProps) => LinkState

export type LinkedStateMixin = {
  linkState: (path: string) => LinkState,
}

export type ValueLinkMixin = {
  getValueLink: (props: object) => LinkState
}
