"use client";

import {
    Stack,
    TextInput,
    Group,
    Button,
    Select,
    Grid,
    GridCol,
    Box,
    useDrawerStackContext,
    Text,
} from "@mantine/core";
import type { FullUser, Gender } from "@/constants/types";
import { useForm, isNotEmpty } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notify } from "@/utils/helperFunctions";
import { getUser, updateUser } from "../actions";
import { useDisclosure } from "@mantine/hooks";
import UploadDropzone from "@/(components)/UploadDropzone";
import { DateInput } from "@mantine/dates";
import { apiFetch } from "@/lib/apiFetch";


const UpdateProfileForm = ({ userInfodata }: { userInfodata: FullUser }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const [visible, { open, close }] = useDisclosure(false);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: userInfodata || {
            id: '',
            userId: '',
            phoneNumber: '',
            phoneNumberVerified: false,
            emailId: '',
            emailIdVerified: false,
            fullname: 'a',
            profileImg: '',
            gender: 'MALE' as Gender,
            dob: '',
            createdAt: '',
            updatedAt: ''
        },
    });

    const handleSubmit = async (values: FullUser) => {
        try {
            console.log('values: ', values)
            setLoading(true);
            updateUser(values);
            notify({
                variant: "success",
                title: "Success!",
                message: "Profile details updated successfully."
            });
            router.push(`/my-profile`);
        } catch(e) {
            console.log(e);
            notify({
                variant: "error",
                title: "Opps!",
                message: "Failed to update profile details ."
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
                            {...form.getInputProps("fullname")}
                            label="Full Name"
                            key={form.key("fullname")}
                            disabled
                        />
                    </GridCol>
                    <GridCol span={12}>
                        <TextInput
                            {...form.getInputProps("emailId")}
                            label="Email Id"
                            key={form.key("emailId")}
                            disabled
                        />
                    </GridCol>
                    <GridCol span={12}>
                        <TextInput
                            leftSection={
                                <Text size="13px" c="black">
                                    +91
                                </Text>
                            }
                            {...form.getInputProps("phoneNumber")}
                            label={"Phone Number"}
                            key={form.key("phoneNumber")}
                            type="number"
                            max={9999999999}
                        />
                    </GridCol>
                    <GridCol span={12}>
                        <Select
                            {...form.getInputProps("gender")}
                            label="Gender"
                            placeholder="Select Gender..."
                            key={form.key("gender")}
                            data={['MALE', 'FEMALE', 'OTHERS']}
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
                    <GridCol span={{ base: 12 }}>
                        <UploadDropzone
                            label="Profile Image"
                            {...form.getInputProps("profileImg")}
                            key={form.key("profileImg")}
                            errors={form.errors}
                            field="profileImg"
                            visible={visible}
                            open={open}
                            close={close}
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
