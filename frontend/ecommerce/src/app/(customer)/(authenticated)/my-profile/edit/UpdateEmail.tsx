import { notify } from "@/utils/helperFunctions";
import { useResendTimer } from "@/utils/hooks/useResendTimer";
import { Box, Button, Modal, PinInput, Stack, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { ChangeEventHandler, useState } from "react";
import { generateEmailOtp, verifyEmailOtp } from "../actions";
import { apiFetch } from "@/lib/apiFetch";

const UpdateEmail = ({ setFormEmailValue, currEmail }: { setFormEmailValue: (value: string) => void, currEmail: string }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | undefined>(undefined);
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const { timer, canResend, resetTimer } = useResendTimer(30);


    const handleResend = async () => {
        try {
            setisLoading(true);
            await generateEmailOtp(email);;
            notify({
                variant: 'success',
                title: 'OTP Sent',
                message: 'OTP has been resent successfully.',
            });

            resetTimer();
        } catch (err) {
            notify({
                variant: 'error',
                title: 'Error!',
                message: (err as Error)?.message || 'Failed to resend OTP.',
            });
        } finally {
            setisLoading(false);
        }
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (value === '') setEmailError(undefined)
        else setEmailError(!emailRegex.test(value) ? 'Please enter a valid email' : undefined);
    }

    const backToEmail = () => {
        setOtp('');
        setIsOtpStep(false)
        setisLoading(false)
        resetTimer();
    }

    const closeModal = () => {
        close();
        setEmail('');
        setEmailError(undefined);
        setOtp('');
        setIsOtpStep(false)
        setisLoading(false)
        resetTimer();
    }

    const generateOtp = async () => {
        try {
            if (currEmail === email) {
                setEmailError('Email Id already verified')
                return
            }
            await generateEmailOtp(email);
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
            await verifyEmailOtp(email, otp);
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
                message: 'Invalid OTP, please try again.'
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
                            <Text c='red' size='xs'>{emailError}</Text>
                        </Box>
                        <Button fullWidth disabled={email === '' || emailError !== undefined || isLoading} loading={isLoading}
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
                        <Stack gap={4}>
                            <Button fullWidth disabled={otp.length < 6 || isLoading} loading={isLoading}
                                onClick={verifyOtp}>
                                Verify
                            </Button>
                            <Button
                                variant="transparent"
                                w={'100%'}
                                color={canResend ? "primaryDark.7" : "gray"}
                                onClick={canResend ? handleResend : undefined}
                                style={{ cursor: canResend ? 'pointer' : 'not-allowed' }}
                            >
                                {canResend ? 'Resend OTP' : `Resend OTP in 00:${timer.toString().padStart(2, '0')}`}
                            </Button>
                        </Stack>
                    </Stack>}
            </Box>
        </Modal>
    </>)
}

export default UpdateEmail;