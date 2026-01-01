const greeting = () => {
    const TEXT_COLOR_STYLE = "background: linear-gradient(45deg, #301CBA, #DD2FEA); background-clip: text; -webkit-background-clip: text; -moz-background-clip: text; color: transparent;";

    console.log("初期化が完了しました。");

    console.log(`%c\
               =@@@+
             +@@@@@@@+
           *@@@@+-+@@@@*
  .@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.
 :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:
 -@@@@:                     :@@@@-
 -@@@@.                =@@*..@@@@-
 -@@@@.                *@@@=.@@@@-
 -@@@@.            *@@      .@@@@-
 -@@@@.    +@@%  .@@@@@+    .@@@@-
 -@@@@.  .@@@@@@@@@@@@@@@.  .@@@@-
 -@@@@. :@@@@@@@@@@@@@@@@@: .@@@@-
 -@@@@=                     =@@@@-
 :@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@:
   %@@@@@@@@@@@@@@@@@@@@@@@@@@@%\
`, `font-weight: bold; ${TEXT_COLOR_STYLE}`);
    console.log("%cAA作成ツール: https://www.luft.co.jp/cgi/image-to-aa.php", "font-size: 10px;")
    console.group("%cこんにちは！！", `font-weight: bold; font-size: 40px; ${TEXT_COLOR_STYLE}`);
    console.log("%cTeam Sevenの作品をご覧いただき\nありがとうございます！", "font-size: 15px");

    console.group("このサイトの技術スタックは");
    console.log(`\
フロントエンドフレームワーク: SvelteKit
CSSフレームワーク          : Tailwind CSS
キャンバス操作ライブラリ    : Fabric.js
AI/ML                     : Transformers.js
ホスティング               : Cloudflare Pages\
`);
    console.log("です。")
    console.groupEnd();

    console.log("ソースコードは\nhttps://photoeditor.moizlu.com/source-code\nにあります。");
    console.groupEnd();
};

export default greeting;