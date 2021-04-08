import summeryData from "./summary.json";

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

export default class Requests {
  async request(url) {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(
        `Could not fetch Data Voice ${url}, received ${response.status}`
      );
    }

    const res = await response.json();
    return res;
  }

  getSummary() {
    let result = null;
    this.request("https://api.covid19api.com/summary")
      .then((data) => {
        result = data;
      })
      .catch((result = summeryData));
    return result;
  }

  async getPopulation() {
    const res = await this.request(
      "https://restcountries.eu/rest/v2/all?fields=alpha2Code;population"
    );
    return res;
  }
}
