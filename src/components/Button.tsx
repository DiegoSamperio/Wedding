import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function Button({ children, href, variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `button button--${variant} ${className}`.trim();

  if (href) {
    const externalProps = href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {};
    return (
      <a className={classes} href={href} {...externalProps} {...(props as ComponentPropsWithoutRef<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
