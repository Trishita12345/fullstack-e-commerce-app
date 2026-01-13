import {
  Box,
  Divider,
  Flex,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { en } from "@/constants/en";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconBrandYoutube,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import LogoText from "@/(components)/logo/LogoText";
import Link from "next/link";
import ResponsiveImage from "../responsiveImage";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer
      style={{
        // position: "relative",
        backgroundColor: "var(--mantine-color-primary-0)",
      }}
    >
      {/* <Image
        src={"/assets/footerImg.jpg"}
        width={700}
        height={600}
        style={{ width: "100%", height: "auto" }}
        alt={"Footer"}
      /> */}
      <Box
      // bg="transparent"
      // pos="absolute"
      // bottom={0}
      // style={{ zIndex: 2 }}
      // w="100%"
      >
        <Box py={64} pl={{ base: 0, md: 64 }}>
          <Grid
            gutter={"48"}
            px={{ base: 24, md: 48 }}
            justify={"space-between"}
          >
            <GridCol
              span={{ base: 12, sm: 12, md: 5, lg: 4 }}
              ta={{ base: "center", md: "start" }}
              px={{ base: 24, md: 0 }}
              pb={{ base: 64, md: 0 }}
            >
              <LogoText fontSize={"1.3rem"} />
              <Text mt={16} c={"black.8"} size="sm">
                {en.footerNote}
              </Text>
              <Flex
                py={36}
                gap={28}
                justify={{ base: "center", md: "flex-start" }}
              >
                <Group gap={4}>
                  <IconPhone size={16} />
                  <Text size={"xs"} c={"black.6"} fw={600}>
                    +91-1212012312
                  </Text>
                </Group>
                <Group gap={4}>
                  <IconMail size={16} />
                  <Text size={"xs"} c={"black.6"} fw={600}>
                    connect@loomandlume.com
                  </Text>
                </Group>
              </Flex>
            </GridCol>
            <GridCol span={{ base: 12, sm: 12, md: 6 }}>
              <Grid justify={"space-evenly"}>
                {/*Sub-category*/}
                <Stack gap={16}>
                  <Text fw={500} size="sm">
                    {en.Categories}
                  </Text>
                  <Link href={"/smoke"}>
                    <Text size="xs" c="black.8" lts={0.5}>
                      Smoke
                    </Text>
                  </Link>
                  <Link href={"/signature"}>
                    <Text size="xs" c="black.8" lts={0.5}>
                      Signature
                    </Text>
                  </Link>
                  <Link href={"/twin-size"}>
                    <Text size="xs" c="black.8" lts={0.5}>
                      Twin-size
                    </Text>
                  </Link>
                  <Link href={"/brown-hyena"}>
                    <Text size="xs" c="black.8" lts={0.5}>
                      Brown-hyena
                    </Text>
                  </Link>
                </Stack>
                {/*Category*/}
                {/*<Stack gap={16}>*/}
                {/*    <Title order={4}>Collections</Title>*/}
                {/*    <Text>Candle</Text>*/}
                {/*    <Text>Fragrance Spray</Text>*/}
                {/*    <Text>Scented Soap</Text>*/}
                {/*    <Text>Incense</Text>*/}
                {/*</Stack>*/}
                {/*Social*/}
                <Stack gap={16}>
                  <Text fw={500} size="sm">
                    {en.social}
                  </Text>
                  <Link href={"/smoke"}>
                    <Group gap={8}>
                      <IconBrandWhatsapp size="16px" />
                      <Text size="xs" c="black.8" lts={0.5}>
                        WhatsApp
                      </Text>
                    </Group>
                  </Link>
                  <Link href={"/smoke"}>
                    <Group gap={8}>
                      <IconBrandFacebook size="16px" />
                      <Text size="xs" c="black.8" lts={0.5}>
                        Facebook
                      </Text>
                    </Group>
                  </Link>
                  <Link href={"/smoke"}>
                    <Group gap={8}>
                      <IconBrandInstagram size="16px" />
                      <Text size="xs" c="black.8" lts={0.5}>
                        Instagram
                      </Text>
                    </Group>
                  </Link>
                  <Link href={"/smoke"}>
                    <Group gap={8}>
                      <IconBrandYoutube size="16px" />
                      <Text size="xs" c="black.8" lts={0.5}>
                        Youtube
                      </Text>
                    </Group>
                  </Link>
                </Stack>
              </Grid>
            </GridCol>
          </Grid>
        </Box>
        <Divider color={"black.2"} />
        <Text py={24} ta={"center"} c={"black.6"} size="xs" lts={0.4} fw={600}>
          {en.copyrightText}
        </Text>
      </Box>
    </footer>
  );
};
