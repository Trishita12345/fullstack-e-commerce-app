import LogoText from "@/(components)/logo/LogoText";
import { Grid, GridCol, Center } from "@mantine/core";

function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Grid >
            <GridCol span={6} style={{ backgroundColor: 'var(--mantine-color-primary-1)' }} h={'100vh'} visibleFrom="sm">
                <Center h={'100vh'} style={{ flexDirection: 'column' }}>
                    <LogoText fontSize="1.6rem" />
                </Center>
            </GridCol>
            <GridCol span={{ base: 12, sm: 6 }} h={'100vh'}>
                {children}
            </GridCol>
        </Grid>
    );
}
export default LoginLayout;
