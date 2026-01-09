import {
  AccordionItem,
  AccordionControl,
  AccordionPanel,
  Text,
} from "@mantine/core";

const PdpAccordionItem = ({
  content,
  label,
}: {
  content: string;
  label: string;
}) => {
  return (
    <AccordionItem
      key={label}
      value={label}
      styles={{
        item: {
          borderBottom: "1px solid var(--mantine-color-gray-2)",
          paddingBlock: "16px",
        },
      }}
    >
      <AccordionControl
        styles={{
          control: {
            paddingLeft: 0,
          },
        }}
        chevron={
          <Text size={"18px"} fw={500} c={"black.8"}>
            +
          </Text>
        }
      >
        <Text lts={1} size="12px" fw={700} tt={"uppercase"} c={"black.8"}>
          {label}
        </Text>
      </AccordionControl>
      <AccordionPanel>
        <Text
          lts={1}
          size="13px"
          lh={1.8}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </AccordionPanel>
    </AccordionItem>
  );
};

export default PdpAccordionItem;
