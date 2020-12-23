import { useEffect } from "react";

class DataCovid19 {
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

  async getData(url) {
    const result = await this.request(url);

    return result;
  }
}

const ApiDataCovid19 = new DataCovid19();
export default ApiDataCovid19;

// const getPalnet = (id) => {
//   return fetch(url)
//     .then()
//     .then((data) => data);
// };

//Hook принимающий асинхронную функцию и получающий из нее данные
//Учитывающий возможность отмены обработки данных(canseled)
// const useRequest = (request) => {
//   const [dateState, setDateState] = useState(null);

//   useEffect(() => {
//     let cancelled = false;

//     request().then(data => !cancelled && setDateState(data))
//     return () => cancelled = true;
//   }, [request]);
//   return dateState;
// }

// //функция оправляющая запрос
// const usePlanetInfo = (id) => {
//   const request = useCallback(() => getPlanet(id), [id]) ;
//   return useRequest(request);
// }

// const planetInfo = ({id}) => {
//   const data = usePlanetInfo(id);

//   return (
//     <div>{id} - {data && data.name}</div>
//   )
// }
