import { type NextPage } from "next";

import Layout from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";

const StartupGenerator: NextPage = () => {
  return (
    <Layout title="Startup Name Generator">
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default StartupGenerator;
