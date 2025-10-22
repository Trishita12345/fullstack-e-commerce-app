"use client";
import {Text} from "@mantine/core";
import Link from "next/link";

type LogoTextProps = {
    fontSize?: string;
}
const LogoText = ({fontSize = '1rem'}: LogoTextProps) => {
    const feBaseUrl = process.env.NEXT_PUBLIC_FRONTEND;
    return (
        <Text
            style={{
                fontFamily: "var(--font-jost), sans-serif",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontSize: fontSize
            }}
        >
            <Link href={`${feBaseUrl}/`}>Loom & Lume</Link>
        </Text>
    );
};

export default LogoText;
