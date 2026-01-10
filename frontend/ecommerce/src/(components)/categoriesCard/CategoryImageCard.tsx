import { Button, Paper, Title, Text } from "@mantine/core";
import "./categoryImageCard.css";
import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";

interface CardProps {
  id: string;
  image: string;
  title: string;
  quantity: number;
}
export function CategoryImageCard({ id, image, title, quantity }: CardProps) {
  return (
    <Paper
      key={id}
      shadow="md"
      p="lg"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={"card"}
    >
      <div>
        <Text className={"quantity"} size="xs">
          {quantity}&nbsp;{quantity > 1 ? "items" : "item"}
        </Text>
        <Title order={3} className={"title"}>
          {title}
        </Title>
      </div>
      <Button
        variant="white"
        color="dark"
        size="xs"
        rightSection={<IconArrowUpRight size={"16"} />}
      >
        <Link href={`/products?category=${title}`}>View Products</Link>
      </Button>
    </Paper>
  );
}
