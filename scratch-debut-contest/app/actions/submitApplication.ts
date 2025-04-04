"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

// 応募情報のみを保存するサーバーアクション
// ファイル自体はクライアント側で直接アップロード
export async function submitApplication(data: {
  name: string
  age: number
  email: string
  title: string
  description: string
  sb3FilePath: string
  movieFilePath: string
}) {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    const { name, age, email, title, description, sb3FilePath, movieFilePath } = data

    if (!name || !age || !email || !title || !description || !sb3FilePath || !movieFilePath) {
      throw new Error("必須フィールドが入力されていません。")
    }

    // データベースに登録
    const { error: insertError } = await supabase
      .from("applications")
      .insert([{ 
        name, 
        age, 
        email, 
        title, 
        description, 
        file_path: sb3FilePath, 
        movie_path: movieFilePath 
      }]);

    if (insertError) {
      console.error("Database insertion error:", insertError);
      throw new Error(`データベース挿入エラー: ${insertError.message}`);
    }

    revalidatePath("/applications");
    return { success: true };
  } catch (error) {
    console.error("Application submission error:", error);
    return { 
      success: false, 
      error: error instanceof Error 
        ? error.message 
        : "不明なエラーが発生しました。ファイルサイズを小さくするか、ネットワーク接続を確認してください。" 
    };
  }
}