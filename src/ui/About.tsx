import TextTransition, { presets } from "react-text-transition";
import db from "../../db.json";
import { HeroSection } from "components/layout";
import { Heading, SubHeading, Paragraph } from "components/typography";
import { Color } from "styles";
import { useEffect, useState } from "react";

const TIMER = 3_000;

export default function About(): JSX.Element {
  const { heading, content } = db.about;
  return (
    <HeroSection id="about">
      <Heading>{heading}</Heading>
      <SubHead />
      {content.map((text) => (
        <Paragraph key={text}>{text}</Paragraph>
      ))}
    </HeroSection>
  );
}

function SubHead(): JSX.Element {
  const { subHeading: text } = db.about;
  const [currentIndex, setIndex] = useState(0);
  const currentText = text[currentIndex] || "";

  useEffect(() => {
    if (text.length <= 1) return;

    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % text.length),
      TIMER
    );
    return () => clearInterval(interval);
  }, [text]);

  return (
    <SubHeading style={{ color: Color.Accent }}>
      <TextTransition text={currentText} springConfig={presets.wobbly} />
    </SubHeading>
  );
}
