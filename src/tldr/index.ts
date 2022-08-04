import axios from "axios";

export class Tldr {
  private baseUrl =
    "https://raw.githubusercontent.com/tldr-pages/tldr/main/pages";

  private platforms = ["linux", "common", "windows", "osx", "sunos", "android"];

  async get(command: string): Promise<
    {
      data: string;
      platform: string;
      command: string;
    }[]
  > {
    const results = await Promise.all(
      this.platforms.map((platform) => this._request(platform, command))
    );
    return results.filter(Boolean);
  }

  async _request(
    platform: string,
    command: string
  ): Promise<{ data: string; platform: string; command: string } | null> {
    try {
      const result = await axios.get(
        `${this.baseUrl}/${platform}/${command}.md`,
        {
          headers: {
            "User-Agent": "CSMM Support bot",
          },
        }
      );
      return { data: result.data, platform, command };
    } catch (error) {
      if (error.response.status === 404) {
        return null;
      }

      throw error;
    }
  }
}

export const tldr = new Tldr();
