'use client';
import { Card, Button, Divider, Group, Text, Drawer, Box } from "@mantine/core";
import { IconArrowsSort, IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";
import PlpSorting from "../../PlpSorting";
import { CategoriesCardType } from "@/(components)/categoriesCard";
import CategoriesFilter from "../CategoriesFilter";


const PlpBottomNav = ({ categories }: { categories: CategoriesCardType[] }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [drawerState, setDrawerState] = useState<'c' | 's' | 'f'>('c')

    const handleOpen = (state: 'c' | 's' | 'f') => {
        setDrawerState(state);
        open();
    }


    const drawerTitle = drawerState === 'c' ? 'Category' : drawerState === 's' ? 'Sort By' : 'Filters'

    const DrawerContent = () => {
        switch (drawerState) {
            case 'c': {
                return <CategoriesFilter categories={categories} isMobile handleClose={close} />
            }
            case 's': {
                return <PlpSorting isMobile handleClose={close} />
            }
            case 'f': {
                return <>Filter</>
            }
            default: {
                return null;
            }
        }
    }

    return (
        <>
            <Drawer offset={8} radius="md" opened={opened} onClose={close} title={drawerTitle} position="bottom"
                styles={{
                    content: {
                        borderRadius: 0
                    },
                    body: {
                        padding: 0
                    }
                }}
            >
                <>
                    <Divider color="gray.1" />
                    <Box p={16}><DrawerContent /></Box>
                </>
            </Drawer>
            <Card pos={'fixed'} bottom={0} w="100%" display={'flex'}
                style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
                shadow="sm"
                hiddenFrom="md"
            >
                <Button variant="transparent" w={'max-content'} onClick={() => handleOpen('c')}>
                    <Text tt='uppercase' size='xs' fw={600} c='black.8'>
                        Category
                    </Text>
                </Button>
                <Divider orientation="vertical" />
                <Button variant="transparent" w={'max-content'} c='black.8' onClick={() => handleOpen('s')}>
                    <Group>
                        <IconArrowsSort />
                        <Text tt='uppercase' size='xs' fw={600}>
                            Sort
                        </Text>
                    </Group>
                </Button>
                <Divider orientation="vertical" />
                <Button variant="transparent" w={'max-content'} c='black.8' onClick={() => handleOpen('f')}>
                    <Group>
                        <IconAdjustmentsHorizontal />
                        <Text tt='uppercase' size='xs' fw={600}>
                            Filter
                        </Text>
                    </Group>
                </Button>
            </Card >
        </>
    )
}

export default PlpBottomNav;