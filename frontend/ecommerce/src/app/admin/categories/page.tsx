// import {
//   Box,
//   Button,
//   Group,
//   Table,
//   TableTbody,
//   TableTd,
//   TableTh,
//   TableThead,
//   TableTr,
//   Text,
//   Title,
// } from "@mantine/core";
// import CreateCategory from "./(create-category)/create-category";
// import { apiFetch } from "@/lib/apiFetch";
// import { type CategoryListType } from "@/constants/types";
// import Link from "next/link";
// import { IconEdit } from "@tabler/icons-react";

// const Categories = async () => {
//   const categories = await apiFetch<CategoryListType[]>("/category");

//   return (
//     <Box>
//       <Group justify="space-between">
//         <Title order={3}>Categories</Title>
//         <CreateCategory />
//       </Group>
//       <Table mt={12} p={0} withTableBorder>
//         <TableThead>
//           <TableTr bg={"primaryDark.1"}>
//             <TableTh>
//               <Group>
//                 <Text> </Text>
//                 <Text>Category name</Text>
//               </Group>
//             </TableTh>
//             <TableTh>Inherited From</TableTh>
//             <TableTh></TableTh>
//           </TableTr>
//         </TableThead>

//         <TableTbody>
//           {categories.map((c: CategoryListType, index) => (
//             <TableTr key={c.id}>
//               <TableTd>
//                 <Group>
//                   <Text>{index}</Text>
//                   <Text>{c.name}</Text>
//                 </Group>
//               </TableTd>
//               <TableTd>{c.parentCategory?.label}</TableTd>
//               <TableTd align="right">
//                 {!c.isParentCategory ? (
//                   <Link href={"categories/" + c.id}>
//                     <Button size="xs" bg={"black.9"} leftSection={<IconEdit />}>
//                       Manage Variant
//                     </Button>
//                   </Link>
//                 ) : null}
//               </TableTd>
//             </TableTr>
//           ))}
//         </TableTbody>
//       </Table>
//     </Box>
//   );
// };

// export default Categories;

import { ListPageClient } from "@/(components)/adminListPage";
import type { SortableField } from "@/(components)/adminListPage/SortButton";
import type { Page, CategoryListType } from "@/constants/types";
import { apiFetch } from "@/lib/apiFetch";
import CreateCategory from "./(create-category)/create-category";

interface PageProps {
  searchParams: {
    page?: string;
    sortBy?: string;
    direction?: string;
    query?: string;
  };
}

export default async function Categories({ searchParams }: PageProps) {
  const page = Number(searchParams.page ?? 1) - 1;
  const sortBy = searchParams.sortBy;
  const direction = searchParams.direction;
  const query = searchParams.query ?? "";

  const categories = await apiFetch<Page<CategoryListType>>(
    `/category?query=${query}`,
    {
      method: "POST",
      body: {
        page,
        size: 10,
        sortBy: sortBy || "createdAt",
        direction: direction || "desc",
      },
    }
  );

  const sortableFields: SortableField[] = [
    {
      field: "name",
      label: "Name",
      type: "string",
    },
  ];

  return (
    <ListPageClient
      title="Categories"
      addButton={<CreateCategory />}
      pageData={categories}
      fields={sortableFields}
      tableContent={{
        head: ["Name", "hi"],
        body: categories.content.map((item: any) => [item.name, <div>hi</div>]),
      }}
    />
  );
}
