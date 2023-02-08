import { type NextPage } from "next";

import Layout from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";

const JournalPrompt: NextPage = () => {
  return (
    <Layout title="Journal Prompt">
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default JournalPrompt;
