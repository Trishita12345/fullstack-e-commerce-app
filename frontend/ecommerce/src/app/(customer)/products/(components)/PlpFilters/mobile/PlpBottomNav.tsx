'use client';
import { Card, Button, Divider, Group, Text, Drawer, Box } from "@mantine/core";
import { IconArrowsSort, IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { useState } from "react";
import PlpSorting from "../../PlpSorting";
import { CategoriesCardType } from "@/(components)/categoriesCard";
import CategoriesFilter from "../CategoriesFilter";
import { PlpMobileFilterTab } from "./PlpMobileFilterTabs";
import { FacetValue } from "@/constants/types";


const PlpBottomNav = ({ categories, facets }: { categories: CategoriesCardType[], facets: Record<string, FacetValue[]> }) => {
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
                return <PlpMobileFilterTab facets={facets} />
            }
            default: {
                return null;
            }
        }
    }

    return (
        <>
            <Drawer offset={0} radius="md" opened={opened} onClose={close} title={drawerTitle} position="bottom"
                styles={{
                    content: {
                        overflow: "clip",
                        borderEndEndRadius: 0,
                        borderEndStartRadius: 0,
                    },
                    body: {
                        padding: 0,
                        overflowY: "hidden"
                    }
                }}
            >

                <Divider color="gray.1" />
                <DrawerContent />
            </Drawer>
            <Card pos={'fixed'} bottom={0} w="100%" display={'flex'}
                style={{ flexDirection: 'row', justifyContent: 'space-evenly', zIndex: 100 }}
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