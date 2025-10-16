"use client"

import { useParams } from "next/navigation"

const UseRecoveryCodePage = () => {
    const { code } = useParams();

    return(
        <p>{code}</p>
    )
}

export default UseRecoveryCodePage;