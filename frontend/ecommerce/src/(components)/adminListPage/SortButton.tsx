import { useSearchParams } from "next/navigation";
import { Box, Button, Menu, Text } from "@mantine/core";
import { IconSwitchVertical } from "@tabler/icons-react";
import type { QueryParamProps } from "@/constants/types.js";
import { ActionButton } from "../ActionButton";

export type SortableField = {
  field: string;
  label: string;
  type: "string" | "number" | "date";
};
// generate label with column name and type -> Name : A → Z
const getSubItemLabel = (cfg: SortableField, direction: "asc" | "desc") => {
  let orderLabel = "";
  switch (cfg.type) {
    case "string":
      orderLabel = direction === "desc" ? "Z → A" : "A → Z";
      break;
    case "number":
      orderLabel =
        direction == "desc" ? "Highest → Lowest" : "Lowest → Highest";
      break;
    case "date":
      orderLabel = direction == "desc" ? "Latest First" : "Oldest First";
  }
  return `${cfg.label} : ${orderLabel}`;
};

export const SortButton = ({
  onItemClick,
  fields,
}: {
  onItemClick: (item: QueryParamProps) => void;
  fields: SortableField[];
}) => {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") ?? "";
  const direction = searchParams.get("direction") ?? "";
  // generate subItem in dropdown
  const SubItemField = ({
    field,
    direction,
  }: {
    field: SortableField;
    direction: "asc" | "desc";
  }) => {
    const label = getSubItemLabel(field, direction);
    return (
      <Menu.Item
        key={label}
        onClick={() => {
          onItemClick({
            sortBy: field.field,
            direction: direction,
          });
        }}
      >
        {label}
      </Menu.Item>
    );
  };
  // Displayed main button label
  const mainLabel = sortBy
    ? getSubItemLabel(
        fields.find((item) => item.field == sortBy) as SortableField,
        direction as "asc" | "desc"
      )
    : "Sort";

  return (
    <Menu width={220} position="bottom" withArrow>
      <Menu.Target>
        <Box>
          <ActionButton
            Icon={<IconSwitchVertical size={"20"} />}
            label={mainLabel}
            variant="subtle"
            size="sm"
          />
        </Box>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Sort by</Menu.Label>
        {fields.map((field) => (
          <Menu.Sub key={field.label}>
            <Menu.Sub.Target>
              <Menu.Sub.Item>{field.label}</Menu.Sub.Item>
            </Menu.Sub.Target>
            <Menu.Sub.Dropdown>
              <SubItemField field={field} direction={"asc"} />
              <SubItemField field={field} direction={"desc"} />
            </Menu.Sub.Dropdown>
          </Menu.Sub>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
