import axios from "axios";

const url = "https://covid19.mathdro.id/api";
const urlDaily = "https://covid19.mathdro.id/api/daily";
const urlKorea = "https://covid19.mathdro.id/api/countries/KOR";
// const urlDailyKorea = "https://covid19.mathdro.id/api/daily/";

export const fetchData = async () => {
  let yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 2);
  const yesterdayUrlFormat =
    yesterday.getMonth() +
    1 +
    "-" +
    yesterday.getDate() +
    "-" +
    yesterday.getFullYear();

  const urlDailyKorea =
    "https://covid19.mathdro.id/api/daily/" + yesterdayUrlFormat;

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);

    const { data } = await axios.get(urlDaily);

    const {
      data: {
        confirmed: { value: todayKoreaConfirmed },
        deaths: { value: todayKoreaDeaths },
        recovered: { value: todayKoreaRecovered },
        lastUpdate: lastUpdateKorea,
      },
    } = await axios.get(urlKorea);

    const { data: yesterdayData } = await axios.get(urlDailyKorea);

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
