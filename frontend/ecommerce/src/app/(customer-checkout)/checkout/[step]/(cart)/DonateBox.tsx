import { formattedPrice } from "@/utils/helperFunctions";
import { useCartActions, useDonation } from "@/utils/store/cart";
import { Button, Checkbox, Divider, Group, Stack, Text } from "@mantine/core";

const DonateBox = () => {
  const value = useDonation();
  const { setDonation } = useCartActions();
  const donationList = [10, 20, 50, 100];
  const handleClick = (val: number) => {
    setDonation(val);
  };
  const addOrRemoveDonation = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked == false) setDonation(0);
    else setDonation(donationList[0]);
  };
  return (
    <Stack gap={16}>
      <Text size="11px" fw={700} c="black.7" tt={"uppercase"} lts={0.5}>
        Support transformative social work in India
      </Text>
      <Group gap={4}>
        <Checkbox
          checked={value > 0}
          onClick={addOrRemoveDonation}
          color={"primaryDark.7"}
          label={"Donate and make a difference"}
          styles={{
            label: {
              color: "var(--mantine-color-black-8)",
              fontWeight: 700,
              fontSize: "13px",
            },
          }}
        />
      </Group>
      <Group gap={8}>
        {donationList.map((donation) => (
          <Button
            size="xs"
            variant="outline"
            key={donation}
            color={value === donation ? "primaryDark.7" : "black.9"}
            fw={600}
            radius={"xl"}
            onClick={() => handleClick(donation)}
            bd={`1px solid ${value === donation ? "primaryDark.7" : "black.2"}`}
          >
            {formattedPrice(donation)}
          </Button>
        ))}
      </Group>
      <Text
        size="xs"
        fw={600}
        c={"primaryDark.7"}
        style={{ cursor: "pointer" }}
      >
        Know More
      </Text>
      <Divider color="gray.1" mt={4} />
    </Stack>
  );
};

export default DonateBox;
