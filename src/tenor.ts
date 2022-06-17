import dotenv from "dotenv";

dotenv.config();

interface Gif {
  url: string;
}
interface MediaFormat {
  gif: Gif;
}
interface TenorResponse {
  results: [
    {
      media_formats: MediaFormat;
    }
  ];
}

if (process.env.TENOR_TOKEN === undefined) {
  throw new Error("Tenor token missing");
}

const getGifs = async (keyword: string): Promise<Array<string>> => {
  const gifs: Array<string> = [];

  const tenorToken = process.env.TENOR_TOKEN;

  const tenorResponse: TenorResponse = await (
    await fetch(
      `https://tenor.googleapis.com/v2/search?q=${keyword}&key=${tenorToken}&limit=50`
    )
  ).json();

  tenorResponse.results.forEach((result) => {
    gifs.push(result.media_formats.gif.url);
  });

  return gifs;
};

export default getGifs;
