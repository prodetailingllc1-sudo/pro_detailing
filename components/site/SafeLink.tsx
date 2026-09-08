'use client';

import type {
  AnchorHTMLAttributes,
  MouseEvent,
  ReactNode,
} from 'react';

type SafeLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'children' | 'href'
> & {
  children: ReactNode;
  href: string;
};

export default function SafeLink({
  children,
  download,
  href,
  onClick,
  target,
  ...props
}: SafeLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    const shouldUseNativeBehavior =
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      Boolean(download) ||
      Boolean(target && target !== '_self');

    if (shouldUseNativeBehavior) return;

    event.preventDefault();
    window.location.assign(href);
  }

  return (
    <a
      href={href}
      download={download}
      target={target}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
