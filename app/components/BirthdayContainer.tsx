'use client';
import { useEffect, useRef, useState } from "react";
import BirthdayAvatar from "./BirthdayAvatar";
import Image from "next/image";

interface BirthdayAvatars {
    bdayAvt: Array<String>
}
export default function BirthdayContainer({bdayAvt} : BirthdayAvatars) {

    const sliderContainer = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState(0);

    const [textDis, setTextDis] = useState('');
    

    useEffect(() => {
        if(sliderContainer.current == null)
            return;
        
        sliderContainer.current.style.transition = "all 1s linear";
        let start:DOMHighResTimeStamp = 0;
    
        const sliderInt = setInterval(() => {
            if(sliderContainer.current != null) {
                sliderContainer.current.scrollTo({
                    left: sliderContainer.current.scrollLeft + 1,
                    behavior: 'smooth'
                })
            }
        },35);

        let tx = "HAAPPY BIRTHDAY!!";
        let idx = 0;

        const int = setInterval(() => {
            if(tx.length > 0) {
                console.log(tx[0])
                setTextDis(prevState => prevState.concat(tx[0] || ''));
                tx = tx.substring(1);
            }else if(idx === 2) {
                clearInterval(int)
            } else if(tx.length == 0 && idx < 2) {
                setTextDis('');
                tx = " HAPPY BIRTHDAY!!"
                idx++;
            }

            
        },500);

        return () => {
            clearInterval(sliderInt);
            clearInterval(int);
        }
      }, []);
    

    return (
        <div className="flex flex-col gap-[40px] justify-center items-center mt-[30px] relative">
            <div className="title">
                <h1 className="text-[23px] font-bold text-[#523636] relative after:content-[''] z-[1] after:w-[105%] after:left-[-7px] after:h-[40px] after:top-[5px] after:z-[-1] after:flex after:absolute after:bg-[#FFE9C9]">本日お誕生日のわんちゃん</h1>
                <div className="absolute z-[-1] left-[0px] w-full top-[17px] border-[1px] border-solid border-[#523636]"/>
            </div>
            <div ref={sliderContainer} className="bday-container flex w-full overflow-x-scroll gap-[20px]">
                {
                bdayAvt.map((el) => BirthdayAvatar({src: String(el)}))
                }
            </div>
            <div className="relative top-[-40px]">
                <Image src={'/LP/bdayvideo.gif'} className="rounded-md w-[100%] h-[100%] inline max-w-none object-fill" width={10000} height={10000}  alt="website banner" />
            </div>
        </div>
    )
}