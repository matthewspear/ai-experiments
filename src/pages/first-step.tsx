import { type NextPage } from "next";

import Layout from "../components/Layout";
import { ComingSoon } from "../components/ComingSoon";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";

const FirstStep: NextPage = () => {
  return (
    <Layout
      // title="First Step"
      breadcrumbs={ExperimentsLevelBreadcrumbs("First Steps", "/first-step")}
    >
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default FirstStep;
