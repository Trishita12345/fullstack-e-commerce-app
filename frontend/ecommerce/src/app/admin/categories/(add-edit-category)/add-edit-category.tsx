"use client";
import { Box, Button, Divider, Group, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import AddEditCategoryForm from "./add-edit-category-form";
import { ActionButton } from "@/(components)/ActionButton";

const AddEditCategory = ({ id }: { id?: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={true}
        title={!id ? "Create Category" : "Update Category"}
        centered
        styles={{
          title: {
            fontWeight: "600",
          },
        }}
      >
        <>
          <Divider mb={16} />
          <AddEditCategoryForm popUpClose={close} id={id} />
        </>
      </Modal>
      {!id ? (
        <ActionButton
          onClick={open}
          Icon={<IconPlus size={"20"} />}
          label={"Create Category"}
          variant="filled"
          c="white"
          size="xs"
        />
      ) : (
        <ActionButton
          Icon={<IconEdit size={"16px"} />}
          label="Edit"
          onClick={open}
        />
      )}
    </Box>
  );
};

export default AddEditCategory;
