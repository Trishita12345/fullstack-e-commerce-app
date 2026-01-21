import { InfoIcon } from "@/(components)/InfoIcon";
import { en } from "@/constants/en";
import { formattedPrice } from "@/utils/helperFunctions";
import { Group, Badge, Text } from "@mantine/core";
import { IconArrowNarrowUp, IconArrowNarrowDown } from "@tabler/icons-react";

const Price = ({
  basePrice,
  discountedPrice,
  priceSnapshot,
}: {
  basePrice: number;
  discountedPrice: number;
  priceSnapshot: number;
}) => {
  return (
    <Group key={basePrice} gap={4} id="price">
      <Text size="sm" fw={500}>
        {formattedPrice(discountedPrice)}
      </Text>
      {discountedPrice !== basePrice && (
        <>
          <Text size="sm" td={"line-through"} c="dimmed">
            {formattedPrice(basePrice)}
          </Text>
          <Text size="sm" c="red">
            {formattedPrice(basePrice - discountedPrice)} OFF
          </Text>
        </>
      )}
      {discountedPrice !== priceSnapshot && (
        <>
          {priceSnapshot < discountedPrice ? (
            <Badge variant="outline" color="red">
              <Group gap={4}>
                <IconArrowNarrowUp size={"14px"} />
                <Text
                  size="xs"
                  tt={"capitalize"}
                >{`Price Increased by ${formattedPrice(
                  discountedPrice - priceSnapshot,
                )}`}</Text>
              </Group>
            </Badge>
          ) : (
            <Badge variant="outline" color="green">
              <Group gap={4}>
                <IconArrowNarrowDown size={"14px"} />
                <Text
                  size="xs"
                  tt={"capitalize"}
                >{`Price Decreased by ${formattedPrice(
                  priceSnapshot - discountedPrice,
                )}`}</Text>
              </Group>
            </Badge>
          )}
        </>
      )}
      <InfoIcon
        info={`Total price you see on ${
          en.logoText
        } is an all-inclusive price. It
                    includesthe product price, taxes and GST charges of ${
                      discountedPrice * 0.05
                    }.`}
      />
    </Group>
  );
};

export default Price;
