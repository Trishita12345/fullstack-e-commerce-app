import { en } from '@/constants/en'
import {
    Badge,
    Box,
    Button,
    Card,
    Container,
    Grid,
    GridCol,
    Group,
    Image,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from '@mantine/core'
import { IconBuilding, IconMail, IconSparkles } from '@tabler/icons-react'

export default function AboutPage() {
    return (
        <Box bg="#F7F1EC" py={80}>
            <Container size="xl">
                <Grid gutter={60} align="center">
                    <GridCol span={{ base: 12, lg: 6 }}>
                        <Stack gap="lg">
                            <Badge
                                variant="light"
                                color="orange"
                                radius="xl"
                                size="lg"
                                w="fit-content"
                            >
                                About Loom & Lume
                            </Badge>

                            <Title
                                order={1}
                                fz={{ base: 42, md: 58 }}
                                fw={700}
                                c="#3E3028"
                                lh={1.1}
                            >
                                Creating Warmth,
                                <br />
                                Comfort & Calm
                            </Title>

                            <Text size="lg" c="#6B5A50" lh={1.9}>
                                At Loom & Lume, we believe fragrance has the power to transform
                                a space, elevate a mood, and turn everyday moments into
                                something memorable.
                            </Text>

                            <Text size="lg" c="#6B5A50" lh={1.9}>
                                What started as a small idea at home soon became a passion for
                                creating products that make people feel calm, cozy, and
                                connected to their spaces. From testing our first candle jars on
                                a small table to carefully selecting fragrances, vessels, and
                                packaging, every step of our journey has been rooted in creating
                                something thoughtful and beautiful.
                            </Text>

                            <Text size="lg" c="#6B5A50" lh={1.9}>
                                Inspired by warm lighting, peaceful evenings, and the comfort of
                                home, Loom & Lume was built to create more than candles — we
                                wanted to create an atmosphere.
                            </Text>
                        </Stack>
                    </GridCol>

                    <GridCol span={{ base: 12, lg: 6 }}>
                        <Box pos="relative">
                            <Paper radius={32} p="md" bg="#EADCD2" shadow="xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80"
                                    radius={28}
                                    h={600}
                                    fit="cover"
                                />
                            </Paper>

                            <Card
                                shadow="lg"
                                radius="xl"
                                p="lg"
                                maw={280}
                                pos="absolute"
                                bottom={-30}
                                left={-20}
                                bg="white"
                            >
                                <Text tt="uppercase" fz="xs" fw={700} c="#B88367" mb="sm">
                                    Since Day One
                                </Text>
                                <Text c="#5E4B40" lh={1.7}>
                                    Handcrafted fragrances designed to make every space feel warm,
                                    inviting, and beautifully calm.
                                </Text>
                            </Card>
                        </Box>
                    </GridCol>
                </Grid>

                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg" mt={100}>
                    {[
                        {
                            title: 'Our Vision',
                            text: 'To become a trusted home fragrance brand that helps people create warm, beautiful, and comforting spaces.',
                        },
                        {
                            title: 'Our Promise',
                            text: 'Premium fragrances, handcrafted products, elegant designs, and timeless scents made for modern living.',
                        },
                        {
                            title: 'Our Story',
                            text: 'From a small table setup to thoughtfully curated collections, our journey is rooted in comfort and creativity.',
                        },
                    ].map((item) => (
                        <Card
                            key={item.title}
                            radius="xl"
                            p="xl"
                            shadow="sm"
                            bg="white"
                            withBorder
                        >
                            <Stack gap="md">
                                <ThemeIcon radius="xl" size={48} color="orange" variant="light">
                                    <IconSparkles size={24} />
                                </ThemeIcon>
                                <Title order={3} c="#3E3028">
                                    {item.title}
                                </Title>
                                <Text c="#6B5A50" lh={1.8}>
                                    {item.text}
                                </Text>
                            </Stack>
                        </Card>
                    ))}
                </SimpleGrid>

                <Paper radius={40} p={{ base: 'xl', md: 50 }} bg="#EADCD2" mt={80} id={'custom-candles'}>
                    <Grid gutter={50}>
                        <GridCol span={{ base: 12, md: 6 }}>
                            <Stack gap="lg">
                                <Badge variant="light" color="orange" radius="xl" w="fit-content">
                                    Visit Us
                                </Badge>

                                <Title order={2} c="#3E3028">
                                    Our Studio
                                </Title>

                                <Group align="flex-start" gap="md">
                                    <ThemeIcon size={46} radius="xl" color="orange" variant="filled">
                                        <IconBuilding size={22} />
                                    </ThemeIcon>

                                    <Box>
                                        <Text fw={600} size="lg" c="#3E3028">
                                            Loom & Lume Studio
                                        </Text>
                                        <Text size="lg" c="#5E4B40">
                                            Bengaluru, Karnataka, India
                                        </Text>
                                    </Box>
                                </Group>
                            </Stack>
                        </GridCol>

                        <GridCol span={{ base: 12, md: 6 }}>
                            <Stack gap="lg">
                                <Badge variant="light" color="orange" radius="xl" w="fit-content">
                                    Business Enquiries
                                </Badge>

                                <Title order={2} c="#3E3028">
                                    Let’s Work Together
                                </Title>

                                <Text size="lg" c="#5E4B40" lh={1.8}>
                                    For collaborations, wholesale partnerships, gifting enquiries,
                                    or other business-related requests, feel free to get in touch
                                    with us.
                                </Text>

                                <Card radius="xl" p="lg" bg="white" shadow="sm" withBorder>
                                    <Group>
                                        <ThemeIcon size={46} radius="xl" color="orange" variant="light">
                                            <IconMail size={22} />
                                        </ThemeIcon>

                                        <Box>
                                            <Text tt="uppercase" fz="xs" fw={700} c="#B88367">
                                                Email Us
                                            </Text>
                                            <Text fw={600} size="lg" c="#3E3028">
                                                {en.companyEmail}                                            </Text>
                                        </Box>
                                    </Group>
                                </Card>

                                <Button
                                    color="orange"
                                    radius="xl"
                                    size="md"
                                    w="fit-content"
                                >
                                    Contact Us
                                </Button>
                            </Stack>
                        </GridCol>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    )
}
