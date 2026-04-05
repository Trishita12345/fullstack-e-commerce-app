"use client";

import {
    Stack,
    TextInput,
    Group,
    Button,
    Select,
    Grid,
    GridCol,
    Text,
} from "@mantine/core";
import type { User, ErrorResponse } from "@/constants/types";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notify } from "@/utils/helperFunctions";
import { updateUser } from "../actions";
import { DateInput } from "@mantine/dates";
import { useAuthActions } from "@/utils/store/auth";
import { apiFetch } from "@/lib/apiFetch";


const UpdateProfileForm = ({ userInfodata, redirecturl }: { userInfodata?: User; redirecturl?: string }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { setUserInfo } = useAuthActions();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: userInfodata
    });

    useEffect(() => {
        if (userInfodata) {
            form.setValues(userInfodata);
        }
    }, [userInfodata]);

    const handleSubmit = async (values: User) => {
        try {
            console.log('values: ', values)
            setLoading(true);
            const updatedUser = await updateUser(values);
            setUserInfo(updatedUser);
            debugger;
            notify({
                variant: "success",
                title: "Success!",
                message: "Profile details updated successfully."
            });
            redirecturl ? router.push(redirecturl.split(process.env.NEXT_PUBLIC_FRONTEND!)[1]) : router.push(`/my-profile`);
        } catch (e) {
            notify({
                variant: "error",
                title: "Opps!",
                message: (e as ErrorResponse)?.message || "Failed to update profile details ."
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack>
                <Grid>
                    <GridCol span={12}>
                        <TextInput
                            {...form.getInputProps("fullName")}
                            label="Full Name"
                            key={form.key("fullName")}
                        />
                    </GridCol>
                    <GridCol span={12}>
                        <TextInput
                            {...form.getInputProps("emailId")}
                            label="Email Id"
                            key={form.key("emailId")}
                        />
                    </GridCol>
                    <GridCol span={12}>
                        <TextInput
                            leftSection={
                                <Text size="13px" c={"gray.3"}>
                                    +91
                                </Text>
                            }
                            {...form.getInputProps("phoneNumber")}
                            label={"Phone Number"}
                            key={form.key("phoneNumber")}
                            type="number"
                            disabled

                        />
                    </GridCol>
                    <GridCol span={12}>
                        <Select
                            {...form.getInputProps("gender")}
                            label="Gender"
                            placeholder="Select Gender..."
                            key={form.key("gender")}
                            data={['MALE', 'FEMALE', 'PREFER NOT TO SAY']}
                            allowDeselect={false}
                        />
                    </GridCol>
                    <GridCol span={12}>
                        <DateInput
                            label="Date of Birth"
                            placeholder="Select date"
                            {...form.getInputProps("dob")}
                            key={form.key("dob")}
                            maxDate={new Date()}
                        />
                    </GridCol>
                </Grid>
                <Group mt="lg">
                    <Button
                        type="reset"
                        color="black.9"
                        variant="outline"
                        onClick={form.reset}
                    >
                        Reset
                    </Button>
                    <Button type="submit" bg="black.9" loading={loading}>
                        Submit
                    </Button>
                </Group>
            </Stack>
        </form >
    );
};

export default UpdateProfileForm;
