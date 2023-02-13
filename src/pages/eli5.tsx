import { type NextPage } from "next";

import Layout from "@/components/Layout";
import { ComingSoon } from "@/components/ComingSoon";
import { ExperimentsLevelBreadcrumbs } from "@/components/BreadcrumbBar";

const ELI5: NextPage = () => {
  return (
    <Layout
      // title="Explain Like I'm Five"
      breadcrumbs={ExperimentsLevelBreadcrumbs("ELI5", "/eli5")}
    >
      <div className="flex w-full flex-col">
        <ComingSoon />
      </div>
    </Layout>
  );
};

export default ELI5;
