import LZUTF8 from "lzutf8";
export function compressPortfolio(content) {
    LZUTF8.encodeBase64(LZUTF8.compress(content));
}

export function decompressPortfolio(content) {
    return LZUTF8.decompress(LZUTF8.decodeBase64(content))
}
