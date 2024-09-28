import { cookies } from "next/headers"
import { decrypt, getDecryptedSession } from "./lib";
import { ERR_MSG } from "@/constants/constants";
import { db } from "@/lib/database/db";
import { deleteFilesinFolder, getFile, uploadFile } from "./file-lib";

export const updateProfilePic = async (file: File, folder: string) => {
    
    try {
        const docCookies = cookies();
        const session = docCookies.get('session');

        if(!session) throw new Error(ERR_MSG['ERR10']);

        const decryptedCookies = await decrypt(session.value);
        const user_id = decryptedCookies.user.user_id;

        await deleteFilesinFolder(folder);
        const uploadedProfilePicUrl = await uploadFile(file, folder);

        await db.updateTable("user_details_table")
        .set({ user_image: uploadedProfilePicUrl })
        .where("user_details_table.user_id", "=", user_id)
        .executeTakeFirst()

    } catch(e) {
        let _e = (e as Error).message;
        throw _e;
    }
    
}

export const getUserProfilePic = async (user_id: number) => {

    try{
        if(!user_id) throw new Error(ERR_MSG['ERR3']);

        const user_image = await db.selectFrom("user_details_table as user_details")
                .select(['user_details.user_image'])
                .where('user_details.user_id','=', user_id)
                .executeTakeFirst();

        return user_image;
    } catch (e) {
        let _e = (e as Error).message;
        throw _e;
    }
}

export const uploadRecipeFiles = async (files: Array<File>, recipe_id: number, folder:string) => {
    try {
        const docCookies = cookies();
        const session = docCookies.get('session');

        if(!session) throw new Error(ERR_MSG['ERR10']);

        for(let i = 0; i < files.length; i++) {
            if(files[i] instanceof File) {
                const uploadedRecipe = await uploadFile(files[i], folder);
                
                await db.insertInto("recipe_images_table")
                    .values({ 
                        recipe_id: recipe_id,
                        recipe_image: uploadedRecipe,
                        recipe_image_subtext: '',
                        recipe_image_title: '',
                        updated_at: new Date(),
                        created_at: new Date() 
                    })
                    .execute()
            }
        }

        return true;
    } catch(e) {
        let _e = (e as Error).message;
        throw _e;
    }
}