# Project COVID-19
-----------

[https://covid-19-infection-dashboard.herokuapp.com/](https://covid-19-infection-dashboard.herokuapp.com/)

Explore the data click [Dashboard](https://covid-19-infection-dashboard.herokuapp.com/) to view charts.
![dashboard](./image/dashboard.png)

## Project Topic:
The topic of this project is COVID-19 pandemic using updated pandemic data from CDC, click 
[CDC](https://data.cdc.gov/Case-Surveillance/United-States-COVID-19-Cases-and-Deaths-by-State-o/9mfq-cb36) to view raw data. Click [CDC-VAC](https://data.cdc.gov/Vaccinations/COVID-19-Vaccinations-in-the-United-States-Jurisdi/unsk-b7fc) to view vaccination data.

## Introduction:
COVID-19 is a new virus and as such there is not enough data to do an in depth analysis. However as the virus continues 
to spread at an alarming rate throughout the United States and the world, we can study the collected infection data and
look for any trends and patterns about the rates of infection, death and recovery. And compare States numbers to figure out who is doing well
and who is failing.

## Analysis
We built an interactive dashboard for all US States and territories. It shows monthly average numbers
of cases, average death and death percentage, average recovery and recovery percentage. We built horizontal
bar chart to show average cases and death numbers. Line chart to show State curves with average cases
numbers and death percent and a gauge chart for recovery percent. All stats are average numbers per month
from start of pandemic.

We also built two maps:
1- Infection map, showing total cases, death and recovery counts for the USA. You can hover over any State
and see all stats for it.
![Infection Map](./image/infection_map.png)

2- Vaccine map, showing vaccine distribution and percentage of distribution per 100k of population, doses administered and
percentage of population vaccinated per 100k. 
![Infection Map](./image/vaccine_map.png)

## Conclusion
**Our analysis shows that:**

Death rate is going down despite increased new cases of infection. This could be attributed 
to medical professionals getting used to the virus and may be developing new protocols on how to treat COVID-19 patients 
and the effectiveness of different medications and medical procedures currently in use.

All States failed to level the infection curve despite all measures taken. Even States with mandated shutdown and strict 
mask and social distancing procedures failed to level their curve. We may need to develope new procedures to deal with this 
virus and any similar future viral infections.

