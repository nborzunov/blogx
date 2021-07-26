const google = require("googleapis").google;
const config = require("config");

const clientEmail = config.get("GOOGLE_CLIENT_EMAIL");
const clientId = config.get("GOOGLE_CLIENT_ID");
const privateKey = config.get("GOOGLE_PRIVATE_KEY");
const gaViewId = config.get("GOOGLE_ANALYTICS_VIEW_ID");

const getPageViews = async (slug) => {
  const startDate = "2010-01-01";

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        client_id: clientId,
        private_key: privateKey,
      },
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    const analytics = google.analytics({
      auth,
      version: "v3",
    });

    const response = await analytics.data.ga.get({
      "end-date": "today",
      ids: `ga:${gaViewId}`,
      metrics: "ga:pageviews",
      dimensions: "ga:pagePath",
      filters: `ga:pagePath==${slug}`,
      "start-date": startDate,
    });

    return response.data.totalsForAllResults["ga:pageviews"];
  } catch (err) {
    return new Error(err.message);
  }
};

module.exports = getPageViews;
