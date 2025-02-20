# Scratchチャレンジ！はじめの一歩コンテスト 特設サイトアプリ

このアプリは、Next.jsとSupabaseを使用して作成された、コンテストの応募と審査がパックになった特設サイトです。

## 使い方

1.  **コードのダウンロード:**
    * まず、このアプリのコードをご自身のパソコンにダウンロードします。
    * GitHubの緑色の「Code」ボタンをクリックし、表示されるURLをコピーしてください。
    * 次に、お使いのパソコンのコマンドラインツール（ターミナルやコマンドプロンプト）を開き、以下のコマンドを実行します。
        * `git clone [コピーしたURL]`
        * これにより、コード一式が「scratch-debut-contest」というフォルダにダウンロードされます。

2.  **必要な準備:**
    * ダウンロードしたフォルダに移動します。
        * `cd scratch-debut-contest`
    * 次に、アプリを動かすために必要なプログラムをインストールします。以下のコマンドを実行してください。
        * `npm install`
    * 追加で、Supabaseの認証機能を使うためのモジュールもインストールします。
        * `npm install @supabase/auth-helpers-nextjs`

3.  **.env.local ファイルの設定:**
    * アプリがSupabaseと通信するために、特別な設定ファイルを作成します。
    * 「.env.local」という名前のファイルを、scratch-debut-contestフォルダの中に作成してください。
    * 作成したファイルに、以下の内容を書き込みます。
        * `NEXT_PUBLIC_SUPABASE_URL=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
        * `NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
    * `xxxxxxxxxx...`の部分は、ご自身でSupabaseのアカウントを作成し、そこで発行される「URL」と「anonキー」に置き換えてください。
        * Supabaseのアカウント作成とキーの取得方法については、[Supabaseの公式サイト]([https://supabase.com/])をご覧ください。

4.  **アプリの起動:**
    * 準備が整いました。アプリを起動しましょう。以下のコマンドを実行してください。
        * `npm run dev`
    * コマンドを実行すると、ブラウザで開くためのURLが表示されます。
    * 表示されたURLをブラウザに入力し、「Scratchチャレンジ！はじめの一歩コンテスト」のページが表示されれば成功です！

## 注意事項

* このアプリを動かすには、Node.jsとnpmがインストールされている必要があります。
* Supabaseのアカウント作成と設定は、ご自身で行っていただく必要があります。

## GitHubリポジトリ

[GitHub - ScratchDebutContest](https://github.com/khashi001/ScratchDebutContest.git)