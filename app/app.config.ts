import { ROUTES } from "./utils/routes";

export default defineAppConfig({
  navigation: {
    main: [
      { label: "Summary", to: ROUTES.HOME },
      { label: "Submission", to: ROUTES.SUBMISSION },
      { label: "Notifications", to: ROUTES.NOTIFICATIONS },
      { label: "Book Seats", to: ROUTES.BOOK_SEATS },
      { label: "Payment Status", to: ROUTES.PAYMENT_STATUS },
      { label: "Settings", to: ROUTES.SETTINGS },
    ],
  },
});
