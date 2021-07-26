export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url, title) => {
    setTimeout(() => {
        window.gtag('config', GA_TRACKING_ID, {
            page_location: url,
            page_title: title,
        });
    }, 0);
};

export const event = ({ action, category, label, value }) => {
    setTimeout(() => {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }, 0);
};
