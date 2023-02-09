import { type NextPage } from "next";

import Layout from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";

const Planner: NextPage = () => {
  return (
    <Layout title="Holiday Destination">
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default Planner;
