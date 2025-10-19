import {Box, Divider, Flex, Grid, GridCol, Group, Stack, Text, Title} from "@mantine/core";
import {en} from "@/constants/en";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandWhatsapp,
    IconBrandYoutube,
    IconMail,
    IconPhone
} from '@tabler/icons-react'
import LogoText from "@/app/(components)/logo/LogoText";
import Link from 'next/link'

export const Footer = () => {
    return (
        <footer>
            <Box bg="primary.0" py={{base: 64, md: 128}}>
                <Grid gutter={"48"} px={{base: 24, md: 48}} justify={'space-between'}>
                    <GridCol span={{base: 12, sm: 12, md: 5, lg: 4}} ta={{base: "center", md: "start"}}
                             px={{base: 24, md: 0}}
                             pb={{base: 64, md: 0}}>
                        <LogoText fontSize={'1.8rem'}/>
                        <Text mt={16} c={"black.6"}>{en.footerNote}</Text>
                        <Flex py={36} gap={28} justify={{base: "center", md: "flex-start"}}>
                            <Group gap={4}><IconPhone size={20}/><Text size={"sm"}>+91-1212012312</Text></Group>
                            <Group gap={4}><IconMail size={20}/><Text size={"sm"}>adsdas@sadm.com</Text></Group>
                        </Flex>
                    </GridCol>
                    <GridCol span={{base: 12, sm: 12, md: 6}}>
                        <Grid justify={"space-evenly"}>
                            {/*Sub-category*/}
                            <Stack gap={16}>
                                <Title order={4}>{en.category}</Title>
                                <Link href={"/smoke"}><Text>Smoke</Text></Link>
                                <Link href={"/signature"}><Text>Signature</Text></Link>
                                <Link href={"/twin-size"}><Text>Twin-size</Text></Link>
                                <Link href={"/brown-hyena"}><Text>Brown-hyena</Text></Link>
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
                                <Title order={4}>{en.social}</Title>
                                <Link href={"/smoke"}><Group><IconBrandWhatsapp/><Text>WhatsApp</Text></Group></Link>
                                <Link href={"/smoke"}><Group><IconBrandFacebook/><Text>Facebook</Text></Group></Link>
                                <Link href={"/smoke"}><Group><IconBrandInstagram/><Text>Instagram</Text></Group></Link>
                                <Link href={"/smoke"}><Group><IconBrandYoutube/><Text>Youtube</Text></Group></Link>
                            </Stack>
                        </Grid>
                    </GridCol>
                </Grid>
            </Box>
            <Divider color={"black.2"}/>
            <Box bg="primary.0" py={24} ta={"center"} c={"black.6"}>
                {en.copyrightText}
            </Box>
        </footer>
    );
}