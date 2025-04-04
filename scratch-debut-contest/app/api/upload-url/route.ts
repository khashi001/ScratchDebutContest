import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { fileType, fileExt } = await request.json()
    console.log('Received fileType:', fileType) //to avoid build error 

    // ファイル名はランダムに生成
    const fileName = `${Math.random()}.${fileExt}`
    
    // 署名付きURLを生成
    const { data, error } = await supabase.storage
      .from('scratch-files')
      .createSignedUploadUrl(fileName)
    
    if (error) {
      console.error('Error creating signed URL:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ 
      signedUrl: data.signedUrl,
      path: data.path,
      fileName
    })
  } catch (err) {
    console.error('Error in upload-url API:', err)
    return NextResponse.json({ error: 'ファイルアップロード準備中にエラーが発生しました' }, { status: 500 })
  }
}