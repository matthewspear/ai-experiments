import { type NextPage } from "next";

import Layout from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";

const TaglineGenerator: NextPage = () => {
  return (
    <Layout title="Tagline Generator">
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default TaglineGenerator;
