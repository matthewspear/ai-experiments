import { type NextPage } from "next";

import Layout from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";

const URLGenerator: NextPage = () => {
  return (
    <Layout title="URL Generator">
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default URLGenerator;
