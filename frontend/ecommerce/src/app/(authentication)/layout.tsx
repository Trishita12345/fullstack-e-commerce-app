'use client';
import LogoText from "@/(components)/logo/LogoText";
import { useIsLoggedIn } from "@/utils/store/auth";
import { Grid, GridCol, Center } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <Grid >
            <GridCol span={6} style={{ backgroundColor: 'var(--mantine-color-primary-1)' }} h={'101vh'} visibleFrom="md">
                <Center h={'100vh'} style={{ flexDirection: 'column' }}>
                    <LogoText fontSize="1.6rem" />
                </Center>
            </GridCol>
            <GridCol span={{ base: 12, md: 6 }} h={'100vh'}>
                {children}
            </GridCol>
        </Grid>
    );
}
export default LoginLayout;
