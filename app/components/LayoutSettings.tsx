'use client';
import Image from "next/image";
import Settings from "./Settings";
import User from "./User";
import { memo, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/redux/hooks";

export default memo(function LayoutSettings({isLoggedIn} : {isLoggedIn: boolean}) {

    const pathname = usePathname();
    const [user, setUser] = useState(isLoggedIn);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await fetch('/api/retrieve-session').then(res => res.json());
            if(session.body === '') {
                setUser(false);
            } else {
                setUser(true);
            }
        }
        fetchSession();
    },[pathname]);

    return (
        <>
        {
            user ? (
            <div className={'menu flex gap-[1rem]'}>
                <div className="self-center">
                    <img src={'/icons/notification.webp'} className="self-center rounded-md h-[auto] w-[35px] relative" width={100} height={100}  alt="website banner" />
                </div>
                <div className="self-center flex">
                    <Settings />
                </div>
            </div>
            ):(
                <User />
            )
        }
        </>
    )
});