import { en } from "@/constants/en";
import { StoriesType } from "@/constants/types";
import { formattedPrice } from "@/utils/helperFunctions";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Button,
  Grid,
  GridCol,
  Group,
  Rating,
  Stack,
  Text,
} from "@mantine/core";
import { IconHeart, IconHeartFilled, IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import ResponsiveImage from "../responsiveImage";

const StoriesCard = ({ item }: { item: StoriesType }) => {
  return (
    <Stack w={320} gap={12}>
      <ResponsiveImage src={item.imgUrl} />
      <Text fw={500} size="xs">
        {item.updatedAt}
      </Text>
      <Text fw={600} size="lg">
        {item.name}
      </Text>
      <Link href={""}>
        <Group gap={8}>
          <Text size="sm" c="primaryDark.6" fw="500">
            <span
              style={{
                backgroundColor: "var(--mantine-color-primary-1)",
                padding: "1px 2px",
                borderRadius: "2px",
              }}
            >
              Read
            </span>{" "}
            Story
          </Text>
          <FontAwesomeIcon
            icon={faArrowRight}
            size="xs"
            style={{
              color: "var(--mantine-color-primaryDark-6)",
            }}
          />
        </Group>
      </Link>
    </Stack>
  );
};

export default StoriesCard;
