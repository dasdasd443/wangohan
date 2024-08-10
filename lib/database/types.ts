import { Generated } from "kysely";

export interface Database {
  users_table: UserTable;
  user_details_table: UserDetailTable;
  pets_table: PetsTable;
  allergies_table: AllergiesTable;
  recipes_table: RecipesTable;
  recipe_comments_table: RecipeCommentsTable;
  recipe_images_table: RecipeImagesTable;
  recipe_ingredients_table: RecipeIngredientsTable;
  recipe_instructions_table: RecipeInstructionsTable;
  favourites_table: FavouritesTable;
  likes_table: LikesTable;
}

export interface UserTable {
  user_id: Generated<number>;
  username: string;
  email: string;
  password:string;
  user_lvl: number;
  user_agreement: number;
  updated_at: Date;
  created_at: Date;
}

export interface UserDetailTable {
  user_detail_id: Generated<number>;
  user_first_name: string;
  user_last_name: string;
  user_codename: string;
  user_gender: string;
  user_birthdate: string;
  user_address: string;
  user_id: number;
  user_occupation: string;
  user_image: string;
  updated_at: Date;
  created_at: Date;
}

export interface PetsTable {
  pet_id: Generated<number>;
  pet_name: string;
  pet_birthdate: Date;
  pet_breed: string;
  pet_image: string;
  user_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface AllergiesTable {
  allergy_id: Generated<number>;
  allergy_name: string;
  allergy_ingredient: string;
  pet_id: number;
  updated_at: Date;
  created_at: Date;
}

export interface RecipesTable {
  recipe_id: Generated<number>;
  recipe_name: string;
  recipe_event: string;
  recipe_category: string;
  total_likes: number;
  total_favourites: number;
}

export interface RecipeCommentsTable {
  recipe_comment_id: Generated<number>;
  recipe_comment_title: string;
  recipe_comment_subtext: string;
  recipe_comment_rating: number;
  user_id: number;
  recipe_id: number;
}

export interface RecipeImagesTable {
  recipe_image_id: Generated<number>;
  recipe_image_title: string;
  recipe_image_subtext: string;
  recipe_image: string;
  recipe_id: number;
}

export interface RecipeInstructionsTable {
  recipe_instructions_id: Generated<number>;
  recipe_instructions_text: string;
  recipe_id: number;
}

export interface RecipeIngredientsTable {
  recipe_ingredients_id: Generated<number>;
  recipe_ingredients_text: string;
  recipe_id: number;
}

export interface FavouritesTable {
  favourite_id: Generated<number>;
  user_id: number;
  recipe_id: number;
}

export interface LikesTable {
  likes_id: Generated<number>;
  user_id: number;
  recipe_id: number;
}