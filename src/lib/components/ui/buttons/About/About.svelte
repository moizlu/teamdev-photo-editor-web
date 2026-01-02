<script lang="ts">
    import CloseIcon from "$lib/assets/icons/close.svelte";

    import SvgIcon from "../../SvgIcon/SvgIcon.svelte";

    import { dialog } from "../../Dialog";
</script>

<button onclick={() => dialog.deactivate()} title="閉じる" class="mx-3 fixed top-0 right-0 cursor-pointer">
    <SvgIcon Svg={CloseIcon} size={60} />
</button>

<div class="flex-col-center">
    <h1 class="text-3xl font-bold my-3">このアプリについて</h1>
    <table>
        <tbody>
            <tr>
                <th>アプリ名</th>
                <td>画像編集ツール</td>
            </tr>
            <tr>
                <th>チーム名</th>
                <td>Team Seven(G33)</td>
            </tr>
            <tr>
                <th>使用技術</th>
                <td>
                    SvelteKit<br>
                    Tailwind CSS<br>
                    Fabric.js<br>
                    Transformers.js<br>
                    Cloudflare Pages<br>
                </td>
            </tr>
            <tr>
                <th>ソースコード</th>
                <td><a href="https://photoeditor.moizlu.com/source-code" target="_blank" class="text-turn-on/50 underline">こちら</a></td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    @reference "../../../../../routes/layout.css";

    th {
        @apply after:content-[':'] after:mx-1;
        vertical-align: top;
        text-align: right;
    }
</style>
