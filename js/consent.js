// Loaded synchronously in <head> on every page. GTM is only injected once the
// visitor has accepted cookies; until then no Google Tag Manager request is made.
(function (window, document) {
    var STORAGE_KEY = "kubeskills-cookie-consent";
    var GTM_ID = "GTM-N88FP9P";
    var gtmLoaded = false;

    function getConsent() {
        try {
            return window.localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            return null;
        }
    }

    function setConsent(value) {
        try {
            window.localStorage.setItem(STORAGE_KEY, value);
        } catch (error) {
            // Storage unavailable (e.g. blocked site data); consent applies to this page view only.
        }
    }

    function loadGtm() {
        if (gtmLoaded) {
            return;
        }

        gtmLoaded = true;
        window.dataLayer = window.dataLayer || [];

        // GTM only honours consent commands pushed as an `arguments` object, hence gtag().
        function gtag() {
            window.dataLayer.push(arguments);
        }

        // Google Consent Mode v2 signals, pushed before gtm.js so Google tags see consent as granted.
        gtag("consent", "default", {
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
            analytics_storage: "granted"
        });
        window.dataLayer.push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js"
        });

        var script = document.createElement("script");
        script.async = true;
        script.src = "https://www.googletagmanager.com/gtm.js?id=" + GTM_ID;
        document.head.appendChild(script);
    }

    window.kubeskillsConsent = {
        get: getConsent,
        accept: function () {
            setConsent("accepted");
            loadGtm();
        },
        decline: function () {
            setConsent("declined");
        }
    };

    if (getConsent() === "accepted") {
        loadGtm();
    }
})(window, document);
