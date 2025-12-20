"use client";
import { Box, Button, Divider, Group, Modal, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import CreateCategoryForm from "./create-category-form";

const CreateCategory = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={true}
        title="Create Category"
        centered
        styles={{
          title: {
            fontWeight: "600",
          },
        }}
      >
        <>
          <Divider mb={16} />
          <CreateCategoryForm popUpClose={close} />
        </>
      </Modal>
      <Button leftSection={<IconPlus />} bg="black.9" onClick={open}>
        Create Category
      </Button>
    </Box>
  );
};

export default CreateCategory;
