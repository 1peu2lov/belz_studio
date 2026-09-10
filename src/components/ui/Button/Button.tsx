import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";

import { cn } from "@/utils/cn";

import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function isExternalHref(href: string): boolean {
  return /^(https?:|mailto:|tel:)/i.test(href);
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const classNames = cn(styles.button, styles[variant], className);

  if ("href" in props && typeof props.href === "string") {
    const { href, ...linkProps } = props;

    if (isExternalHref(href)) {
      return (
        <a className={classNames} href={href} {...linkProps}>
          {children}
        </a>
      );
    }

    return (
      <Link className={classNames} href={href} {...linkProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button className={classNames} type={buttonProps.type ?? "button"} {...buttonProps}>
      {children}
    </button>
  );
}
