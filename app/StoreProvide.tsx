"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/redux/store";
import { initializeCount } from "@/lib/redux/states/counterSlice";

export default function StoreProvider({
    count,
    children
}: {
    count: number,
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>();
    if(!storeRef.current) {
        storeRef.current = makeStore();
        storeRef.current.dispatch(initializeCount(count));
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}