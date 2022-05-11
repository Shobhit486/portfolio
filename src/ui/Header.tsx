import styled from "@emotion/styled";
import Link from "next/link";

import db from "../../db.json";
import { Color } from "styles";

import type { PropsWithChildren } from "react";
import type { LinkProps } from "next/link";

export default function Header(): JSX.Element {
  return (
    <HeadBar>
      <Link href="/">
        <LogoTitle>{db.title}</LogoTitle>
      </Link>
      <nav>
        <NavBarList>
          {db.links.map(({ title, url, icon }) => (
            <NavItemWithLink key={title} href={url}>
              <i className={icon} />
              <span className="linkText">{title}</span>
            </NavItemWithLink>
          ))}
        </NavBarList>
      </nav>
    </HeadBar>
  );
}

function NavItemWithLink({
  children,
  ...linkProps
}: PropsWithChildren<LinkProps>): JSX.Element {
  return (
    <NavBarItem>
      <Link {...linkProps}>
        <a>{children}</a>
      </Link>
    </NavBarItem>
  );
}

const HeadBar = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 50;
  margin: 0.5rem;
  padding: 1rem 1.5em;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-direction: row;

  background-color: ${Color.Background_Secondary};
  border-radius: 0.5rem;
  box-shadow: 0 0.25rem 0.5rem 0 #0008;

  animation: drop-top 0.5s;

  @keyframes drop-top {
    from {
      top: -100px;
    }
    to {
      top: 0;
    }
  }

  @media screen and (max-width: 550px) {
    /* flex-direction: column; */
    gap: 0;
    .linkText {
      display: none;
    }
  }
`;

const LogoTitle = styled.a`
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${Color.Text_Primary};
  text-decoration: none;
  cursor: pointer;
`;

const NavBarList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  font-size: 0.9rem;
`;

const NavBarItem = styled.li`
  margin: 0 0 0 1em;

  &,
  a {
    color: ${Color.Text_Secondary};
    fill: ${Color.Text_Secondary};
  }

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  i {
    margin: 0 0.5em;
    transition: transform ease 0.3s;
  }

  &:hover,
  a:hover {
    color: ${Color.Text_Primary};
    fill: ${Color.Text_Primary};

    i {
      transform: scale(1.5);
    }
  }

  svg {
    width: 1em;
    height: 1em;
    margin: 0 0.5em;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
