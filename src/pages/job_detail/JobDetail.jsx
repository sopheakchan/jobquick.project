import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobById, selectJobById } from "../../redux/jobs/jobsSlice";
import useThrottleScroll from "../../common/useThrottleScroll"; // Import the custom hook
import JobDetailComponent from "../../Components/card/JobDetailcomponent";
import { Metadata } from "../../lib/Metadata";

const JobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const job = useSelector((state) => selectJobById(state, id));

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  const saveScrollPosition = useCallback(() => {
    localStorage.setItem("scrollPosition", window.scrollY);
  }, []);

  useThrottleScroll(saveScrollPosition, 200);

  useEffect(() => {
    const savedPosition = localStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10));
    }
  }, []);

  return (
    <>
      <Metadata
        title={`${job?.title} - Job Details`}
        description={`Find out all the details about ${job?.title} at ${job?.company}. Apply today and take the next step in your career with Job Quick.`}
        author="Job Quick Team"
        keywords={`${job?.title}, ${job?.company}, job details, job description, apply for ${job?.title}, career opportunities, employment, job openings, Job Quick`}
        thumbnail={
          job?.thumbnail
        }
        url={`https://jobquick.techinsights.guru/jobs/${job?.id}`}
        type="website"
      />
      {/* {job ? <JobDetailComponent detail={job} /> : <p>Loading...</p>} */}
      {job ? <JobDetailComponent detail={job} /> : <p>Loading...</p>}
    </>
  );
};

export default JobDetail;
