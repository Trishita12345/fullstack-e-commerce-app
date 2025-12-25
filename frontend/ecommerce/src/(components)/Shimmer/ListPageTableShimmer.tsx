import {
  Skeleton,
  Table,
  Group,
  Box,
  Stack,
  TableThead,
  TableTbody,
  TableTd,
  TableTh,
  TableTr,
} from "@mantine/core";

const ROWS = 4;

export function ListPageTableShimmer({
  cols,
  actionCol = true,
}: {
  cols: number;
  actionCol?: boolean;
}) {
  return (
    <Stack gap="md" mt={16}>
      <Group justify="space-between">
        <Skeleton height={36} width={180} />
        <Group>
          <Skeleton height={36} width={60} />
          <Skeleton height={36} width={160} />
        </Group>
      </Group>

      <Box
        style={{
          border: "1px solid #dee2e6",
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableThead>
            <TableTr>
              {Array.from({ length: cols }).map((_, index) => (
                <TableTh key={index}>
                  <Skeleton height={14} width={80} />
                </TableTh>
              ))}
            </TableTr>
          </TableThead>

          <TableTbody>
            {Array.from({ length: ROWS }).map((_, index) => (
              <TableTr key={index}>
                {Array.from({ length: cols }).map((_, index) => (
                  <TableTd key={index}>
                    <Skeleton height={18} width="100%" />
                  </TableTd>
                ))}
                {actionCol && (
                  <TableTd>
                    <Group gap="sm" justify="end">
                      <Skeleton height={36} width={100} />
                      <Skeleton height={36} width={100} />
                    </Group>
                  </TableTd>
                )}
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </Box>
    </Stack>
  );
}
