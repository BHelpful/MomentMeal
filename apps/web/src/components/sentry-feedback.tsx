"use client";

import { useAuth } from "@clerk/nextjs";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

function createWidget() {
  return Sentry.getFeedback()?.createWidget();
}

function useFeedbackWidget(shouldMount: boolean) {
  const [widget, setWidget] = useState<ReturnType<typeof createWidget> | null>(
    null,
  );
  useEffect(() => {
    // Mount if true and no widget exists
    if (shouldMount && !widget) {
      const newWidget = createWidget();
      setWidget(newWidget);
    }

    // Unmount if false and widget exists
    if (!shouldMount && widget) {
      widget.removeFromDom();
      setWidget(null);
    }
  }, [shouldMount, widget]);
}

export function SentryFeedbackWidget() {
  const auth = useAuth();
  useFeedbackWidget(!!auth?.isSignedIn);

  return null;
}
