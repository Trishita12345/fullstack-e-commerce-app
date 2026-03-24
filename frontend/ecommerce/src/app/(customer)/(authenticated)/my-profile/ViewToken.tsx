'use client';

import { ActionButton } from "@/(components)/ActionButton";
import { copyText } from "@/utils/helperFunctions";
import { IconChecks, IconCopy } from "@tabler/icons-react";
import { useState } from "react";

export const ViewToken = ({ token }: { token: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        try {
            copyText(token);
            setCopied(true);
        } catch { }
    }

    return (
        <>
            {copied ? <ActionButton
                onClick={() => { }}
                Icon={<IconChecks color="green" size='16' />}
                label={"Copied"}
                size="xs"
            /> : <ActionButton
                onClick={handleCopy}
                Icon={<IconCopy color="orange" size='16' />}
                label={"Copy Token"}
                size="xs"
            />
            }
        </>
    );
}