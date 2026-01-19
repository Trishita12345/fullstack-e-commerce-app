import { Box, Grid, GridCol, Stack, Text } from "@mantine/core";
import PriceDetailsBox from "../(cart)/PriceDetailsBox";
import { useSession } from "@/utils/store/session";
import { unauthorized } from "next/navigation";
import { CartProductsDTO } from "@/constants/types";
import { useViewportSize } from "@mantine/hooks";
import PaymentOptionsSection from "./PaymentOptionsSection";

const Payment = ({ showLoading, stopLoading, cartProducts }: { showLoading: () => void; stopLoading: () => void, cartProducts: CartProductsDTO }) => {

    const session = useSession();
    const isLoggedIn = Boolean(session?.session?.userId);
    if (!isLoggedIn) unauthorized();
    const { width } = useViewportSize()
    return (
        <Box w={{ base: "90%", md: "85%", lg: "70%" }} mx="auto">
            {Object.keys(cartProducts).length > 0 && (
                <Grid>
                    <GridCol
                        pr={{ base: 0, lg: 24 }}
                        span={{ base: 12, lg: 8 }}
                        style={{
                            borderRight: `${width < 1200 ? 0 : 1
                                }px solid var(--mantine-color-gray-1)`,
                        }}
                    >
                        <PaymentOptionsSection />
                    </GridCol>
                    <GridCol span={{ base: 12, lg: 4 }} pl={{ base: 0, lg: 16 }}>
                        <Stack my={16}>
                            <PriceDetailsBox cartProducts={cartProducts} />
                        </Stack>
                    </GridCol>
                </Grid>
            )}

        </Box>
    );
}

export default Payment;