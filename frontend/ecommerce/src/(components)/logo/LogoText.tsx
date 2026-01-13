import { en } from "@/constants/en";
import { Text } from "@mantine/core";
import Link from "next/link";

type LogoTextProps = {
  fontSize?: string;
};
const LogoText = ({ fontSize = "1rem" }: LogoTextProps) => {
  const feBaseUrl = process.env.NEXT_PUBLIC_FRONTEND;
  return (
    <Text
      lts={3}
      style={{
        fontFamily: "var(--font-jost), sans-serif",
        fontWeight: 800,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        fontSize: fontSize,
      }}
    >
      <Link href={`${feBaseUrl}/`}>{en.logoText}</Link>
    </Text>
  );
};

export default LogoText;
