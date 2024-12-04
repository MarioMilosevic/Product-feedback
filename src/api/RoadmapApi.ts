import { fetchStatusOptions } from "./StatusApi";
import { fetchAllFeedbacks } from "./FeedbacksApi";

export const fetchRoadmapData = async () => {
  try {
    const [statusData, feedbacksData] = await Promise.all([
      fetchStatusOptions(),
      fetchAllFeedbacks(),
    ]);
    return {
      statusData,
      feedbacksData,
    };
  } catch (error) {
    console.error("Unable to fetch data", error);
  }
};
