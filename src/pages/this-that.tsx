import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { ComingSoon } from "@/components/ComingSoon";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";

const ThisOrThat: NextPage = () => {
  return (
    <Layout
      // title="This or That"
      breadcrumbs={ExperimentsLevelBreadcrumbs("This or That", "/this-that")}
    >
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default ThisOrThat;
