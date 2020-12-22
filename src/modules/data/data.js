import summeryData from './summary.json';

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
    return await response.json();
  }

  getSummary() {
    let result = null;
    this.request(`https://api.covid19api.com/summary`)
    .then((data) => result = data)
    .catch(result = summeryData);
    return result;
  }

  async getPopulation() {
    return await this.request(`https://restcountries.eu/rest/v2/all?fields=alpha2Code;population`);
  }
}
