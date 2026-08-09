/* ===========================================================================
   PROJECT CATALOG
   ---------------------------------------------------------------------------
   This is the ONLY file you edit to add / change projects.
   Copy an existing block, change the fields, done.

   Fields:
     title    – project name shown on the card
     category – one of the CATEGORIES keys below (controls the filter tab)
     stack    – short list of tools (shown as little tags)
     blurb    – 1–3 sentences, plain language for a non-technical reader
     link     – page to open when the card is clicked. Use "" for "coming soon"
     status   – "" (normal) | "ongoing" | "soon"
     featured – true to also surface it on the home page
=========================================================================== */

const CATEGORIES = {
  "data-engineering": "Data Engineering",
  "bi":               "Business Intelligence",
  "ml":               "Machine Learning",
  "unsupervised":     "Segmentation & Clustering",
  "scraping":         "Web Scraping & Automation",
  "web":              "Web Development",
};

const PROJECTS = [

  /* ---- Data Engineering ------------------------------------------------ */
  {
    title: "EventsAir → BigQuery → HubSpot Pipeline",
    category: "data-engineering",
    stack: ["Python", "Google Cloud", "Cloud Run", "BigQuery", "GraphQL", "HubSpot"],
    blurb: "A production, event-driven pipeline that takes live event-registration data, lands it in a BigQuery warehouse, and keeps the HubSpot CRM in sync in real time — no manual exports, five decoupled cloud services, full data governance.",
    link: "project-eventsair.html",
    featured: true,
  },
  {
    title: "HubSpot → BigQuery Data Pipeline",
    category: "data-engineering",
    stack: ["Python", "Apache Airflow", "Cloud Composer", "BigQuery", "Cloud Workflows"],
    blurb: "Mirrors the entire HubSpot CRM — contacts, deals, companies, campaigns and email events — into a BigQuery warehouse on a schedule, running on ephemeral Airflow infrastructure that builds and destroys itself each cycle to keep cloud costs near zero.",
    link: "project-hubspot-bigquery.html",
    featured: true,
  },
  {
    title: "Streamyard → HubSpot Integration",
    category: "data-engineering",
    stack: ["Python", "Cloud Run", "HubSpot API", "Segment"],
    blurb: "Streamyard has no API and the Zapier workaround was hopelessly unreliable — but the webinar attendee data still had to reach the CRM, and doing the uploads by hand wasn't realistic. This internal web app fixes that: teams drop in the export, and it cleans and validates the data, upserts contacts into HubSpot, subscribes them to the right email subscriptions, and pushes them into Segment for marketing — all through the APIs.",
    link: "",
  },
  {
    title: "Krisp AI Meeting Integration",
    category: "data-engineering",
    stack: ["Python", "Azure Functions", "Blob Storage", "Cloud Storage"],
    blurb: "Centralises the company's meeting transcripts and recordings. Each user gets their own custom webhook URL; incoming Krisp meetings are processed into clean Markdown notes alongside the raw JSON, and recordings are stored in both Azure Blob Storage and Google Cloud Storage. A queue-backed, medallion-pattern integration.",
    link: "",
  },
  {
    title: "Digital Dialogues — Curated Webinar Registration",
    category: "data-engineering",
    stack: ["Python", "Cloud Run", "CognitoForms", "HubSpot API", "Microsoft Graph"],
    blurb: "An event-driven flow for invite-only webinars. Applicants sign up on a CognitoForms form — details, interests and marketing consent — firing a webhook to a Python Cloud Run function that upserts them into HubSpot and sets their email subscriptions. The team then hand-picks who's in: an approval fires a second webhook that registers accepted guests into the Microsoft Teams webinar via Microsoft Graph.",
    link: "project-digital-dialogues.html",
    featured: true,
  },

  {
    title: "Deal Revenue Forecasting Pipeline",
    category: "ml",
    stack: ["Python", "Apache Airflow", "BigQuery ML", "HubSpot"],
    blurb: "A production forecasting system that predicts how much revenue the sales pipeline will actually close. Daily Airflow jobs pull deal data into BigQuery, a feature store computes pacing, dwell times and win rates, and a BigQuery ML model scores every open deal — feeding probability-weighted revenue forecasts to executive dashboards.",
    link: "",
    featured: true,
  },

  /* ---- Machine Learning ------------------------------------------------ */
  {
    title: "NYC Taxi Trip-Duration Prediction",
    category: "ml",
    stack: ["Python", "Scikit-learn", "XGBoost", "Random Forest"],
    blurb: "Predicts how long a New York City taxi trip will take. A deep exploratory analysis — hypothesis testing, correlation and outlier handling — feeding regression models (Linear, Ridge, Random Forest, XGBoost), with an interactive estimator dashboard you can try yourself.",
    link: "Taxi Duration.html",
    featured: true,
  },
  {
    title: "Fake News Classifier",
    category: "ml",
    stack: ["Python", "Scikit-learn", "Pandas"],
    blurb: "A model that reads a news article and decides whether it looks real or fake. It learns the language patterns of each by turning the text into numbers, then makes the call.",
    link: "Fake News.html",
    featured: true,
  },
  {
    title: "Loan Eligibility Predictor",
    category: "ml",
    stack: ["Python", "Scikit-learn", "XGBoost", "Random Forest"],
    blurb: "Predicts whether a loan applicant is likely to be approved, based on details like income and credit history. I tried several models and compared how well each one performed.",
    link: "Loan Eligibility.html",
    featured: true,
  },
  {
    title: "GDP Growth vs the Yield Curve",
    category: "ml",
    stack: ["R", "Tidyverse", "Time Series"],
    blurb: "The 'yield curve' is a classic early-warning sign for a recession. This project tests whether that rule of thumb actually holds up in the data.",
    link: "GDP.html",
  },
  {
    title: "Titanic Survival",
    category: "ml",
    stack: ["R", "Random Forest", "XGBoost", "Logistic Regression"],
    blurb: "A two-part study: first grouping passengers into cabin classes, then predicting who was likely to survive the disaster from the details we know about them.",
    link: "",
    status: "soon",
  },

  /* ---- Segmentation & Clustering -------------------------------------- */
  {
    title: "Wine Classification",
    category: "unsupervised",
    stack: ["R", "K-Means", "PCA", "Hierarchical"],
    blurb: "Given a chemical analysis of wines grown in one Italian region, can we sort them back into the three grape varieties they came from — without being told the answer first?",
    link: "Wines.html",
    featured: true,
  },
  {
    title: "Customer Segmentation",
    category: "unsupervised",
    stack: ["R", "K-Means", "Elbow", "Silhouette"],
    blurb: "Taking a list of customers with no labels and letting the data reveal natural groups — so a business can see who its distinct customer types actually are.",
    link: "",
    status: "soon",
  },
  {
    title: "Cervical Cancer Risk",
    category: "unsupervised",
    stack: ["R", "K-Means", "PCA", "Dendrogram"],
    blurb: "Uses non-medical factors like behaviour, support and mental health to sort patients into higher- and lower-risk groups for cervical cancer.",
    link: "",
    status: "soon",
  },
  {
    title: "Literary Sentiment Analysis",
    category: "unsupervised",
    stack: ["R", "Tidyverse", "sentimentr", "Wordcloud"],
    blurb: "Reads whole novels by Jane Austen, H.G. Wells and the Brontë sisters and charts the emotional arc of the writing across each book.",
    link: "Jane Austen.html",
  },

  /* ---- Business Intelligence & Dashboards ----------------------------- */
  {
    title: "Cross-Portfolio Looker Studio Dashboards",
    category: "bi",
    stack: ["Looker Studio", "BigQuery", "HubSpot", "Google Analytics"],
    blurb: "Executive dashboards that gave six business portfolios one trusted view of their numbers — marketing and sales performance, registration trends, web and social, and data health. Centralising the data in BigQuery replaced a sprawl of decentralised, unsecured spreadsheets holding personal data.",
    link: "",
    featured: true,
  },
  {
    title: "Netflix Data Visualization",
    category: "bi",
    stack: ["Tableau"],
    blurb: "An interactive look at the Netflix catalogue — what's on the platform, how it has grown, and where the content comes from.",
    link: "Netflix viz.html",
    featured: true,
  },

  /* ---- Web Scraping & Automation -------------------------------------- */
  {
    title: "Bidorbuy Laptop Auctions",
    category: "scraping",
    stack: ["Python", "Selenium", "BeautifulSoup"],
    blurb: "I needed a laptop, so I automated the hunt: a bot that watches Bidorbuy's twice-weekly auctions, tracks PC prices, alerts me on a good deal — and can even place the bid.",
    link: "Bidorbuy.html",
    featured: true,
  },
  {
    title: "Food Recommender",
    category: "scraping",
    stack: ["Python", "Selenium", "SQL", "MS Access"],
    blurb: "For the indecisive cook: a tool that suggests what to make based on the ingredients you have or the cuisine you're in the mood for. Data collection done, recommender in progress.",
    link: "Food Project.html",
    status: "ongoing",
  },
  {
    title: "Airfare Price Scraper",
    category: "scraping",
    stack: ["Python", "Selenium"],
    blurb: "Collects airline ticket prices over time — originally to test whether fares spiked after Comair left the market, now a growing dataset for future analysis.",
    link: "",
    status: "ongoing",
  },

  /* ---- Web Development ------------------------------------------------- */
  {
    title: "This Website",
    category: "web",
    stack: ["HTML", "CSS", "JavaScript", "jQuery"],
    blurb: "The portfolio you're on. Hand-built with HTML, CSS and JavaScript — including the tongue-in-cheek login page out front.",
    link: "login.html",
  },
  {
    title: "Project Diary (Django)",
    category: "web",
    stack: ["Django", "Python", "SQL"],
    blurb: "My first full site with Django and a custom database — a project-manager's diary that collected daily and weekly notes. Ran locally, never deployed.",
    link: "",
    status: "soon",
  },
  {
    title: "MySQL Cheat Sheet",
    category: "web",
    stack: ["MySQL"],
    blurb: "A running reference of the SQL I reach for most — databases, tables, indexes and the admin bits in between.",
    link: "MySQL.html",
  },
];
