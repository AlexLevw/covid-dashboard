export default class Requests {
  requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  async request(url) {
    const response = await fetch(url, this.requestOptions);

    if (!response.ok) {
      throw new Error(
        `Could not fetch Data Voice ${url}, received ${response.status}`,
      );
    }
    const result = await response.json();

    return result;
  }

  async getCountryTotal() {
    const result = await this.request(
      `https://api.covid19api.com/total/country/south-africa/status/confirmed`,
    );

    return result;
  }

  async getSummary() {
    const result = await this.request(
      `https://api.covid19api.com/summary`,
    );

    return result;
  }
}
