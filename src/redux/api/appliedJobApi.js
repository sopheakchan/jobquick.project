import axios from "axios";
import { BASE_URL } from "./api";

export const getAllAppliedJobs = async () => {
    let allAppliedJobs = [];
    let page = 1;
    let pageSize = 10;
    let totalAppliedJobs = 0;
    let hasMore = true;
  
    while (hasMore) {
      const response = await axios.get(`${BASE_URL}applied_jobs/`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access')}`
        },
        params: {
          page: page,
          pageSize: pageSize,
        },
      });
    //   console.log("response api", response);
      const { results, count } = response.data;
      allAppliedJobs = [...allAppliedJobs, ...results];
      totalAppliedJobs = count;
      hasMore = allAppliedJobs.length < totalAppliedJobs;
      page += 1;
    }
    return {
      jobs: allAppliedJobs,
      totalAppliedJobs: totalAppliedJobs,
    };
  };