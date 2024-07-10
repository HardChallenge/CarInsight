# CarInsight

![Build Status](https://img.shields.io/badge/status-working-brightgreen) 
![Version](https://img.shields.io/badge/version-v1.0-blue)
[![GitHub contributors](https://img.shields.io/github/contributors/HardChallenge/CarInsight)](https://github.com/HardChallenge/CarInsight/graphs/contributors)
![Total Views](https://views.whatilearened.today/views/github/HardChallenge/CarInsight.svg)
[![GitHub issues](https://img.shields.io/github/issues/HardChallenge/CarInsight)](https://github.com/HardChallenge/CarInsight/issues)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/HardChallenge/CarInsight/blob/main/LICENSE)

**CarInsight** is a comprehensive platform for discovering detailed car information, leveraging advanced data integration and user-friendly interfaces to enhance automotive insights.

---

## Contents

- [Introduction](#introduction)
- [Functionalities](#functionalities)
- [Technologies](#technologies)
- [Setup Guide](#setup-guide)

---

## Introduction


**CarInsight** is a web application designed to provide comprehensive insights into automotive information. The platform features a robust backend built on Express and utilizes PostgreSQL for data storage, ensuring quick and efficient access to a wide range of vehicle details. 

The application stands out with its ability to query and display data from two external web services, thereby enhancing the accuracy and relevance of available information. Users benefit from an intuitive and user-friendly interface that facilitates detailed searches for technical specifications, ultimately aiding informed decision-making in vehicle purchase or maintenance.


--- 

## Functionalities

- **Dynamic News Feed**: Display latest news articles fetched from external APIs, allowing users to stay updated with real-time information.
- **Data Management**: Implement Create, Read, Update, and Delete operations for managing various entities in PostgreSQL, ensuring data integrity and flexibility.
- **Third-Party Data Integration**: Utilize external APIs to enrich the application with additional data sources.

---

## Technologies

- **Frontend**: Angular, CSS, HTML
- **Backend**: TypeScript, Express, JSON, RESTful API, PostgreSQL

---

## Setup Guide

1. Clone the repository:

```bash
git clone https://github.com/HardChallenge/ShopGuide.git
```

2. Change the directory:

```bash
cd ShopGuide
```

3. Start backend:
```bash
ts-node backend/index.ts
```

4. Start frontend on localhost:
```bash
cd frontend
ng serve
```


