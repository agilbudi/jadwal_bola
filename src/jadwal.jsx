import { useState, useMemo } from "react";

const matches = [
  // PEKAN 1: 11–17 Jun
  { id: 1,  date: "Kamis, 11 Jun",   wib: "02:00",   grup: "A", home: 28,              away: 1,      venue: 1,         stage: 1,       week: 1 },
  { id: 2,  date: "Kamis, 11 Jun",   wib: "09:00",   grup: "A", home: 24,         away: 12,                venue: 2,              stage: 1,       week: 1 },
  { id: 3,  date: "Jumat, 12 Jun",   wib: "02:00",   grup: "B", home: 22,                away: 10,venue: 3,                  stage: 1,       week: 1 },
  { id: 4,  date: "Jumat, 12 Jun",   wib: "08:00",   grup: "D", home: 3,       away: 32,            venue: 4,           stage: 1,       week: 1 },
  { id: 5,  date: "Sabtu, 13 Jun",   wib: "02:00",   grup: "B", home: 35,                 away: 42,               venue: 5,         stage: 1,       week: 1 },
  { id: 6,  date: "Sabtu, 13 Jun",   wib: "05:00",   grup: "C", home: 11,                away: 26,              venue: 6,         stage: 1,       week: 1 },
  { id: 7,  date: "Sabtu, 13 Jun",   wib: "08:00",   grup: "C", home: 16,                 away: 38,          venue: 7,     stage: 1,       week: 1 },
  { id: 8,  date: "Minggu, 14 Jun",  wib: "23:00*",  grup: "D", home: 6,             away: 44,             venue: 8,                 stage: 1,       week: 1 },
  { id: 9,  date: "Minggu, 14 Jun",  wib: "00:00",   grup: "E", home: 21,                away: 13,             venue: 9,                stage: 1,       week: 1 },
  { id: 10, date: "Minggu, 14 Jun",  wib: "03:00",   grup: "F", home: 9,               away: 20,              venue: 10,             stage: 1,       week: 1 },
  { id: 11, date: "Minggu, 14 Jun",  wib: "06:00",   grup: "E", home: 30,         away: 14,             venue: 11,     stage: 1,       week: 1 },
  { id: 12, date: "Minggu, 14 Jun",  wib: "09:00",   grup: "F", home: 41,                away: 43,             venue: 12,             stage: 1,       week: 1 },
  { id: 13, date: "Senin, 15 Jun",   wib: "23:00*",  grup: "H", home: 40,               away: 45,       venue: 13,      stage: 1,       week: 1 },
  { id: 14, date: "Senin, 15 Jun",   wib: "02:00",   grup: "G", home: 8,                away: 27,               venue: 14,                stage: 1,       week: 1 },
  { id: 15, date: "Senin, 15 Jun",   wib: "05:00",   grup: "H", home: 4,            away: 46,             venue: 15,            stage: 1,       week: 1 },
  { id: 16, date: "Senin, 15 Jun",   wib: "08:00",   grup: "G", home: 18,                  away: 39,       venue: 4,           stage: 1,       week: 1 },
  { id: 17, date: "Selasa, 16 Jun",  wib: "02:00",   grup: "I", home: 33,               away: 37,             venue: 6,         stage: 1,       week: 1 },
  { id: 18, date: "Selasa, 16 Jun",  wib: "05:00",   grup: "I", home: 19,                  away: 29,            venue: 7,     stage: 1,       week: 1 },
  { id: 19, date: "Selasa, 16 Jun",  wib: "08:00",   grup: "J", home: 5,             away: 2,            venue: 16,      stage: 1,       week: 1 },
  { id: 20, date: "Rabu, 17 Jun",    wib: "11:00",   grup: "J", home: 7,               away: 48,            venue: 5,         stage: 1,       week: 1 },
  { id: 21, date: "Rabu, 17 Jun",    wib: "00:00",   grup: "K", home: 34,              away: 36,            venue: 9,                stage: 1,       week: 1 },
  { id: 22, date: "Rabu, 17 Jun",    wib: "03:00",   grup: "L", home: 17,               away: 25,             venue: 10,             stage: 1,       week: 1 },
  { id: 23, date: "Rabu, 17 Jun",    wib: "06:00",   grup: "L", home: 15,                 away: 31,              venue: 3,                  stage: 1,       week: 1 },
  { id: 24, date: "Rabu, 17 Jun",    wib: "09:00",   grup: "K", home: 47,            away: 23,            venue: 1,         stage: 1,       week: 1 },

  // PEKAN 2: 18–24 Jun
  { id: 25, date: "Kamis, 18 Jun",   wib: "23:00*",  grup: "A", home: 12,                  away: 1,      venue: 13,      stage: 1,       week: 2 },
  { id: 26, date: "Kamis, 18 Jun",   wib: "02:00",   grup: "B", home: 42,                 away: 10,venue: 4,           stage: 1,       week: 2 },
  { id: 27, date: "Kamis, 18 Jun",   wib: "05:00",   grup: "B", home: 22,                away: 35,               venue: 8,                 stage: 1,       week: 2 },
  { id: 28, date: "Kamis, 18 Jun",   wib: "08:00",   grup: "A", home: 28,               away: 24,       venue: 2,              stage: 1,       week: 2 },
  { id: 29, date: "Jumat, 19 Jun",   wib: "02:00",   grup: "D", home: 3,       away: 6,           venue: 14,                stage: 1,       week: 2 },
  { id: 30, date: "Jumat, 19 Jun",   wib: "05:00",   grup: "C", home: 38,            away: 26,              venue: 7,     stage: 1,       week: 2 },
  { id: 31, date: "Jumat, 19 Jun",   wib: "07:30",   grup: "C", home: 11,                away: 16,               venue: 11,     stage: 1,       week: 2 },
  { id: 32, date: "Jumat, 19 Jun",   wib: "10:00",   grup: "D", home: 44,               away: 32,            venue: 5,         stage: 1,       week: 2 },
  { id: 33, date: "Sabtu, 20 Jun",   wib: "00:00",   grup: "F", home: 9,               away: 41,              venue: 9,                stage: 1,       week: 2 },
  { id: 34, date: "Sabtu, 20 Jun",   wib: "03:00",   grup: "E", home: 21,                away: 30,       venue: 3,                  stage: 1,       week: 2 },
  { id: 35, date: "Sabtu, 20 Jun",   wib: "07:00",   grup: "E", home: 14,               away: 13,             venue: 16,      stage: 1,       week: 2 },
  { id: 36, date: "Minggu, 21 Jun",  wib: "11:00",   grup: "F", home: 43,               away: 20,              venue: 12,             stage: 1,       week: 2 },
  { id: 37, date: "Minggu, 21 Jun",  wib: "23:00*",  grup: "H", home: 40,               away: 4,          venue: 13,      stage: 1,       week: 2 },
  { id: 38, date: "Minggu, 21 Jun",  wib: "02:00",   grup: "G", home: 8,                away: 18,                venue: 4,           stage: 1,       week: 2 },
  { id: 39, date: "Minggu, 21 Jun",  wib: "05:00",   grup: "H", home: 46,               away: 45,       venue: 15,            stage: 1,       week: 2 },
  { id: 40, date: "Minggu, 21 Jun",  wib: "08:00",   grup: "G", home: 39,         away: 27,               venue: 8,                 stage: 1,       week: 2 },
  { id: 41, date: "Senin, 22 Jun",   wib: "00:00",   grup: "J", home: 5,             away: 7,             venue: 10,             stage: 1,       week: 2 },
  { id: 42, date: "Senin, 22 Jun",   wib: "04:00",   grup: "I", home: 33,               away: 19,                venue: 11,     stage: 1,       week: 2 },
  { id: 43, date: "Senin, 22 Jun",   wib: "07:00",   grup: "I", home: 29,              away: 37,             venue: 6,         stage: 1,       week: 2 },
  { id: 44, date: "Senin, 22 Jun",   wib: "10:00",   grup: "J", home: 48,              away: 2,            venue: 5,         stage: 1,       week: 2 },
  { id: 45, date: "Selasa, 23 Jun",  wib: "00:00",   grup: "K", home: 34,              away: 47,          venue: 9,                stage: 1,       week: 2 },
  { id: 46, date: "Selasa, 23 Jun",  wib: "03:00",   grup: "L", home: 17,               away: 15,               venue: 7,     stage: 1,       week: 2 },
  { id: 47, date: "Selasa, 23 Jun",  wib: "06:00",   grup: "L", home: 31,                away: 25,             venue: 3,                  stage: 1,       week: 2 },
  { id: 48, date: "Selasa, 23 Jun",  wib: "09:00",   grup: "K", home: 23,              away: 36,            venue: 2,              stage: 1,       week: 2 },
  { id: 49, date: "Rabu, 24 Jun",    wib: "02:00",   grup: "B", home: 42,                 away: 22,              venue: 8,                 stage: 1,       week: 2 },
  { id: 50, date: "Rabu, 24 Jun",    wib: "02:00",   grup: "B", home: 10,  away: 35,               venue: 14,                stage: 1,       week: 2 },
  { id: 51, date: "Rabu, 24 Jun",    wib: "05:00",   grup: "C", home: 38,            away: 11,              venue: 15,            stage: 1,       week: 2 },
  { id: 52, date: "Rabu, 24 Jun",    wib: "05:00",   grup: "C", home: 26,                away: 16,               venue: 13,      stage: 1,       week: 2 },
  { id: 53, date: "Rabu, 24 Jun",    wib: "08:00",   grup: "A", home: 12,                  away: 28,             venue: 1,         stage: 1,       week: 2 },
  { id: 54, date: "Rabu, 24 Jun",    wib: "08:00",   grup: "A", home: 1,        away: 24,       venue: 12,             stage: 1,       week: 2 },

  // PEKAN 3: 25 Jun – 1 Jul
  { id: 55, date: "Kamis, 25 Jun",   wib: "03:00",   grup: "E", home: 13,               away: 30,       venue: 11,     stage: 1,       week: 3 },
  { id: 56, date: "Kamis, 25 Jun",   wib: "03:00",   grup: "E", home: 14,               away: 21,              venue: 6,         stage: 1,       week: 3 },
  { id: 57, date: "Kamis, 25 Jun",   wib: "06:00",   grup: "F", home: 20,                away: 41,              venue: 10,             stage: 1,       week: 3 },
  { id: 58, date: "Kamis, 25 Jun",   wib: "06:00",   grup: "F", home: 43,               away: 9,             venue: 16,      stage: 1,       week: 3 },
  { id: 59, date: "Kamis, 25 Jun",   wib: "09:00",   grup: "D", home: 44,               away: 3,     venue: 4,           stage: 1,       week: 3 },
  { id: 60, date: "Kamis, 25 Jun",   wib: "09:00",   grup: "D", home: 32,              away: 6,           venue: 5,         stage: 1,       week: 3 },
  { id: 61, date: "Jumat, 26 Jun",   wib: "02:00",   grup: "I", home: 29,              away: 33,             venue: 7,     stage: 1,       week: 3 },
  { id: 62, date: "Jumat, 26 Jun",   wib: "02:00",   grup: "I", home: 37,               away: 19,                venue: 3,                  stage: 1,       week: 3 },
  { id: 63, date: "Jumat, 26 Jun",   wib: "07:00",   grup: "H", home: 45,         away: 4,          venue: 9,                stage: 1,       week: 3 },
  { id: 64, date: "Jumat, 26 Jun",   wib: "07:00",   grup: "H", home: 46,               away: 40,             venue: 2,              stage: 1,       week: 3 },
  { id: 65, date: "Jumat, 26 Jun",   wib: "10:00",   grup: "G", home: 27,                 away: 18,                venue: 14,                stage: 1,       week: 3 },
  { id: 66, date: "Jumat, 26 Jun",   wib: "10:00",   grup: "G", home: 39,         away: 8,              venue: 8,                 stage: 1,       week: 3 },
  { id: 67, date: "Sabtu, 27 Jun",   wib: "04:00",   grup: "L", home: 31,                away: 17,             venue: 6,         stage: 1,       week: 3 },
  { id: 68, date: "Sabtu, 27 Jun",   wib: "04:00",   grup: "L", home: 25,               away: 15,               venue: 11,     stage: 1,       week: 3 },
  { id: 69, date: "Sabtu, 27 Jun",   wib: "06:30",   grup: "K", home: 23,              away: 34,            venue: 15,            stage: 1,       week: 3 },
  { id: 70, date: "Sabtu, 27 Jun",   wib: "06:30",   grup: "K", home: 36,              away: 47,          venue: 13,      stage: 1,       week: 3 },
  { id: 71, date: "Sabtu, 27 Jun",   wib: "09:00",   grup: "J", home: 2,              away: 7,             venue: 16,      stage: 1,       week: 3 },
  { id: 72, date: "Sabtu, 27 Jun",   wib: "09:00",   grup: "J", home: 48,              away: 5,           venue: 10,             stage: 1,       week: 3 },
  { id: 73, date: "Minggu, 28 Jun",  wib: "02:00",   grup: "-", home: "Runner-up A",           away: "Runner-up B",         venue: 4,           stage: 2,  week: 3 },
  { id: 74, date: "Senin, 29 Jun",   wib: "00:00",   grup: "-", home: "Juara C",               away: "Runner-up F",         venue: 9,                stage: 2,  week: 3 },
  { id: 75, date: "Senin, 29 Jun",   wib: "03:30",   grup: "-", home: "Juara E",               away: "3rd Terbaik",         venue: 7,     stage: 2,  week: 3 },
  { id: 76, date: "Senin, 29 Jun",   wib: "08:00",   grup: "-", home: "Juara F",               away: "Runner-up C",         venue: 12,             stage: 2,  week: 3 },
  { id: 77, date: "Selasa, 30 Jun",  wib: "00:00",   grup: "-", home: "Runner-up E",           away: "Runner-up I",         venue: 10,             stage: 2,  week: 3 },
  { id: 78, date: "Selasa, 30 Jun",  wib: "04:00",   grup: "-", home: "Juara I",               away: "3rd Terbaik",         venue: 6,         stage: 2,  week: 3 },
  { id: 79, date: "Selasa, 30 Jun",  wib: "08:00",   grup: "-", home: "Juara A",               away: "3rd Terbaik",         venue: 1,         stage: 2,  week: 3 },
  { id: 80, date: "Rabu, 1 Jul",     wib: "23:00*",  grup: "-", home: "Juara L",               away: "3rd Terbaik",         venue: 13,      stage: 2,  week: 3 },

  // PEKAN 4: 2–8 Jul
  { id: 81, date: "Rabu, 1 Jul",     wib: "03:00",   grup: "-", home: "Juara G",               away: "3rd Terbaik",         venue: 14,                stage: 2,  week: 4 },
  { id: 82, date: "Rabu, 1 Jul",     wib: "07:00",   grup: "-", home: "Juara D",               away: "3rd Terbaik",         venue: 5,         stage: 2,  week: 4 },
  { id: 83, date: "Kamis, 2 Jul",    wib: "02:00",   grup: "-", home: "Juara H",               away: "Runner-up J",         venue: 4,           stage: 2,  week: 4 },
  { id: 84, date: "Kamis, 2 Jul",    wib: "06:00",   grup: "-", home: "Runner-up K",           away: "Runner-up L",         venue: 3,                  stage: 2,  week: 4 },
  { id: 85, date: "Kamis, 2 Jul",    wib: "10:00",   grup: "-", home: "Juara B",               away: "3rd Terbaik",         venue: 8,                 stage: 2,  week: 4 },
  { id: 86, date: "Jumat, 3 Jul",    wib: "01:00",   grup: "-", home: "Runner-up D",           away: "Runner-up G",         venue: 10,             stage: 2,  week: 4 },
  { id: 87, date: "Jumat, 3 Jul",    wib: "05:00",   grup: "-", home: "Juara J",               away: "Runner-up H",         venue: 15,            stage: 2,  week: 4 },
  { id: 88, date: "Jumat, 3 Jul",    wib: "08:30",   grup: "-", home: "Juara K",               away: "3rd Terbaik",         venue: 16,      stage: 2,  week: 4 },
  { id: 89, date: "Sabtu, 4 Jul",    wib: "00:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 9,                stage: 3,  week: 4 },
  { id: 90, date: "Sabtu, 4 Jul",    wib: "04:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 11,     stage: 3,  week: 4 },
  { id: 91, date: "Minggu, 5 Jul",   wib: "03:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 6,         stage: 3,  week: 4 },
  { id: 92, date: "Minggu, 5 Jul",   wib: "07:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 1,         stage: 3,  week: 4 },
  { id: 93, date: "Senin, 6 Jul",    wib: "02:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 10,             stage: 3,  week: 4 },
  { id: 94, date: "Senin, 6 Jul",    wib: "07:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 14,                stage: 3,  week: 4 },
  { id: 95, date: "Selasa, 7 Jul",   wib: "23:00*",  grup: "-", home: "TBD",                   away: "TBD",                 venue: 13,      stage: 3,  week: 4 },
  { id: 96, date: "Selasa, 7 Jul",   wib: "03:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 8,                 stage: 3,  week: 4 },

  // PEKAN 5: 9–15 Jul
  { id: 97,  date: "Kamis, 9 Jul",   wib: "03:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 7,     stage: 4,  week: 5 },
  { id: 98,  date: "Jumat, 10 Jul",  wib: "02:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 4,           stage: 4,  week: 5 },
  { id: 99,  date: "Sabtu, 11 Jul",  wib: "04:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 15,            stage: 4,  week: 5 },
  { id: 100, date: "Sabtu, 11 Jul",  wib: "08:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 16,      stage: 4,  week: 5 },
  { id: 101, date: "Selasa, 14 Jul", wib: "02:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 10,             stage: 5,       week: 5 },
  { id: 102, date: "Rabu, 15 Jul",   wib: "02:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 13,      stage: 5,       week: 5 },

  // PEKAN 6: 16–20 Jul
  { id: 103, date: "Sabtu, 18 Jul",  wib: "04:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 15,            stage: 6,   week: 6 },
  { id: 104, date: "Minggu, 19 Jul", wib: "02:00",   grup: "-", home: "TBD",                   away: "TBD",                 venue: 6,         stage: 7,        week: 6 },
];

const venues = [
  { id: 1, name: "Estadio Azteca, Mexico City" },
  { id: 2, name: "Estadio Akron, Zapopan" },
  { id: 3, name: "BMO Field, Toronto" },
  { id: 4, name: "SoFi Stadium, Los Angeles" },
  { id: 5, name: "Levi's Stadium, Santa Clara" },
  { id: 6, name: "MetLife Stadium, New Jersey" },
  { id: 7, name: "Gillette Stadium, Massachusetts" },
  { id: 8, name: "BC Place, Vancouver" },
  { id: 9, name: "NRG Stadium, Houston" },
  { id: 10, name: "AT&T Stadium, Arlington" },
  { id: 11, name: "Lincoln Financial, Philadelphia" },
  { id: 12, name: "Estadio BBVA, Monterrey" },
  { id: 13, name: "Mercedes-Benz Stadium, Atlanta" },
  { id: 14, name: "Lumen Field, Seattle" },
  { id: 15, name: "Hard Rock Stadium, Miami" },
  { id: 16, name: "Arrowhead Stadium, Kansas City" },
];

const stages = [
  { id: 0, name: "Semua" },
  { id: 1, name: "Fase Grup" },
  { id: 2, name: "Babak 32 Besar" },
  { id: 3, name: "Babak 16 Besar" },
  { id: 4, name: "Perempat Final" },
  { id: 5, name: "Semifinal" },
  { id: 6, name: "Perebutan 3rd" },
  { id: 7, name: "Final 🏆" },
];

const groups = ["Semua", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

var countries = [
  { id: 1, name: "Afrika Selatan", stage: 1 },
  { id: 2, name: "Aljazair", stage: 1 },
  { id: 3, name: "Amerika Serikat", stage: 1 },
  { id: 4, name: "Arab Saudi", stage: 1 },
  { id: 5, name: "Argentina", stage: 1 },
  { id: 6, name: "Australia", stage: 1 },
  { id: 7, name: "Austria", stage: 1 },
  { id: 8, name: "Belgia", stage: 1 },
  { id: 9, name: "Belanda", stage: 1 },
  { id: 10, name: "Bosnia & Herzegovina", stage: 1 },
  { id: 11, name: "Brasil", stage: 1 },
  { id: 12, name: "Ceko", stage: 1 },
  { id: 13, name: "Curaçao", stage: 1 },
  { id: 14, name: "Ekuador", stage: 1 },
  { id: 15, name: "Ghana", stage: 1 },
  { id: 16, name: "Haiti", stage: 1 },
  { id: 17, name: "Inggris", stage: 1 },
  { id: 18, name: "Iran", stage: 1 },
  { id: 19, name: "Irak", stage: 1 },
  { id: 20, name: "Jepang", stage: 1 },
  { id: 21, name: "Jerman", stage: 1 },
  { id: 22, name: "Kanada", stage: 1 },
  { id: 23, name: "Kolombia", stage: 1 },
  { id: 24, name: "Korea Selatan", stage: 1 },
  { id: 25, name: "Kroasia", stage: 1 },
  { id: 26, name: "Maroko", stage: 1 },
  { id: 27, name: "Mesir", stage: 1 },
  { id: 28, name: "Meksiko", stage: 1 },
  { id: 29, name: "Norwegia", stage: 1 },
  { id: 30, name: "Pantai Gading", stage: 1 },
  { id: 31, name: "Panama", stage: 1 },
  { id: 32, name: "Paraguay", stage: 1 },
  { id: 33, name: "Prancis", stage: 1 },
  { id: 34, name: "Portugal", stage: 1 },
  { id: 35, name: "Qatar", stage: 1 },
  { id: 36, name: "RD Kongo", stage: 1 },
  { id: 37, name: "Senegal", stage: 1 },
  { id: 38, name: "Skotlandia", stage: 1 },
  { id: 39, name: "Selandia Baru", stage: 1 },
  { id: 40, name: "Spanyol", stage: 1 },
  { id: 41, name: "Swedia", stage: 1 },
  { id: 42, name: "Swiss", stage: 1 },
  { id: 43, name: "Tunisia", stage: 1 },
  { id: 44, name: "Türkiye", stage: 1 },
  { id: 45, name: "Tanjung Verde", stage: 1 },
  { id: 46, name: "Uruguay", stage: 1 },
  { id: 47, name: "Uzbekistan", stage: 1 },
  { id: 48, name: "Yordania", stage: 1 },
];

const weekLabels = {
  0: "Semua Pekan",
  1: "Pekan 1 · 11–17 Jun",
  2: "Pekan 2 · 18–24 Jun",
  3: "Pekan 3 · 25 Jun–1 Jul",
  4: "Pekan 4 · 2–8 Jul",
  5: "Pekan 5 · 9–15 Jul",
  6: "Pekan 6 · 16–20 Jul",
};

const weekColors = {
  1: "#3b82f6",
  2: "#10b981",
  3: "#f59e0b",
  4: "#ef4444",
  5: "#8b5cf6",
  6: "#fbbf24",
};

const stageColors = {
  "Fase Grup":       { left: "#334155" },
  "Babak 32 Besar":  { left: "#3b82f6" },
  "Babak 16 Besar":  { left: "#8b5cf6" },
  "Perempat Final":  { left: "#f97316" },
  "Semifinal":       { left: "#ef4444" },
  "Perebutan 3rd":   { left: "#f59e0b" },
  "Final 🏆":        { left: "#fbbf24" },
};

export default function App() {
  const [weekFilter, setWeekFilter]   = useState(0);
  const [stageFilter, setStageFilter] = useState("Semua");
  const [groupFilter, setGroupFilter] = useState("Semua");
  const [search, setSearch]           = useState("");

  // Helper function to get country name by ID
  const getCountryName = (id) => {
    if (typeof id === "string") return id;
    const country = countries.find(c => c.id === id);
    return country ? country.name : String(id);
  };

  // Helper function to get stage name by ID
  const getStageName = (stageId) => {
    const stage = stages.find(s => s.id === stageId);
    return stage ? stage.name : String(stageId);
  };

  // Helper function to get venue name by ID
  const getVenueName = (id) => {
    if (typeof id === "string") return id;
    const venue = venues.find(v => v.id === id);
    return venue ? venue.name : String(id);
  };

  const filtered = useMemo(() => {
    return matches.filter(m => {
      const weekOk  = weekFilter === 0 || m.week === weekFilter;
      const stageOk = stageFilter === "Semua" || getStageName(m.stage) === stageFilter;
      const groupOk = groupFilter === "Semua" || m.grup === groupFilter;
      const q = search.toLowerCase();
      const homeName = getCountryName(m.home);
      const awayName = getCountryName(m.away);
      const venueName = getVenueName(m.venue);
      const searchOk = !q || homeName.toLowerCase().includes(q) || awayName.toLowerCase().includes(q) || venueName.toLowerCase().includes(q) || m.date.toLowerCase().includes(q);
      return weekOk && stageOk && groupOk && searchOk;
    });
  }, [weekFilter, stageFilter, groupFilter, search]);

  const weekCount = (w) => matches.filter(m => m.week === w).length;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", margin: 0, minHeight: "100vh", background: "#0a0e1a", color: "#e2e8f0" }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 40%, #0d2244 100%)", borderBottom: "1px solid #1e3a6e", padding: "28px 20px 20px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <span style={{ fontSize: 34 }}>⚽</span>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#60a5fa", textTransform: "uppercase" }}>FIFA</div>
              <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#f1f5f9", lineHeight: 1.1 }}>Piala Dunia 2026</h1>
            </div>
          </div>
          <p style={{ margin: "0 0 2px", color: "#94a3b8", fontSize: 12 }}>
            104 pertandingan · 48 tim · 12 grup · Amerika Serikat, Kanada & Meksiko
          </p>
          <p style={{ margin: 0, fontSize: 11, color: "#475569" }}>
            Semua waktu dalam <strong style={{ color: "#60a5fa" }}>WIB (UTC+7)</strong> · * = dini hari (hari sebelumnya di Amerika)
          </p>
        </div>
      </div>

      {/* === WEEKLY TABS === */}
      <div style={{ background: "#070c18", borderBottom: "2px solid #0f172a", overflowX: "auto" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", padding: "0 12px" }}>
          {[0, 1, 2, 3, 4, 5, 6].map(w => {
            const active = weekFilter === w;
            const col = weekColors[w] || "#3b82f6";
            return (
              <button key={w} onClick={() => setWeekFilter(w)}
                style={{
                  flexShrink: 0, padding: "12px 14px", border: "none", cursor: "pointer",
                  background: "transparent", fontSize: 12, fontWeight: active ? 800 : 500,
                  color: active ? col : "#475569",
                  borderBottom: active ? `3px solid ${col}` : "3px solid transparent",
                  transition: "all 0.15s", lineHeight: 1.3, textAlign: "center"
                }}>
                {w === 0 ? (
                  <span>Semua<br/><span style={{ fontSize: 10, opacity: 0.7 }}>104 laga</span></span>
                ) : (
                  <span>Pekan {w}<br/><span style={{ fontSize: 10, opacity: 0.7 }}>{weekCount(w)} laga</span></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active week banner */}
      {weekFilter !== 0 && (
        <div style={{ background: `linear-gradient(90deg, ${weekColors[weekFilter]}22 0%, transparent 100%)`, borderBottom: `1px solid ${weekColors[weekFilter]}33`, padding: "8px 20px" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: weekColors[weekFilter], display: "inline-block", flexShrink: 0 }}></span>
            <span style={{ fontSize: 13, fontWeight: 700, color: weekColors[weekFilter] }}>{weekLabels[weekFilter]}</span>
            <span style={{ fontSize: 12, color: "#475569" }}>— {filtered.length} pertandingan</span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ background: "#0f1628", borderBottom: "1px solid #1e293b", padding: "12px 20px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            placeholder="🔍  Cari tim, venue, tanggal..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "7px 12px", color: "#e2e8f0", fontSize: 13, width: "100%", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {stages.map(s => (
              <button key={s.id} onClick={() => setStageFilter(s.name)}
                style={{ padding: "3px 10px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600,
                  background: stageFilter === s.name ? "#3b82f6" : "#1e293b",
                  color: stageFilter === s.name ? "#fff" : "#94a3b8" }}>
                {s.name}
              </button>
            ))}
          </div>
          {(stageFilter === "Semua" || stageFilter === "Fase Grup") && (
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {groups.map(g => (
                <button key={g} onClick={() => setGroupFilter(g)}
                  style={{ padding: "3px 9px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700,
                    background: groupFilter === g ? "#ef4444" : "#1e293b",
                    color: groupFilter === g ? "#fff" : "#64748b" }}>
                  {g === "Semua" ? "Semua Grup" : `Grup ${g}`}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 12px 40px" }}>
        <p style={{ fontSize: 12, color: "#475569", marginBottom: 10 }}>{filtered.length} pertandingan ditampilkan</p>

        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #1e293b" }}>
          {/* Column header */}
          <div style={{ display: "grid", gridTemplateColumns: "38px 108px 66px 1fr 24px 1fr 140px", background: "#1e293b", padding: "9px 12px", fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            <div>#</div><div>Tanggal</div><div>WIB</div><div style={{textAlign:"right",paddingRight:6}}>Tuan Rumah</div><div></div><div>Tamu</div><div>Venue</div>
          </div>

          {filtered.length === 0 && (
            <div style={{ padding: "32px", textAlign: "center", color: "#475569", fontSize: 14 }}>
              Tidak ada pertandingan yang sesuai filter.
            </div>
          )}

          {filtered.map((m, i) => {
            const isSpecial = m.stage !== "Fase Grup";
            const leftColor = stageColors[m.stage]?.left || "#334155";
            const prevM = filtered[i - 1];
            const showStage = i === 0 || prevM?.stage !== m.stage;
            const showWeek  = weekFilter === 0 && (i === 0 || prevM?.week !== m.week);

            return (
              <div key={m.id}>
                {/* Weekly divider */}
                {showWeek && (
                  <div style={{ background: "#050a14", borderTop: i > 0 ? `3px solid ${weekColors[m.week]}44` : "none", padding: "10px 12px 4px", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 20, background: `${weekColors[m.week]}22`, border: `1px solid ${weekColors[m.week]}55` }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: weekColors[m.week], display: "inline-block" }}></span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: weekColors[m.week], letterSpacing: "0.05em" }}>
                        PEKAN {m.week}
                      </span>
                    </span>
                    <span style={{ fontSize: 11, color: "#334155" }}>{weekLabels[m.week]?.split("·")[1]?.trim()}</span>
                  </div>
                )}

                {/* Stage sub-header */}
                {showStage && (
                  <div style={{ background: "#0c1424", padding: "6px 12px", borderTop: i > 0 && !showWeek ? "1px solid #1e293b" : "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 3, height: 14, borderRadius: 2, background: leftColor, display: "inline-block" }}></span>
                    <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: isSpecial ? leftColor : "#60a5fa" }}>
                      {getStageName(m.stage)}
                    </span>
                  </div>
                )}

                {/* Match row */}
                <div style={{
                  display: "grid", gridTemplateColumns: "38px 108px 66px 1fr 24px 1fr 140px",
                  padding: "9px 12px", alignItems: "center",
                  background: i % 2 === 0 ? "#0d1526" : "#0a1020",
                  borderTop: "1px solid #0f172a",
                  borderLeft: `3px solid ${isSpecial ? leftColor : "transparent"}`,
                }}>
                  <div style={{ fontSize: 10, color: "#334155", fontWeight: 600 }}>{m.id}</div>
                  <div>
                    <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500, lineHeight: 1.2 }}>{m.date}</div>
                    {m.grup !== "-" && (
                      <span style={{ display: "inline-block", marginTop: 2, padding: "1px 5px", borderRadius: 4, fontSize: 9, fontWeight: 800, background: "#1e3a5f", color: "#93c5fd" }}>
                        GRP {m.grup}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: m.wib.includes("*") ? "#fbbf24" : "#38bdf8" }}>{m.wib}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", textAlign: "right", paddingRight: 6 }}>{getCountryName(m.home)}</div>
                  <div style={{ fontSize: 10, color: "#334155", textAlign: "center", fontWeight: 700 }}>vs</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0", paddingLeft: 0 }}>{getCountryName(m.away)}</div>
                  <div style={{ fontSize: 10, color: "#334155", lineHeight: 1.3 }}>{getVenueName(m.venue)}</div>
                </div>
              </div>
            );
          })}
        </div>

        <p style={{ marginTop: 14, fontSize: 10, color: "#1e293b", textAlign: "center" }}>
          * Jam bertanda bintang = dini hari WIB · Sumber: FIFA 2026
        </p>
      </div>
    </div>
  );
}
