import React from "react";
import { Typography, Grid, Paper, Divider } from "@material-ui/core";

import Countup from "react-countup";
import cx from "classnames";

import styles from "./CardsKorea.module.css";

const InfoKorea = ({
  data: {
    todayKoreaConfirmed,
    todayKoreaDeaths,
    dailyKoreaConfirmed,
    dailyKoreaDeaths,
    todayKoreaRecovered,
    lastUpdateKorea,
  },
}) => {
  if (!todayKoreaConfirmed) {
    return "Loading...";
  }

  return (
    <Paper className={cx(styles.koreaCardMain)} padding={3}>
      <Typography
        variant="h6"
        color="textSecondary"
        style={{ marginBottom: "15px" }}
      >
        대한민국 COVID-19 현황 (
        {new Date(lastUpdateKorea).toTimeString().split(" ")[0]} 기준)
      </Typography>
      <Divider />
      <Grid container spacing={3} justify="space-around">
        <Grid item>
          <Typography variant="h6">
            확진자:{" "}
            <span>
              <Countup
                start={0}
                end={todayKoreaConfirmed}
                duration={1.5}
                separator=","
              />
            </span>
            <span style={{ marginLeft: "5px", color: "tomato" }}>
              (+
              <Countup
                start={0}
                end={dailyKoreaConfirmed}
                duration={1.5}
                separator=","
              />
              )
            </span>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            사망자:{" "}
            <span>
              <Countup
                start={0}
                end={todayKoreaDeaths}
                duration={1.5}
                separator=","
              />
            </span>
            <span style={{ marginLeft: "5px", color: "tomato" }}>
              (+
              <Countup
                start={0}
                end={dailyKoreaDeaths}
                duration={1.5}
                separator=","
              />
              )
            </span>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            완치자:{" "}
            <span>
              <Countup
                start={0}
                end={todayKoreaRecovered}
                duration={1.5}
                separator=","
              />
            </span>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InfoKorea;
