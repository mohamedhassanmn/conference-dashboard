import { ROUTES } from "./utils/routes";

export default defineAppConfig({
  navigation: {
    main: [
      { label: "Summary", to: ROUTES.HOME },
      // { label: "Submission", to: ROUTES.SUBMISSION },
      // { label: "Reviews", to: ROUTES.REVIEWS },
      // { label: "Notifications", to: ROUTES.NOTIFICATIONS },
      // { label: "Communications", to: ROUTES.COMMUNICATIONS },
      // { label: "Book Seats", to: ROUTES.BOOK_SEATS },
      // { label: "Payment Status", to: ROUTES.PAYMENT_STATUS },
      // { label: "Settings", to: ROUTES.SETTINGS },
    ],
  },
});
