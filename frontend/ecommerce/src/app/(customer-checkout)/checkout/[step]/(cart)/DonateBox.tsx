import { Button, Checkbox, Divider, Group, Stack, Text } from "@mantine/core";
import { useState } from "react";

const DonateBox = () => {
  const [value, setValue] = useState<number | undefined>();

  const donationList = [10, 20, 30, 50, 100]
  const handleClick = (val: number) => {
    setValue(val)
  }
  const addOrRemoveDonation = (e: React.MouseEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked == false)
      setValue(undefined);
    else setValue(donationList[0])
  }
  return (
    <Stack gap={16}>
      <Text size="11px" fw={700} c="black.7" tt={"uppercase"} lts={0.5}>
        Support transformative social work in India
      </Text>
      <Group gap={4}>
        <Checkbox checked={value !== undefined} onClick={addOrRemoveDonation} color={"primaryDark.7"} label={"Donate and make a difference"} styles={{
          label: {
            color: "var(--mantine-color-black-8)",
            fontWeight: 800,
            fontSize: "13px"
          }
        }} />
      </Group>
      <Group gap={8}>
        {donationList.map(
          (donation) => <Button variant="outline" key={donation}
            color={value === donation ? "primary.9" : "black.9"}
            fw={value === donation ? 800 : 400}
            radius={"xl"} onClick={() => handleClick(donation)}>₹{donation}</Button>)
        }
      </Group>
      <Text size="sm" fw={700} c={"primaryDark.7"}>Know More</Text>
      <Divider color="gray.1" mt={4} />
    </Stack>
  );
};

export default DonateBox;
