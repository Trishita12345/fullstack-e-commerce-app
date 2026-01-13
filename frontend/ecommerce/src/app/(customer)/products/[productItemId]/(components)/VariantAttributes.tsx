import { ProductVariantAttribute } from "@/constants/types";
import { Button, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";
import { Fragment } from "react";

const VariantAttributes = ({
  va,
  productItemId,
}: {
  va: ProductVariantAttribute;
  productItemId: string;
}) => {
  return (
    <Stack gap={10}>
      <Text tt="uppercase" size="11px" fw={600} lts={0.9} c={"black.8"}>
        {va.variantName}
      </Text>
      <Group>
        {va.attributes.map((vaa) => (
          <Fragment key={vaa.name}>
            {" "}
            {vaa.productItemId === productItemId ? ( //isSelected
              <Button
                variant={"filled"}
                color={"primaryDark.5"}
                size="xs"
                style={{ cursor: "default" }}
              >
                {vaa.name}
              </Button>
            ) : (
              <Link href={`/products/${vaa.productItemId}`}>
                <Button variant={"outline"} color={"primaryDark.5"} size="xs">
                  {vaa.name}
                </Button>
              </Link>
            )}
          </Fragment>
        ))}
      </Group>
    </Stack>
  );
};

export default VariantAttributes;
