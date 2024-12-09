
import { Metadata, ResolvingMetadata } from "next";
import TabList from "./components/TabList";
import { retrieveDecryptedSession, retrieveLikedRecipes, retrieveUserRecipes } from "@/action/users";
import { logEnd, logStart } from "@/action/lib";
import { DogData } from "@/constants/interface";
import React, { Suspense } from "react";
import IndexLoading from "@/app/loading";
import Link from "next/link";
import PetList from "./components/PetList";
import OptImage from "@/app/components/ElementComponents/Image";
import { redirect } from "next/navigation";

type Props = {
    params: {userId: String},
    searchParams: {[key: string]: string | string[] | undefined}
}

export async function generateMetadata({params} : Props, parent: ResolvingMetadata):Promise<Metadata> {
    const {userId} = params;
    const {userDetails} = await retrieveDecryptedSession();
    const title = `${userDetails.user_codename}`;

    return {
        title: title
    }
}

export default async function User() {

    const {decryptedSession, userDetails} = await retrieveDecryptedSession();
    if(userDetails.user_id === 0) redirect("/signup/personal-info");
    const image_url = userDetails.user_image === '' ? `/recipe-making/pic-background.webp` : userDetails.user_image;
    const pets : DogData[] = userDetails.pets;

    const st = logStart("Retrieving Owned Recipes");
    const recipes = await retrieveUserRecipes(userDetails.user_id, 1);
    logEnd(st);

    const st1 = logStart("Retrieving Liked Recipes");
    const liked_recipes = await retrieveLikedRecipes(userDetails.user_id, 1);
    logEnd(st1);

    const recipes_data = recipes.body || [];
    const liked_recipes_data = liked_recipes.body || [];
    
    return (
        <Suspense fallback={<IndexLoading />}>
            <div className="flex flex-col justify-center items-center ">
                <div className="relative pb-[100px] max-w-xl w-full">
                    <div className="user-image relative flex flex-col justify-center items-center mt-[30px]">
                        <div className="hidden md:block">
                          <OptImage src={image_url} centered className=" rounded-full object-cover relative" square width={350} height={350}  alt="website banner"/>
                        </div>
                        <div className="block md:hidden">
                          <OptImage src={image_url} centered className=" rounded-full object-cover relative" square width={150} height={150}  alt="website banner"/>
                        </div>
                        <h1 className="text-[36px] font-bold text-[#5b5351]">{userDetails.user_codename === '' ? `Wanuser` + decryptedSession.user.user_id : userDetails.user_codename}</h1>
                    </div>
                    <div className="flex justify-center items-center relative mt-12 mb-4">
                        <h1 className="absolute text-sm md:text-lg top-2 md:top-4 font-semibold text-[#523636]">うちのわん</h1>
                        <img loading="lazy" src={'/icons/ribbon.webp'} className="h-[auto] w-[200px] sm:w-[300px] max-w-none" width={100} height={100}  alt="website banner" />
                    </div>
                    <PetList pets={pets}/>
                    <TabList owned_recipes={recipes_data} liked_recipes={liked_recipes_data}/>
                    <div className="fixed bottom-8 z-[9999] right-8">
                        <Link className="relative" href={`/user/settings/${userDetails.user_id}`}>
                            <img loading="lazy" src={'/Setting/settingpaw.webp'} className="h-[auto] w-[100px] md:w-[140px]  max-w-none" width={100} height={100}  alt="website banner" />
                            <span className="absolute bottom-4 md:bottom-6 text-[13px] md:text-xl text-white right-10 md:right-12">設定</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Suspense>
    )
}