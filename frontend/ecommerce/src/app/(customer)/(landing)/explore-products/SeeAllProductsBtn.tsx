"use client";

import { en } from "@/constants/en";
import { Box, Button } from "@mantine/core";
import Link from "next/link";

const SeeAllProductsBtn = () => {
  return (
    <Box w={200} mx="auto" mt={72}>
      <Button color="primaryDark.6" size="lg">
        <Link href="/strore">{en.seeAllProducts}</Link>
      </Button>
    </Box>
  );
};

export default SeeAllProductsBtn;
