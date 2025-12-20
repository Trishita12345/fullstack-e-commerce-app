import { Box, Group, Title } from "@mantine/core";
import CreateCategory from "./(create-category)/create-category";
import { apiFetch } from "@/lib/apiFetch";
import { type CategoryListType } from "@/constants/types";

const Categories = async () => {
  const categories = await apiFetch<CategoryListType[]>("/category");

  return (
    <Box>
      <Group justify="space-between">
        <Title order={3}>Categories</Title>
        <CreateCategory />
      </Group>
      {categories.map((c: CategoryListType) => (
        <>{c.name}, </>
      ))}
    </Box>
  );
};

export default Categories;
