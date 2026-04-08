import { notify } from "@/utils/helperFunctions";
import { useResendTimer } from "@/utils/hooks/useResendTimer";
import { Box, Button, Modal, PinInput, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { ChangeEventHandler, useState } from "react";

const UpdateEmail = ({ setFormEmailValue }: { setFormEmailValue: (value: string) => void }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const { timer, canResend, resetTimer } = useResendTimer(30);


    const handleEmailChange = (value: string) => {
        setEmail(value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value === '') setEmailError(false)
        else setEmailError(!emailRegex.test(value));
    }

    const backToEmail = () => {
        setOtp('');
        setIsOtpStep(false)
        setisLoading(false)
    }

    const closeModal = () => {
        close();
        setEmail('');
        setEmailError(false);
        setOtp('');
        setIsOtpStep(false)
        setisLoading(false)
    }

    const generateOtp = async () => {
        try {
            setIsOtpStep(true);
        } catch {
            notify({
                variant: 'error',
                title: 'Error!',
                message: 'Something went wrong, please try again.'
            })
        }
    }

    const verifyOtp = async () => {
        try {
            closeModal();
            setFormEmailValue(email);
            notify({
                variant: 'success',
                title: 'Success!',
                message: 'Email verified'
            })
        } catch {
            notify({
                variant: 'error',
                title: 'Error!',
                message: 'Something went wrong, please try again.'
            })
        }
    }

    return (<>
        <IconEdit onClick={open}
            style={{ cursor: 'pointer', color: 'var(--mantine-color-primary-8' }}
        />
        <Modal opened={opened} onClose={closeModal} centered
            size={"md"}
            title={!isOtpStep ? "Update Your Email Address" : "Enter OTP"}
            styles={{
                title: {
                    fontWeight: 600
                }
            }}>
            <Box pb={8}>
                {!isOtpStep ?
                    <Stack>
                        <Text size='sm' c='dimmed'>
                            We'll send an otp to this address for verification purpose
                        </Text>
                        <Box>
                            <TextInput value={email} label='Email Id' onChange={(e) => handleEmailChange(e.target.value)} />
                            <Text c='red' size='xs'>{emailError ? 'Please enter a valid email' : ''}</Text>
                        </Box>
                        <Button fullWidth disabled={email === '' || emailError || isLoading} loading={isLoading}
                            onClick={generateOtp}>
                            Continue
                        </Button>
                    </Stack>
                    : <Stack gap={20}>
                        <Text size='sm' c='dimmed' pos={'relative'}>
                            We have send an otp to <span style={{ color: 'black', fontWeight: 500 }}>{email}&nbsp;</span>
                            <IconEdit
                                color="var(--mantine-color-primaryDark-7)"
                                size={'18px'}
                                style={{ position: 'absolute', cursor: 'pointer' }}
                                onClick={backToEmail}
                            />
                        </Text>
                        <PinInput value={otp} onChange={setOtp} type={/^[0-9]*$/} inputType="tel" inputMode="numeric" length={6} />
                        <Button fullWidth disabled={otp.length < 6 || isLoading} loading={isLoading}
                            onClick={verifyOtp}>
                            Verify
                        </Button>
                    </Stack>}
            </Box>
        </Modal >
    </>)
}

export default UpdateEmail;