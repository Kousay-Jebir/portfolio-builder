import LZUTF8 from "lzutf8";
import { savePortfolio } from "@/api/builder/build";
export function compressPortfolio(content) {
    return LZUTF8.encodeBase64(LZUTF8.compress(content));
}

export function decompressPortfolio(content) {
    return LZUTF8.decompress(LZUTF8.decodeBase64(content))
}

export async function save(content) {
    await savePortfolio({ code: 'test-code', content: content })
}