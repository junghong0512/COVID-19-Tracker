import axios from "axios";

const url = "https://covid19.mathdro.id/api";

const yesterdayFormat = () => {
  let yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 2);
  return (
    yesterday.getMonth() +
    1 +
    "-" +
    yesterday.getDate() +
    "-" +
    yesterday.getFullYear()
  );
};

export const fetchData = async () => {
  const yesterdayUrlFormat = yesterdayFormat();

  const urlDailyKorea = `${url}/daily/${yesterdayUrlFormat}`;

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);

    const { data } = await axios.get(`${url}/daily`);

    const { data: yesterdayData } = await axios.get(urlDailyKorea);

    const {
      data: {
        confirmed: { value: todayKoreaConfirmed },
        deaths: { value: todayKoreaDeaths },
        recovered: { value: todayKoreaRecovered },
        lastUpdate: lastUpdateKorea,
      },
    } = await axios.get(`${url}/countries/KOR`);

    const yesterdayKorea = yesterdayData.find(
      (item) => item.countryRegion === "Korea, South"
    );

    const lastData = data.pop();
    const dailyConfirmed = confirmed.value - lastData.confirmed.total;
    const dailyDeaths = deaths.value - lastData.deaths.total;

    const dailyKoreaConfirmed = todayKoreaConfirmed - yesterdayKorea.confirmed;
    const dailyKoreaDeaths = todayKoreaDeaths - yesterdayKorea.deaths;

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
      dailyConfirmed,
      dailyDeaths,
      todayKoreaConfirmed,
      todayKoreaDeaths,
      dailyKoreaConfirmed,
      dailyKoreaDeaths,
      todayKoreaRecovered,
      lastUpdateKorea,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    return countries.map((country) => {
      return countries.name;
    });
  } catch (error) {}
};
